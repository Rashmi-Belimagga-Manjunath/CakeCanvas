/* =============================================================================
   imageAdvisor.js — Client-side image quality analysis
   =============================================================================
   Checks: blur (Laplacian variance), resolution, brightness, cropping
   All checks run on the client via Canvas API.
   ============================================================================= */

const ImageAdvisor = (function () {

  const MIN_WIDTH = 800;
  const MIN_HEIGHT = 600;
  const BLUR_THRESHOLD = 100;
  const MIN_BRIGHTNESS = 40;
  const MAX_BRIGHTNESS = 220;
  const CROP_EDGE_RATIO_THRESHOLD = 0.15;

  function analyse(file) {
    return new Promise(function (resolve) {
      if (!file || !file.type.startsWith('image/')) {
        resolve({ pass: false, failures: ['not_an_image'], message: 'Please upload an image file.' });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        resolve({ pass: false, failures: ['too_large'], message: 'File size exceeds 10 MB limit. Please compress or choose a smaller image.' });
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          var results = runChecks(img);
          resolve(results);
        };
        img.onerror = function () {
          resolve({ pass: false, failures: ['decode_error'], message: 'We couldn\'t read this image. It may be corrupted. Please try a different file.' });
        };
        img.src = e.target.result;
      };
      reader.onerror = function () {
        resolve({ pass: false, failures: ['read_error'], message: 'There was an error reading your file. Please try again.' });
      };
      reader.readAsDataURL(file);
    });
  }

  function runChecks(img) {
    var failures = [];
    var messages = [];

    // Resolution check
    if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
      failures.push('low_resolution');
      messages.push(
        'This image is quite small (' + img.width + ' x ' + img.height + '). ' +
        'We recommend at least ' + MIN_WIDTH + ' x ' + MIN_HEIGHT + ' pixels so our designers can see the details. ' +
        'If this is a screenshot, try saving the original image instead.'
      );
    }

    // Canvas-based checks for blur and brightness
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Downsample for performance: analyse at 640px max dimension
    var scale = Math.min(1, 640 / Math.max(img.width, img.height));
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // Blur detection: Laplacian variance
    var laplacianVariance = computeLaplacianVariance(data, canvas.width, canvas.height);
    if (laplacianVariance < BLUR_THRESHOLD) {
      failures.push('blurry');
      messages.push(
        'This photo appears blurry (focus score: ' + Math.round(laplacianVariance) + '). ' +
        'The camera may have moved while taking it. Try resting your phone on a table or ' +
        'using both hands to keep it steady. Tapping the screen to focus before shooting helps too.'
      );
    }

    // Brightness check
    var brightness = computeAverageBrightness(data);
    if (brightness < MIN_BRIGHTNESS) {
      failures.push('too_dark');
      messages.push(
        'This photo is quite dark (brightness: ' + Math.round(brightness) + '/255). ' +
        'Natural light works best — try taking the photo near a window during daytime. ' +
        'Avoid using flash as it creates harsh shadows.'
      );
    } else if (brightness > MAX_BRIGHTNESS) {
      failures.push('too_bright');
      messages.push(
        'This photo is overexposed (brightness: ' + Math.round(brightness) + '/255). ' +
        'The details are washed out. Try moving to a shadier spot or turning off the flash.'
      );
    }

    // Cropping detection: edge-content ratio
    var cropRatio = computeCropRatio(data, canvas.width, canvas.height);
    if (cropRatio > CROP_EDGE_RATIO_THRESHOLD) {
      failures.push('cropped');
      messages.push(
        'Part of the cake or design appears to be cut off at the edge of the photo. ' +
        'Try stepping back so the whole cake is visible. A top-down or full side view is most helpful.'
      );
    }

    if (failures.length === 0) {
      return {
        pass: true,
        failures: [],
        message: 'Great photo! The lighting looks good and we can see the details clearly. ' +
                 'Our designers will use this as reference.',
        width: img.width,
        height: img.height
      };
    }

    // Combine failure messages (show first 2 most important)
    var combined = messages.slice(0, 2).join('\n\n');
    if (messages.length > 2) {
      combined += '\n\nThere are a few more things we noticed — our designers can advise further.';
    }

    return {
      pass: false,
      failures: failures,
      message: combined,
      details: {
        blurScore: Math.round(laplacianVariance),
        brightness: Math.round(brightness),
        cropRatio: cropRatio.toFixed(3),
        width: img.width,
        height: img.height
      }
    };
  }

  function computeLaplacianVariance(data, w, h) {
    // Approximate Laplacian using 3x3 kernel: [0, -1, 0; -1, 4, -1; 0, -1, 0]
    var sum = 0;
    var count = 0;
    var idx;

    for (var y = 1; y < h - 1; y++) {
      for (var x = 1; x < w - 1; x++) {
        idx = (y * w + x) * 4;
        var gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

        var top    = 0.299 * data[idx - w * 4] + 0.587 * data[idx - w * 4 + 1] + 0.114 * data[idx - w * 4 + 2];
        var bottom = 0.299 * data[idx + w * 4] + 0.587 * data[idx + w * 4 + 1] + 0.114 * data[idx + w * 4 + 2];
        var left   = 0.299 * data[idx - 4] + 0.587 * data[idx - 3] + 0.114 * data[idx - 2];
        var right  = 0.299 * data[idx + 4] + 0.587 * data[idx + 5] + 0.114 * data[idx + 6];

        var laplacian = 4 * gray - top - bottom - left - right;
        sum += laplacian * laplacian;
        count++;
      }
    }

    return count > 0 ? sum / count : 0;
  }

  function computeAverageBrightness(data) {
    var sum = 0;
    var count = data.length / 4;
    for (var i = 0; i < data.length; i += 4) {
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    return count > 0 ? sum / count : 0;
  }

  function computeCropRatio(data, w, h) {
    // Check if significant content is at the edges (indicates cropping)
    var edgePixels = 0;
    var totalEdge = 0;
    var threshold = 30; // brightness threshold for "has content"
    var stripWidth = Math.max(1, Math.round(w * 0.05)); // 5% from each edge

    // Top and bottom edges
    for (var y = 0; y < stripWidth; y++) {
      for (var x = 0; x < w; x++) {
        totalEdge += 2;
        var idxTop = (y * w + x) * 4;
        var idxBottom = ((h - 1 - y) * w + x) * 4;
        var brightTop = 0.299 * data[idxTop] + 0.587 * data[idxTop + 1] + 0.114 * data[idxTop + 2];
        var brightBottom = 0.299 * data[idxBottom] + 0.587 * data[idxBottom + 1] + 0.114 * data[idxBottom + 2];
        if (brightTop > threshold) edgePixels++;
        if (brightBottom > threshold) edgePixels++;
      }
    }

    // Left and right edges
    for (var x = 0; x < stripWidth; x++) {
      for (var y = stripWidth; y < h - stripWidth; y++) {
        totalEdge += 2;
        var idxLeft = (y * w + x) * 4;
        var idxRight = (y * w + (w - 1 - x)) * 4;
        var brightLeft = 0.299 * data[idxLeft] + 0.587 * data[idxLeft + 1] + 0.114 * data[idxLeft + 2];
        var brightRight = 0.299 * data[idxRight] + 0.587 * data[idxRight + 1] + 0.114 * data[idxRight + 2];
        if (brightLeft > threshold) edgePixels++;
        if (brightRight > threshold) edgePixels++;
      }
    }

    var edgeRatio = totalEdge > 0 ? 1 - (edgePixels / totalEdge) : 0;
    return edgeRatio;
  }

  function getFailureReason(failureCode) {
    var messages = knowledge.imageGuide && knowledge.imageGuide.failureMessages
      ? knowledge.imageGuide.failureMessages
      : {};

    switch (failureCode) {
      case 'blurry': return messages.blurry || knowledge.imageGuide.failureMessages.blurry;
      case 'too_dark': return messages.tooDark || knowledge.imageGuide.failureMessages.tooDark;
      case 'too_bright': return messages.tooBright || knowledge.imageGuide.failureMessages.tooBright;
      case 'low_resolution': return messages.lowResolution || knowledge.imageGuide.failureMessages.lowResolution;
      case 'cropped': return messages.cropped || knowledge.imageGuide.failureMessages.cropped;
      default: return messages.unknown || knowledge.imageGuide.failureMessages.unknown;
    }
  }

  return {
    analyse: analyse,
    getFailureReason: getFailureReason,
    MIN_WIDTH: MIN_WIDTH,
    MIN_HEIGHT: MIN_HEIGHT
  };
})();
