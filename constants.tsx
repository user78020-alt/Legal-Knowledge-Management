
import { StatItem, MatrixRow, KnowledgeEntry } from './types';

export const STATS: StatItem[] = [
  { label: 'Total Contributors', value: '142', trend: '+15%', icon: 'groups', trendColor: 'text-green-600' },
  { label: 'Total Articles', value: '2,840', trend: '+8.2%', icon: 'description', trendColor: 'text-green-600' },
  { label: 'Jurisdictions', value: '14', trend: 'Active', icon: 'public', trendColor: 'text-slate-400' },
  { label: 'Pending Reviews', value: '18', trend: 'Action Req.', icon: 'history_edu', trendColor: 'text-amber-500' },
];

export const MATRIX_DATA: MatrixRow[] = [
  { area: 'Labor & Employment', vietnam: 42, singapore: 128, thailand: 18 },
  { area: 'Corporate & M&A', vietnam: 64, singapore: 215, thailand: 38 },
  { area: 'Intellectual Property', vietnam: 12, singapore: 82, thailand: 4 },
  { area: 'Data Privacy (GDPR/PDPA)', vietnam: 8, singapore: 96, thailand: 24 },
];

export const RECENT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: 'labor-sg-1',
    jurisdiction: 'Singapore',
    category: 'Labor',
    title: 'Comprehensive Guide to 2024 Flexible Work Arrangement (FWA) Mandates',
    author: 'Michael Chen',
    authorRole: 'Regional Partner',
    timestamp: 'Oct 24, 2024',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael',
    summary: 'A deep dive into the mandatory guidelines for employers regarding FWA requests in Singapore starting December 2024.',
    readTime: '12 min read',
    content: `## 1. Executive Summary
The Singapore Ministry of Manpower (MOM) has issued a Tripartite Standard that shifts flexible work from a "nice-to-have" benefit to a structured corporate right. Starting Dec 1, 2024, all employers must have a formal process to evaluate FWA requests.

## 2. Key Legal Amendments
Under the new framework, the Employment Act is supplemented by the Tripartite Guidelines on Flexible Work Arrangement Requests (TG-FWAR). 

### 2.1 Scope of Application
The guidelines apply to all employees who have completed their probation period (typically 3-6 months). It covers:
- Flexi-place (Telecommuting)
- Flexi-time (Staggered hours)
- Flexi-load (Job sharing or part-time)

## 3. Employer Obligations
Employers cannot simply reject a request with a blanket "no". They must provide a written rejection citing specific "reasonable business grounds" such as:
- Cost increase that is unsustainable
- Significant decrease in productivity
- Difficulty in organizing work within the team

## 4. Risks and Compliance
Non-compliance won't lead to immediate criminal charges but may result in MOM investigations and administrative penalties. More importantly, it impacts the employer's ability to hire foreign talent as their "Work Pass" privileges may be suspended.

## 5. Implementation Roadmap
Companies should begin auditing their HR manuals now. We recommend a phased rollout:
- Phase 1: Policy Draft (Oct 2024)
- Phase 2: Manager Training (Nov 2024)
- Phase 3: Live Implementation (Dec 2024)`,
    citations: ['Employment Act 1968', 'Tripartite Guidelines on FWA 2024', 'MOM Advisory 2024/09'],
    attachments: [
      { name: 'MOM_FWA_Handbook_2024.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Internal_FWA_Policy_Template.docx', size: '120 KB', type: 'doc' }
    ],
    communityQA: [
      { user: 'Jessica Tan', question: 'Does this apply to part-time contract workers?', answer: 'Yes, if they meet the 6-month minimum service requirement.', timestamp: '1 day ago' },
      { user: 'Kevin Lee', question: 'What constitutes a "reasonable" cost increase?', answer: 'MOM defines this as a direct, quantifiable expense that significantly exceeds standard operational budgets, e.g., needing to rent a satellite office for one person.', timestamp: '2 days ago' }
    ]
  },
  {
    id: 'labor-vn-1',
    jurisdiction: 'Vietnam',
    category: 'Labor',
    title: 'Cross-Border Comparison: Flexible Work Trends in Vietnam Labor Code 2019',
    author: 'Linh Nguyen',
    authorRole: 'Senior Associate',
    timestamp: 'Oct 20, 2024',
    avatarUrl: 'https://i.pravatar.cc/150?u=linh',
    summary: 'Comparing Vietnam\'s "Working From Home" regulations under Decree 145 with Singapore\'s new FWA mandates.',
    readTime: '8 min read',
    content: `## 1. Current Framework
Unlike Singapore, Vietnam does not yet have a specific "Right to Request" FWA. However, Article 34 of the Labor Code allows for flexible arrangements upon mutual agreement.

## 2. Remote Work Clauses
Decree 145/2020/ND-CP provides the most detailed guidance. If employees work from home, the employer is still responsible for occupational health and safety (OHS) standards, which creates a significant liability gap.`,
    attachments: [{ name: 'Vietnam_Labor_Code_EN.pdf', size: '1.8 MB', type: 'pdf' }]
  },
  {
    id: 'labor-th-1',
    jurisdiction: 'Thailand',
    category: 'Labor',
    title: 'Thailand Work From Home Bill: Impact on Labor Protection Act',
    author: 'Somchai P.',
    authorRole: 'Managing Director',
    timestamp: 'Oct 15, 2024',
    avatarUrl: 'https://i.pravatar.cc/150?u=somchai',
    summary: 'Analyzing the 2023 amendment to the Labor Protection Act regarding remote work agreements.',
    readTime: '7 min read'
  },
  {
    id: 'labor-sg-2',
    jurisdiction: 'Singapore',
    category: 'Labor',
    title: 'Calculating Overtime Pay for Senior Management in Singapore',
    author: 'Michael Chen',
    authorRole: 'Regional Partner',
    timestamp: 'Sep 12, 2024',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael',
    summary: 'A detailed look at Part IV of the Employment Act and salary caps for overtime eligibility.'
  },
  {
    id: 'corp-vn-1',
    jurisdiction: 'Vietnam',
    category: 'Corporate',
    title: 'M&A Due Diligence: New FDI Restrictions in Conditional Sectors',
    author: 'Hoang Nam',
    authorRole: 'Partner',
    timestamp: 'Oct 05, 2024',
    avatarUrl: 'https://i.pravatar.cc/150?u=nam',
    summary: 'Analysis of recent MPI circulars on market access for foreign investors in manufacturing.'
  }
];

export const JURISDICTIONS = ['Vietnam', 'Singapore', 'Thailand'];
export const CATEGORIES = ['All', 'Labor', 'Corporate', 'IP', 'Tax', 'Compliance'];
