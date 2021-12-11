export interface Activity {
  subject: string;
  action: string;
  pronoun: string;
  object: string;
  link?: string;
  text?: string;
  date: string;
  likes: Array<string>;
  comments: Array<Comment>;
  id?: number;
}

interface Comment {
  user: string;
  comment: string;
}
