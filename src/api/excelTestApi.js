export const getStudentProfiles = async () => [
  {
    photo: "/Acar.png",
    firstName: "Rohit ",
    lastName: "watharkar",
    email: "rohit@example.com",
    phone: "+91 9876543210",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
  },
  {
    photo: "/Acar.png",
    firstName: "Gudiya",
    lastName: "Gutam",
    email: "gudiya@example.com",
    phone: "+91 9876501234",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
  },
  {
    photo: "/Acar.png",
    firstName: "Ronit",
    lastName: "Watharkar",
    email: "rohit@example.com",
    phone: "+91 9988776655",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
  },

  {
    photo: "/Acar.png",
    firstName: "kalpesh",
    lastName: "patil",
    email: "kalpesh@example.com",
    phone: "+91 9988776655",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
  },
];

export const getExams = async () => ({
  current: [{ name: "SAT Mock Test 1" }, { name: "PSAT Practice Test" }],
  completed: [{ name: "SAT Mock Test 2024" }, { name: "GRE Test 1" }],
  practiceNew: [{ name: "SAT Full Test Preview" }],
  practiceCompleted: [{ name: "Math Practice Set" }],
  statsByType: [
    { type: "PSAT", count: 5 },
    { type: "SAT", count: 4 },
    { type: "GRE", count: 3 },
  ],
});

export const getScores = async () => ({
  highest: 1450,
  last3: [
    { exam: "SAT Mock 1", score: 1420 },
    { exam: "SAT Mock 2", score: 1380 },
    { exam: "PSAT", score: 1200 },
  ],
  all: [
    { exam: "SAT Mock 1", score: 1420 },
    { exam: "SAT Mock 2", score: 1380 },
    { exam: "PSAT", score: 1200 },
    { exam: "GRE Test 1", score: 1300 },
  ],
});

export const getNotes = async () => [
  "Review algebra notes",
  "Focus on reading section",
];
