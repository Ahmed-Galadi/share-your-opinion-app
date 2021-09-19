export class Post {
  image?: string;
  likes: number = 0;
  created_at!: string;
  liked!: boolean;
  comments!: string[];
  constructor( public caption: string,
               public author: string) {}
}
