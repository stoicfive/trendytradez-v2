export interface DashboardState {
  packages: Package[];
  commits: Commit[];
  stats: Stats;
  todos: Todo[];
  plans: Plan[];
  github?: GitHubData;
  lastUpdated: string;
}

export interface Package {
  name: string;
  description: string;
  version?: string;
  status: 'pending' | 'in-progress' | 'complete';
}

export interface Commit {
  hash: string;
  message: string;
  date: string;
}

export interface Stats {
  totalPackages: number;
  completePackages: number;
  testCoverage: number;
}

export interface Todo {
  type: 'TODO' | 'FIXME';
  file: string;
  line: number;
  text: string;
}

export interface Plan {
  name: string;
  progress: number;
  completed: number;
  total: number;
}

export interface GitHubData {
  projects: number;
  issues: number;
  milestones: number;
  lastSync?: string;
  syncStatus?: 'success' | 'failed';
}

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}
