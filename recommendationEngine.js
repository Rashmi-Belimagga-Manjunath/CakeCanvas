/* =============================================================================
   recommendationEngine.js — Flavour, size, and product recommendations
   =============================================================================
   Uses knowledge.flavours, knowledge.cakeSizes, knowledge.dietaryOptions
   ============================================================================= */

const RecommendationEngine = (function () {

  function recommendSize(guestCount) {
    var count = parseInt(guestCount, 10);
    if (isNaN(count) || count <= 0) {
      return { recommendation: 'How many guests are you expecting?', options: knowledge.cakeSizes };
    }

    var sizes = knowledge.cakeSizes || [];
    var bestMatch = null;

    for (var i = 0; i < sizes.length; i++) {
      var servings = sizes[i].servings;
      if (!servings) continue;
      var parts = servings.split('-');
      var minServes = parseInt(parts[0], 10);
      var maxServes = parts[1] ? parseInt(parts[1], 10) : minServes;

      // Find first size where max servings > guest count
      if (maxServes >= count) {
        bestMatch = sizes[i];
        break;
      }
    }

    if (!bestMatch) {
      bestMatch = sizes[sizes.length - 1] || { name: 'Large custom', servings: '60-90+', description: 'Large multi-tier cake for big events' };
    }

    return {
      recommendation: 'For ' + count + ' guests, I recommend our **' + bestMatch.name + '** (serves ' + bestMatch.servings + '). ' + bestMatch.description,
      size: bestMatch
    };
  }

  function recommendFlavour(occasion, dietary) {
    var categories = knowledge.flavours && knowledge.flavours.categories ? knowledge.flavours.categories : [];
    var allFlavours = [];
    categories.forEach(function (cat) {
      if (cat.flavours) {
        cat.flavours.forEach(function (f) { allFlavours.push(f); });
      }
    });

    var dietaryIds = [];
    if (dietary && Array.isArray(dietary)) {
      dietaryIds = dietary.map(function (d) { return (d || '').toLowerCase().trim(); });
    }

    var dietaryOptions = knowledge.dietaryOptions || [];
    var availableFlavours = allFlavours;

    // Filter by dietary compatibility
    dietaryIds.forEach(function (dietId) {
      var option = dietaryOptions.find(function (o) { return o.id === dietId; });
      if (option && option.availableFlavours && option.availableFlavours.length > 0) {
        availableFlavours = availableFlavours.filter(function (f) {
          return option.availableFlavours.some(function (af) {
            return f.name.toLowerCase().indexOf(af.toLowerCase()) >= 0 ||
                   af.toLowerCase().indexOf(f.name.toLowerCase()) >= 0;
          });
        });
      }
    });

    // If no compatible flavours found, return all flavours
    if (availableFlavours.length === 0) {
      availableFlavours = allFlavours;
    }

    // Occasion-based suggestion
    var occasionLower = (occasion || '').toLowerCase();
    var suggestion = null;

    if (occasionLower.indexOf('wedding') >= 0) {
      suggestion = availableFlavours.find(function (f) {
        return f.name.toLowerCase().indexOf('vanilla') >= 0 ||
               f.name.toLowerCase().indexOf('pistachio') >= 0 ||
               f.name.toLowerCase().indexOf('earl grey') >= 0;
      });
    } else if (occasionLower.indexOf('birthday') >= 0) {
      // Prefer fun flavours for birthdays
      suggestion = availableFlavours.find(function (f) {
        return f.name.toLowerCase().indexOf('funfetti') >= 0 ||
               f.name.toLowerCase().indexOf('chocolate') >= 0 ||
               f.name.toLowerCase().indexOf('cookies') >= 0;
      });
    } else if (occasionLower.indexOf('baby') >= 0) {
      suggestion = availableFlavours.find(function (f) {
        return f.name.toLowerCase().indexOf('vanilla') >= 0 ||
               f.name.toLowerCase().indexOf('strawberry') >= 0 ||
               f.name.toLowerCase().indexOf('lemon') >= 0;
      });
    }

    // Dietary-compatible suggestion
    var dietarySuggestion = null;
    dietaryIds.forEach(function (dietId) {
      var option = dietaryOptions.find(function (o) { return o.id === dietId; });
      if (option && option.popularFlavours && option.popularFlavours.length > 0) {
        dietarySuggestion = option.popularFlavours[0];
      }
    });

    return {
      suggestion: suggestion ? suggestion.name : (availableFlavours.length > 0 ? availableFlavours[0].name : 'Belgian Chocolate'),
      allFlavours: availableFlavours,
      dietarySuggestion: dietarySuggestion,
      categories: categories
    };
  }

  function suggestDietaryFriendlyFlavour(dietaryId) {
    var options = knowledge.dietaryOptions || [];
    var option = options.find(function (o) { return o.id === dietaryId; });

    if (option && option.popularFlavours && option.popularFlavours.length > 0) {
      return {
        flavour: option.popularFlavours[0],
        allOptions: option.popularFlavours,
        description: (knowledge.flavours && knowledge.flavours.categories
          ? getAllFlavours().filter(function (f) {
              return option.popularFlavours.some(function (pf) {
                return f.name.indexOf(pf) >= 0 || pf.indexOf(f.name) >= 0;
              });
            })
          : []
        )
      };
    }

    return null;
  }

  function getAllFlavours() {
    var result = [];
    var categories = knowledge.flavours && knowledge.flavours.categories ? knowledge.flavours.categories : [];
    categories.forEach(function (cat) {
      if (cat.flavours) {
        result = result.concat(cat.flavours);
      }
    });
    return result;
  }

  function getOccasionProducts(occasion) {
    var products = knowledge.products && knowledge.products.categories ? knowledge.products.categories : [];

    var occasionLower = (occasion || '').toLowerCase();

    // Direct match
    var match = products.find(function (p) {
      return p.id && occasionLower.indexOf(p.id) >= 0;
    });

    if (match) return match;

    // Partial match
    match = products.find(function (p) {
      return p.name && occasionLower.indexOf(p.name.toLowerCase().split(' ')[0]) >= 0;
    });

    return match || products[0];
  }

  return {
    recommendSize: recommendSize,
    recommendFlavour: recommendFlavour,
    suggestDietaryFriendlyFlavour: suggestDietaryFriendlyFlavour,
    getAllFlavours: getAllFlavours,
    getOccasionProducts: getOccasionProducts
  };
})();
