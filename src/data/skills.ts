export interface SkillGroup {
  category: string
  icon: string
  colorClass: string
  borderClass: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Mobile & Core',
    icon: 'Smartphone',
    colorClass: 'text-blue-500 dark:text-blue-400',
    borderClass: 'border-l-blue-500 dark:border-l-blue-400',
    skills: [
      'React Native',
      'Cross-Platform Architecture',
      'iOS Development',
      'Android Development',
      'TypeScript',
      'JavaScript (ES6+)',
    ],
  },
  {
    category: 'Frontend',
    icon: 'Monitor',
    colorClass: 'text-violet-500 dark:text-violet-400',
    borderClass: 'border-l-violet-500 dark:border-l-violet-400',
    skills: [
      'React',
      'HTML5',
      'CSS3',
      'SASS',
      'Responsive Design',
      'Storybook',
      'Figma',
    ],
  },
  {
    category: 'State & APIs',
    icon: 'Network',
    colorClass: 'text-emerald-500 dark:text-emerald-400',
    borderClass: 'border-l-emerald-500 dark:border-l-emerald-400',
    skills: [
      'Redux',
      'MobX',
      'REST APIs',
      'GraphQL',
      'Token Authentication',
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: 'GitBranch',
    colorClass: 'text-orange-500 dark:text-orange-400',
    borderClass: 'border-l-orange-500 dark:border-l-orange-400',
    skills: [
      'CircleCI',
      'Jenkins',
      'Firebase App Distribution',
      'TestFlight',
      'Google Play Console',
      'Git',
      'Confluence',
      'Nexus',
    ],
  },
  {
    category: 'Practices',
    icon: 'Users',
    colorClass: 'text-rose-500 dark:text-rose-400',
    borderClass: 'border-l-rose-500 dark:border-l-rose-400',
    skills: [
      'Agile / Scrum',
      'Code Reviews',
      'Performance Optimization',
      'Accessibility (WCAG)',
      'Technical Mentoring',
      'CI/CD',
    ],
  },
  {
    category: 'Backend',
    icon: 'Server',
    colorClass: 'text-teal-500 dark:text-teal-400',
    borderClass: 'border-l-teal-500 dark:border-l-teal-400',
    skills: [
      'Node.js',
      'Express',
      'NestJS',
      'PostgreSQL',
      'MongoDB',
      'MySQL / SQL',
      'Firebase / Firestore',
      'REST API Design',
      'GraphQL (Server)',
      'JWT / OAuth',
      'Docker',
      'AWS',
      'Swagger / OpenAPI',
    ],
  },
  {
    category: 'Gen AI & Agentic',
    icon: 'Sparkles',
    colorClass: 'text-fuchsia-500 dark:text-fuchsia-400',
    borderClass: 'border-l-fuchsia-500 dark:border-l-fuchsia-400',
    skills: [
      'Claude API',
      'Claude Code',
      'GitHub Copilot',
      'OpenAI / Codex',
      'Agentic Engineering',
      'Prompt Engineering',
      'LLM Integration',
      'RAG',
      'MCP',
      'AI-Assisted Dev',
    ],
  },
]
