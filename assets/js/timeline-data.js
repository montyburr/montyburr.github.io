// Entries for the combined Education & Experience timeline.
//
// Order here is the order rendered: the current degree is pinned first as the
// headline credential, and everything after it runs by start date, most recent
// first.
//
// `type` is "education" or "experience" and drives a distinct card treatment,
// icon and node shape for each.
//
// education: `qualification` is optional — when it's absent the institution
//   becomes the card heading, which suits a school covering several
//   qualifications. Those are listed under `subEntries`.
// experience: `role` is the heading, with `organisation` and `engagement`
//   beneath it, plus an optional `skills` list.
//
// Durations ("2 mos") are deliberately not stored — they go stale.

const TIMELINE = [
  {
    type: "education",
    qualification: "BSc Computer Science with Cyber Security",
    institution: "Newcastle University",
    status: "3rd year",
    period: "2024 – Present",
    detail: "First year result: First Class (average 83.3%).",
  },
  {
    type: "experience",
    role: "Digital Intern",
    organisation: "AJW Group",
    engagement: "Internship",
    period: "Jun 2026 – Present",
    location: "On-site",
    detail: null,
    skills: [],
  },
  {
    type: "experience",
    role: "Crew Member",
    organisation: "Arundel Marquees",
    engagement: "Part-time",
    period: "Jun 2025 – Jul 2025",
    location: "Arundel, England, United Kingdom · On-site",
    detail:
      "Worked in the construction and de-construction of Marquee tents for a wide range of events",
    skills: [
      "Teamwork",
      "Time Management",
      "Communication",
      "Leadership",
      "Customer Service",
    ],
  },
  {
    type: "experience",
    role: "Work experience",
    organisation: "AJW Group",
    engagement: null,
    period: "Jul 2023 – Aug 2023",
    location: "Slinfold, England, United Kingdom · On-site",
    detail:
      "Work experience within the IT department of AJ Walter Aviation where I was able to be involved with the multiple different teams in this department.",
    skills: [
      "Data Analysis",
      "Customer Service",
      "Java",
      "Python (Programming Language)",
      "Programming",
      "Cybersecurity",
      "Cyber Defense",
    ],
  },
  {
    type: "education",
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
        // Sits under the A Level results, separated by spacing rather than a
        // rule. Kept out of `results` because an EPQ isn't an A Level.
        note: "EPQ (Level 3): Cyber Warfare (A*)",
      },
      {
        title: "GCSEs",
        period: "2019–2022",
        results: ["11 GCSEs: A*–A"],
      },
    ],
  },
];
