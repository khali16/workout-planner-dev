export interface Exercise {
  title?: string;
  engagedBodyParts?: {
    legs: { checked: boolean; title: string };
    glutes: { checked: boolean; title: string };
    abs: { checked: boolean; title: string };
    arms: { checked: boolean; title: string };
    back: { checked: boolean; title: string };
    warmUp: { checked: boolean; title: string };
  };
  finished: boolean;
  description?: string;
  video?: string;
  totalTime?: number;
}
