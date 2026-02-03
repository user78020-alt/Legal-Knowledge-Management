
export interface StatItem {
  label: string;
  value: string;
  trend: string;
  icon: string;
  trendColor: string;
}

export interface MatrixRow {
  area: string;
  vietnam: number;
  singapore: number;
  thailand: number;
}

export interface Attachment {
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'link';
}

export interface QAEntry {
  user: string;
  question: string;
  answer?: string;
  timestamp: string;
}

export interface KnowledgeEntry {
  id: string;
  jurisdiction: string;
  category: string;
  title: string;
  author: string;
  authorRole: string;
  timestamp: string;
  avatarUrl: string;
  summary?: string;
  readTime?: string;
  content?: string;
  citations?: string[];
  attachments?: Attachment[];
  communityQA?: QAEntry[];
}

export interface GenerationResult {
  title: string;
  summary: string;
  tags: string[];
}

export type ViewType = 'overview' | 'jurisdiction' | 'topic';
