// Entries for the combined Education & Experience timeline.
// Order here is the order rendered — sorted by start date, most recent first.
//
// `type` is "education" or "experience" and drives a distinct card treatment
// and node shape for each.
//
// education: `qualification` is optional — when it's absent the institution
//   becomes the card heading, which suits a school covering several
//   qualifications. Those are listed under `subEntries`.
// experience: `role` is the heading, with `organisation` and `engagement`
//   beneath it.
//
// Durations ("2 mos") are deliberately not stored — they go stale. The
// LinkedIn skill tags are omitted because only the first two of each set were
// visible ("and +3 skills"); add them once the full lists are to hand.

const TIMELINE = [
  {
    type: "experience",
    role: "Digital Intern",
    organisation: "AJW Group",
    engagement: "Internship",
    period: "Jun 2026 – Present",
    location: "On-site",
    detail: null,
  },
  {
    type: "experience",
    role: "Crew Member",
    organisation: "Arundel Marquee Hire",
    engagement: "Part-time",
    period: "Jun 2025 – Jul 2025",
    location: "Arundel, England, United Kingdom · On-site",
    detail:
      "Worked in the construction and de-construction of Marquee tents for a wide range of events",
  },
  {
    // Undated in the repo, so its position here is an assumption: Marlborough
    // ended 2024 and this is the 3rd year, which puts the start at 2024. Fill
    // `period` in to make that explicit rather than inferred.
    type: "education",
    qualification: "BSc Computer Science with Cyber Security",
    institution: "Newcastle University",
    status: "3rd year",
    period: null,
    detail: null,
  },
  {
    type: "experience",
    role: "Work experience",
    organisation: "AJW Group",
    engagement: "Indirect Contract",
    period: "Jul 2023 – Aug 2023",
    location: "Slinfold, England, United Kingdom · On-site",
    detail:
      "Work experience within the IT department of AJ Walter Aviation where I was able to be involved with the multiple different teams in this department.",
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
      },
      {
        title: "GCSEs",
        period: "2019–2022",
        results: ["11 GCSEs: A*–A"],
      },
    ],
  },
];
