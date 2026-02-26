export type ResourceType = 'template' | 'guide' | 'recording' | 'perk';

export interface ResourceBase {
  id: string;
  title: string;
  description: string;
  tokenCost: number;
  category: string;
}

export interface TemplateResource extends ResourceBase {
  type: 'template';
  image: string;
  actionLabel: string;
}

export interface GuideResource extends ResourceBase {
  type: 'guide' | 'perk';
  icon?: string;
  buttonLabel: string;
  meta?: string;
}

export interface RecordingResource extends ResourceBase {
  type: 'recording';
  duration: string;
  date: string;
  thumbnail?: string;
}
