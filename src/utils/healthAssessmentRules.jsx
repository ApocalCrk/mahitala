export const healthAssessmentRules = {
  // Grains
  padi: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.15,
    leafConditionWeight: 0.35,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  jagung: {
    leafColorWeight: 0.4,
    stemConditionWeight: 0.3,
    leafConditionWeight: 0.2,
    growthWeight: 0.1,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },

  // Legumes/Beans
  "kacang arab": {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.3,
    growthWeight: 0.15,

    thresholds: {
      good: 0.65,
      attention: 0.35,
    },
  },
  "kacang merah": {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.3,
    growthWeight: 0.15,

    thresholds: {
      good: 0.65,
      attention: 0.35,
    },
  },
  "kacang gude": {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.25,
    growthWeight: 0.2,

    thresholds: {
      good: 0.65,
      attention: 0.4,
    },
  },
  "kacang ngengat": {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.3,
    growthWeight: 0.2,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  "kacang hijau": {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.25,
    growthWeight: 0.2,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  "kacang hitam": {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.3,
    growthWeight: 0.2,

    thresholds: {
      good: 0.65,
      attention: 0.4,
    },
  },
  "kacang lentil": {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.3,
    growthWeight: 0.2,

    thresholds: {
      good: 0.65,
      attention: 0.4,
    },
  },

  // Fruits
  delima: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.25,
    growthWeight: 0.2,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  pisang: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.3,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },
  mangga: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.3,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },
  anggur: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.3,
    leafConditionWeight: 0.2,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  semangka: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.15,
    leafConditionWeight: 0.35,
    growthWeight: 0.2,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  blewah: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.15,
    leafConditionWeight: 0.35,
    growthWeight: 0.2,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  apel: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },
  jeruk: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },
  pepaya: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.15,
    leafConditionWeight: 0.3,
    growthWeight: 0.25,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  kelapa: {
    leafColorWeight: 0.25,
    stemConditionWeight: 0.35,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },

  // Commercial crops
  kapas: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.2,
    leafConditionWeight: 0.3,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.4,
    },
  },
  rami: {
    leafColorWeight: 0.3,
    stemConditionWeight: 0.3,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.65,
      attention: 0.4,
    },
  },
  kopi: {
    leafColorWeight: 0.35,
    stemConditionWeight: 0.25,
    leafConditionWeight: 0.25,
    growthWeight: 0.15,

    thresholds: {
      good: 0.7,
      attention: 0.45,
    },
  },
};

export const conditionScores = {
  leafColor: {
    "hijau-tua": 1.0,
    "hijau-muda": 0.8,
    kekuningan: 0.4,
    kecoklatan: 0.1,
  },
  stemCondition: {
    "tegak-kuat": 1.0,
    "sedikit-lemah": 0.6,
    rebah: 0.2,
  },
  leafCondition: {
    normal: 1.0,
    berbintik: 0.6,
    berlubang: 0.3,
    keriting: 0.2,
    "ujung-kering": 0.4,
  },
  growth: {
    merata: 1.0,
    "tidak-merata": 0.5,
    terhambat: 0.2,
  },
};
