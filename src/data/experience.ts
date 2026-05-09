export interface Experience {
  id: string
  company: string
  client?: string
  role: string
  type: 'Full-Time' | 'Contract'
  period: string
  isCurrent: boolean
  industry: string
  industryColor: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    id: 'leovegas',
    company: 'LeoVegas Group',
    role: 'Senior Mobile Developer',
    type: 'Full-Time',
    period: 'Nov 2024 – Present',
    isCurrent: true,
    industry: 'Gaming',
    industryColor: 'violet',
    bullets: [
      'Lead development of cross-platform mobile features with React Native for iOS and Android consumer product.',
      'Design scalable mobile architecture and reusable component systems supporting ongoing feature delivery.',
      'Collaborate with product, design, and backend engineers to ship production-ready features on schedule.',
      'Conduct code reviews and enforce engineering standards across the mobile codebase.',
      'Implemented CI/CD automation with CircleCI to streamline build and deployment workflows.',
    ],
  },
  {
    id: 'baxus',
    company: 'Baxus',
    role: 'Senior Mobile Developer',
    type: 'Contract',
    period: 'Jun 2024 – Nov 2024',
    isCurrent: false,
    industry: 'Web3 / Consumer',
    industryColor: 'emerald',
    bullets: [
      'Developed cross-platform mobile applications for iOS and Android using React Native.',
      'Integrated REST and GraphQL APIs to support real-time application functionality.',
      'Implemented scalable state management using Redux and MobX.',
      'Delivered production-ready UI components in collaboration with product and design teams.',
    ],
  },
  {
    id: 'kpn',
    company: 'KPN',
    role: 'Senior Mobile Developer / Team Lead',
    type: 'Contract',
    period: 'Jun 2023 – Feb 2024',
    isCurrent: false,
    industry: 'Telecom',
    industryColor: 'blue',
    bullets: [
      'Led engineering work to improve WCAG accessibility support across both iOS and Android platforms.',
      'Translated product epics into actionable development tasks for mobile engineers.',
      'Coordinated delivery across product, QA, and engineering stakeholders.',
      'Supported testing and release cycles to maintain stable production deployments.',
    ],
  },
  {
    id: 'nisum',
    company: 'Nisum',
    client: 'Bank of Chile',
    role: 'Senior Frontend Mobile Developer',
    type: 'Contract',
    period: 'Mar 2022 – Jun 2023',
    isCurrent: false,
    industry: 'Fintech',
    industryColor: 'orange',
    bullets: [
      'Built scalable React Native interfaces using internal design systems and component libraries for a banking loyalty app.',
      'Integrated secure REST APIs with token-based authentication.',
      'Mentored junior and mid-level engineers through a structured 6-month internal training program.',
      'Delivered new features incrementally across multiple release cycles.',
    ],
  },
  {
    id: 'lean',
    company: 'Lean Solutions Group',
    client: 'Project44',
    role: 'Senior Mobile Developer',
    type: 'Contract',
    period: 'Jan 2021 – Apr 2022',
    isCurrent: false,
    industry: 'Logistics',
    industryColor: 'yellow',
    bullets: [
      'Developed logistics mobile features including geolocation, maps, and device permission management.',
      'Implemented feature flag systems supporting multiple deployment environments.',
      'Managed mobile testing and release distribution using Firebase App Distribution, TestFlight, and Google Play Console.',
      'Produced engineering documentation and UML diagrams supporting development planning.',
    ],
  },
  {
    id: 'weknow',
    company: 'WeKnow',
    client: 'Northwell Health',
    role: 'Frontend Mobile Developer',
    type: 'Full-Time',
    period: 'Jul 2018 – May 2020',
    isCurrent: false,
    industry: 'Healthcare',
    industryColor: 'rose',
    bullets: [
      'Developed React-based frontend components for healthcare web applications.',
      'Led sprint planning and task breakdown for frontend development work.',
      'Implemented unit tests for key application features including e-commerce components.',
      'Improved application security through frontend tokenization mechanisms.',
    ],
  },
  {
    id: 'early',
    company: 'Early Career',
    role: 'Frontend & Full-Stack Developer',
    type: 'Full-Time',
    period: '2014 – 2017',
    isCurrent: false,
    industry: 'Web / Full-Stack',
    industryColor: 'slate',
    bullets: [
      'Built responsive web applications, WordPress platforms, and early progressive web apps.',
      'Technologies: AngularJS, Bootstrap, jQuery, SQL, JavaScript, HTML, CSS.',
    ],
  },
]
