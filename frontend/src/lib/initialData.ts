export interface StaffMember {
  id: string;
  name: string;
  title: string | null;
  role: string;
  type: string;
  degree?: string | null;
  image?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  orcid?: string | null;
  googleScholar?: string | null;
  researchGate?: string | null;
  personalSite?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string | null;
  isUpcoming: boolean;
  createdAt: string;
  updatedAt: string;
}

export const initialStaff: StaffMember[] = [
  {
    id: '05dab514-9d7a-401f-8340-e1093fdb86d2',
    name: 'Rizgar Rashid',
    degree: 'PhD',
    title: 'PhD',
    role: 'Co-founder & Dean of Sciences College',
    type: 'LEADERSHIP',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.668Z',
    updatedAt: '2026-09-24T17:07:10.573Z'
  },
  {
    id: '1274c5cd-4616-4d61-a73d-99816dfda32d',
    name: 'Marwan Aziz',
    degree: 'PhD',
    title: 'PhD',
    role: 'Co-founder & Dean of Engineering College',
    type: 'LEADERSHIP',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.668Z',
    updatedAt: '2026-09-24T17:07:10.575Z'
  },
  {
    id: '30ec576e-41f8-46a9-a0b9-f625f4578c20',
    name: 'Ghassan A. Saleem',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Engineering',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.668Z',
    updatedAt: '2026-09-24T17:07:10.575Z'
  },
  {
    id: '4064a089-5e7b-490b-a7dd-a74ec5137fd4',
    name: 'Yara Muayad',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Engineering',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.669Z',
    updatedAt: '2026-09-24T17:07:10.576Z'
  },
  {
    id: '0c46b43e-3c50-4f3b-9280-42c4beedacb0',
    name: 'Liza Sleman',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Engineering',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.669Z',
    updatedAt: '2026-09-24T17:07:10.577Z'
  },
  {
    id: 'd544a24a-ad37-4f3f-9474-5bd5c9add847',
    name: 'Sazan Kamal',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Engineering',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.670Z',
    updatedAt: '2026-09-24T17:07:10.577Z'
  },
  {
    id: 'bcd46bd0-1a25-411d-b0c6-91eac0a24d9f',
    name: 'Zina Yaqoob',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Sciences',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.670Z',
    updatedAt: '2026-09-24T17:07:10.578Z'
  },
  {
    id: '77129f1b-dc7b-4a90-9c64-0080994f2ff8',
    name: 'Bnar Nuraldin',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Sciences',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.670Z',
    updatedAt: '2026-09-24T17:07:10.578Z'
  },
  {
    id: 'c384099d-bf27-47e5-9bea-3f690b64d47a',
    name: 'Shang Massud',
    degree: 'MSc',
    title: 'MSc',
    role: 'Researcher, Computer Sciences',
    type: 'RESEARCHER',
    image: null,
    bio: null,
    linkedin: null,
    orcid: null,
    googleScholar: null,
    researchGate: null,
    personalSite: null,
    createdAt: '2026-09-22T21:11:41.671Z',
    updatedAt: '2026-09-24T17:07:10.579Z'
  },
  {
    id: '1e2c44bd-65e7-4f00-9115-306fbdd05283',
    name: 'Rasty Sherwany',
    degree: 'MSc.',
    title: 'Assistant Lecturer',
    role: 'Assistant lecturer, Computer Sciences',
    type: 'RESEARCHER',
    image: '/uploads/1790189374477-721057390.jpg',
    bio: "Kurdish guy born and live in Erbil of Kurdistan, one of the eldest cities in the world. graduated BSc. in computer sciences at Knowledge University class 2022. and then graduated MSc. in computer sciences at the University of Kurdistan-Hewler class 2025. Rasty's area of interest in academic research includes Artificial Intelligence. Deep Learning, Digital Image Processing and Operating Systems. Rasty is also an Open-Source enthusiast.",
    linkedin: 'https://www.linkedin.com/in/rastysherwany/',
    orcid: 'https://orcid.org/0009-0008-4774-0571',
    googleScholar: 'https://scholar.google.com/citations?user=SIMojNoAAAAJ&hl=en&authuser=2',
    researchGate: null,
    personalSite: 'https://rasty.me',
    createdAt: '2026-09-22T21:11:41.671Z',
    updatedAt: '2026-09-24T17:09:40.034Z'
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: '0651ba28-d4f0-4801-a147-e28cb84bc5e6',
    title: 'Establishment of the Artificial Intelligence Center at Knowledge University',
    description: `As part of Knowledge University’s strategic efforts to advance scientific research, innovation, and the adoption of emerging technologies, the Artificial Intelligence Center was established in cooperation with the College of Science and the College of Engineering.

In the presence of Prof. Dr. Ahmed Dezaye, President of Knowledge University, an academic workshop was presented by Asst. Prof. Ghassan Ammanuel Salim. The workshop highlighted the importance of artificial intelligence in academic and research fields, as well as the role of emerging technologies in enhancing research quality and strengthening researchers’ capabilities.

The center aims to provide an advanced scientific and technological environment for students, lecturers, and researchers, offering greater opportunities for study, research, and practical work in the fields of artificial intelligence, machine learning, data analysis, and intelligent systems.

The establishment of the center represents an important step toward strengthening the university’s research and innovation environment and creating stronger links between theoretical knowledge and practical application. The center is also expected to serve as a platform for developing research projects, promoting scientific collaboration, and exploring innovative AI-based solutions.

Through the establishment of this center, Knowledge University continues to move toward a future increasingly driven by science, innovation, and technology.`,
    date: '2026-09-01T00:00:00.000Z',
    image: '/uploads/1790158150554-383075396.jpg,/uploads/1790157793867-579051901.jpg,/uploads/1790188926715-957920536.jpg,/uploads/1790259174547-787020428.jpg,/uploads/1790259174556-566217243.jpg,/uploads/1790259174560-25058239.jpg',
    isUpcoming: false,
    createdAt: '2026-09-22T21:11:41.679Z',
    updatedAt: '2026-09-24T15:32:58.188Z'
  }
];

export const initialNews: any[] = [];
export const initialProjects: any[] = [];
export const initialPublications: any[] = [];
export const initialDatasets: any[] = [];

