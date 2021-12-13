export interface Activity {
  subject: string;
  action: string;
  pronoun: string;
  object: string;
  link?: string;
  text?: string;
  date: number;
  likes: Array<string>;
  comments: Comment[];
  id?: number;
}

interface Comment {
  user: string;
  comment: string;
}
