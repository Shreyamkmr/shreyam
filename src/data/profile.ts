// Hand-maintained profile content. Edit this file to change what the site says about you.

export const profile = {
  name: 'Shreyam',
  role: 'Digital Analyst · Industrial Data & AI',
  location: 'Cheshire, England',
  tagline:
    'I help industrial teams work smarter with data and AI: building AI tools, automating workflows and turning operational data into better decisions.',
  summary: [
    'Engineer by training (B.Tech + M.Tech, IIT Kharagpur) and digital practitioner by trade. I work where operations meet software, helping teams adopt AI, automate repetitive processes and get real value from the data they already have.',
    'I enjoy building practical AI skills and agents, designing analytics that people actually use, and bringing colleagues along on the digital journey. Outside work I tinker with hardware, drones and open-source side projects.',
  ],
  email: 'shreyamkmr@gmail.com',
  github: 'Shreyamkmr',
  linkedin: 'https://www.linkedin.com/in/shreyam-%E2%A0%80-bb066b17a/',
  // Optional: your Credly username (credly.com/users/<this>). Badges there are pulled in automatically.
  credly: '',
  avatar: 'https://avatars.githubusercontent.com/u/37586438?v=4',
};

export const stats = [
  { value: '4+', label: 'years in industrial digital & AI' },
  { value: '3', label: 'sectors: energy, metals and power' },
  { value: 'IIT KGP', label: 'B.Tech + M.Tech dual degree' },
  { value: 'IMAV 2019', label: 'international drone competition winner' },
];

// Kept deliberately general: this page is public. Specifics are shared with a CV on request.
export const experience = [
  {
    company: 'EET Fuels (formerly Essar Oil UK)',
    role: 'Digital Analyst, Digitalization',
    period: 'Oct 2023 – Present',
    location: 'Cheshire, UK',
    points: [
      'Lead digital and AI initiatives across several business functions, from idea through to adoption.',
      'Build AI-powered tools and assistants and automate manual workflows and processes.',
      'Turn operational data into dashboards and insights that support everyday decisions.',
    ],
  },
  {
    company: 'Vedanta Ltd.',
    role: 'Associate Manager, Digitalization',
    period: 'Aug 2022 – Oct 2023',
    location: 'India',
    points: [
      'Delivered data analytics, machine learning and automation projects across aluminium and power operations.',
      'Advised on emerging technologies and worked with stakeholders to shape data-driven decisions.',
    ],
  },
  {
    company: 'ArcelorMittal Nippon Steel',
    role: 'R&D Intern',
    period: 'Dec 2019 – Jan 2020',
    location: 'India',
    points: ['Applied machine learning to materials research problems.'],
  },
  {
    company: 'Aerial Robotics Lab, IIT Kharagpur',
    role: 'Head, Hardware & Embedded Team',
    period: 'May 2018 – Jun 2022',
    location: 'Kharagpur, India',
    points: [
      'Led the hardware and embedded team building autonomous drones, including a delivery UAV for medical supplies.',
      'Team won IMAV 2019, the International Micro Air Vehicle competition.',
    ],
  },
];

// "What I do": capability areas, not specific client or employer projects.
export const projects = [
  {
    title: 'AI skills & agents',
    blurb: 'Building AI assistants, skills and agents that take on real work, connected to the tools and data teams already use.',
    tags: ['LLMs', 'Claude', 'MCP', 'Prompt design'],
  },
  {
    title: 'Workflow automation',
    blurb: 'Replacing repetitive manual steps with reliable automated flows, so people spend time on judgement rather than copy-paste.',
    tags: ['Power Automate', 'RPA', 'Python'],
  },
  {
    title: 'Analytics & dashboards',
    blurb: 'Turning raw operational data into clear, trusted dashboards and reports that people actually use.',
    tags: ['Power BI', 'SQL', 'DAX'],
  },
  {
    title: 'Industrial data',
    blurb: 'Bringing together process, sensor and business data so it can be monitored, analysed and acted on.',
    tags: ['Time-series', 'IoT', 'Data integration'],
  },
  {
    title: 'Machine learning',
    blurb: 'Forecasting, prediction and optimisation models applied to practical engineering and business questions.',
    tags: ['Python', 'R', 'Forecasting', 'Optimisation'],
  },
  {
    title: 'Digital adoption',
    blurb: 'Working with stakeholders to find the right problems, prove value quickly and help teams embrace new ways of working.',
    tags: ['Stakeholders', 'Change', 'Training'],
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'R', 'SQL', 'C++', 'DAX', 'Power Query (M)', 'Kotlin'] },
  {
    group: 'Industrial data',
    items: ['AVEVA / OSIsoft PI', 'PI Vision', 'SAP PM', 'MES', 'IoT', 'Digital twins'],
  },
  {
    group: 'Analytics & AI',
    items: ['Power BI', 'Tableau', 'Machine learning', 'Deep learning (Keras)', 'Forecasting', 'Optimization', 'LLM agents & MCP'],
  },
  { group: 'Automation & tools', items: ['Power Platform', 'Power Automate', 'RPA', 'SharePoint', 'Git', 'GitHub'] },
];

export const education = [
  {
    school: 'Indian Institute of Technology Kharagpur',
    degree: 'B.Tech + M.Tech Dual Degree, Metallurgical & Materials Engineering',
    period: '2017 – 2022',
    detail: 'CGPA 7.92 / 10',
  },
];

export const awards = [
  'SPOT Award, Essar UK Services Ltd.',
  'Sector CEO Award, Vedanta Aluminium & Power',
  'Winner, IMAV 2019 (International Micro Air Vehicle competition)',
  'NDA-II AFSB qualified',
];

// GitHub repos to leave out of the automatic "Recent work" list.
export const hiddenRepos = [
  'shreyam',
  'Kavitashree',
  'kendre',
  'kendre_web',
  'my-app',
  'Test_R',
  'project-1',
  'datasciencecoursera',
  'coursera-getting-and-cleaning-data-project',
  'CV-for-Chartership',
  'Damya',
];
