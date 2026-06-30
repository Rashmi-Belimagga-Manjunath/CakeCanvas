/* =============================================================================
   priceCalculator.js — Price range estimation
   =============================================================================
   Uses knowledge.pricing.ranges and dietary surcharges to provide estimates.
   Never returns exact prices — only ranges.
   ============================================================================= */

const PriceCalculator = (function () {

  function getPriceRange(occasion, size, dietary, options) {
    options = options || {};

    var baseRange = getBaseRange(occasion, size);
    if (!baseRange) {
      baseRange = '$100-$300';
    }

    var surcharges = calculateSurcharges(dietary);
    var deliveryFee = estimateDeliveryFee(options.deliveryDistance);

    return {
      baseRange: baseRange,
      surcharges: surcharges,
      deliveryFee: deliveryFee,
      estimatedTotal: combineRanges(baseRange, surcharges),
      disclaimer: knowledge.pricing.disclaimer || 'All prices are estimates. Your designer will confirm the exact quote.'
    };
  }

  function getBaseRange(occasion, size) {
    var pricing = knowledge.pricing;
    if (!pricing || !pricing.ranges) return null;

    var occasionMap = {
      'birthday': 'birthday',
      'wedding': 'wedding',
      'anniversary': 'anniversary',
      'baby shower': 'babyShower',
      'graduation': 'graduation',
      'corporate': 'corporate',
      'cupcakes': 'cupcakes'
    };

    var mappedOccasion = occasionMap[occasion && occasion.toLowerCase()] || 'birthday';
    var occasionRanges = pricing.ranges[mappedOccasion];
    if (!occasionRanges) return null;

    if (mappedOccasion === 'cupcakes') {
      return size && size.toLowerCase().indexOf('dozen') >= 0
        ? pricing.ranges.cupcakes.perDozen
        : pricing.ranges.cupcakes.perPiece;
    }

    var sizeLower = (size || '').toLowerCase();
    if (sizeLower.indexOf('three') >= 0 || sizeLower.indexOf('3') >= 0) return occasionRanges.threeTier;
    if (sizeLower.indexOf('two') >= 0 || sizeLower.indexOf('2') >= 0 || sizeLower.indexOf('double') >= 0) return occasionRanges.twoTier;
    if (sizeLower.indexOf('sheet') >= 0 || sizeLower.indexOf('half') >= 0) return occasionRanges.sheet;

    return occasionRanges.single || '$100-$250';
  }

  function calculateSurcharges(dietary) {
    if (!dietary || !Array.isArray(dietary) || dietary.length === 0) return [];

    var surcharges = [];
    var options = knowledge.dietaryOptions || [];

    dietary.forEach(function (diet) {
      var matched = options.find(function (o) {
        return o.id && diet && diet.toLowerCase && diet.toLowerCase().indexOf(o.id) >= 0;
      });
      if (matched && matched.surcharge && matched.surcharge.indexOf('No additional') === -1) {
        surcharges.push({
          name: matched.name,
          surcharge: matched.surcharge
        });
      }
    });

    return surcharges;
  }

  function estimateDeliveryFee(distance) {
    if (!distance) return '$15-$60 (depending on location)';
    if (distance < 5) return '$15';
    if (distance < 15) return '$25';
    return '$40-$60';
  }

  function combineRanges(baseRange, surcharges) {
    var totalSurcharge = 0;
    surcharges.forEach(function (s) {
      var match = s.surcharge.match(/\$(\d+)/);
      if (match) totalSurcharge += parseInt(match[1], 10);
    });

    if (totalSurcharge === 0) return baseRange;

    var rangeParts = baseRange.split('-');
    if (rangeParts.length === 2) {
      var low = parseInt(rangeParts[0].replace(/[^0-9]/g, ''), 10);
      var high = parseInt(rangeParts[1].replace(/[^0-9]/g, ''), 10);
      if (!isNaN(low) && !isNaN(high)) {
        return '$' + (low + totalSurcharge) + '-$' + (high + totalSurcharge);
      }
    }

    return baseRange + ' (plus dietary surcharges)';
  }

  function formatBudgetRange(occasion, size, dietary) {
    var info = getPriceRange(occasion, size, dietary);
    var lines = [];

    lines.push('Typical price range: ' + info.estimatedTotal);

    if (info.surcharges && info.surcharges.length > 0) {
      lines.push('Dietary surcharges: ' + info.surcharges.map(function (s) { return s.name + ' (' + s.surcharge + ')'; }).join(', '));
    }

    lines.push(info.disclaimer);

    return lines.join('\n\n');
  }

  return {
    getPriceRange: getPriceRange,
    formatBudgetRange: formatBudgetRange
  };
})();
