export const stats = [
  {
    count: 3,
    title: "ديسمبر",
    year: 2025,
    type: "stat",
    workout: {
      data: [
        {
          label: "صدر",
          value: 20,
        },
        {
          label: "كتاف وايدين",
          value: 15,
        },
        {
          label: "معدة",
          value: 10,
        },
        {
          label: "ظهر",
          value: 5,
        },
        {
          label: "رجلين",
          value: 10,
        },
      ],
    },
    doughnut: {
      data: [
        {
          label: "نوم",
          value: 8,
        },
        {
          label: "شغل",
          value: 8,
        },
        {
          label: "مع الأهل",
          value: 4,
        },
        {
          label: "رياضة",
          value: 1,
        },
        {
          label: "وقت فراغ",
          value: 3,
        },
      ],
    },
    line: {
      data: [
        {
          label: "",
          value: 0,
        },
        {
          label: "الأسبوع الأول",
          value: 37,
        },
        {
          label: "الأسبوع الثاني",
          value: 25,
        },
        {
          label: "الأسبوع الثالث",
          value: null,
        },
        {
          label: "الأسبوع الرابع",
          value: null,
        },
      ],
    },
    summary: "احصائيات شهر ديسمبر",
  },
  {
    count: 2,
    title: "نوفمبر",
    year: 2025,
    type: "stat",
    summary: "احصائيات شهر نوفمبر",
    doughnut: {
      data: [
        {
          label: "نوم",
          value: 8,
        },
        {
          label: "شغل",
          value: 8,
        },
        {
          label: "مع الأهل",
          value: 4.75,
        },
        {
          label: "رياضة",
          value: 0.25,
        },
        {
          label: "وقت فراغ",
          value: 3,
        },
      ],
    },
    line: {
      data: [
        {
          label: "",
          value: 0,
        },
        {
          label: "الأسبوع الأول",
          value: 28,
        },
        {
          label: "الأسبوع الثاني",
          value: 18,
        },
        {
          label: "الأسبوع الثالث",
          value: 32,
        },
        {
          label: "الأسبوع الرابع",
          value: 38,
        },
      ],
    },
  },
  {
    count: 1,
    title: "أكتوبر",
    year: 2025,
    type: "stat",
    summary: "احصائيات شهر اكتوبر",
    doughnut: {
      data: [
        {
          label: "نوم",
          value: 8,
        },
        {
          label: "شغل",
          value: 3,
        },
        {
          label: "مع الأهل",
          value: 4,
        },
        {
          label: "رياضة",
          value: 0.25,
        },
        {
          label: "وقت فراغ",
          value: 8.75,
        },
      ],
    },
  },
];

export const latestStat = stats.length ?? 0;
