// Entries for the Education timeline, newest first.
//
// `qualification` is optional — when it's absent the institution becomes the
// card heading, which suits a school covering several qualifications. Those
// are listed under `subEntries`, each with its own period and results.

const EDUCATION = [
  {
    qualification: "BSc Computer Science with Cyber Security",
    institution: "Newcastle University",
    status: "3rd year",
    period: null,
    detail: null,
  },
  {
    qualification: null,
    institution: "Marlborough College",
    status: null,
    period: "2019–2024",
    detail: null,
    subEntries: [
      {
        title: "A Levels",
        period: "2022–2024",
        results: [
          "Computer Science (A)",
          "Mathematics (A)",
          "Economics (B)",
        ],
      },
      {
        title: "GCSEs",
        period: "2019–2022",
        results: ["11 GCSEs: A*–A"],
      },
    ],
  },
];
