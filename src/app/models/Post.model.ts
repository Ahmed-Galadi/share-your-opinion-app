export class Post {
  image?: string;
  likes: number = 0;
  created_at!: string;
  comments: string[] = ['aaa'];
  constructor( public caption: string,
               public author: string) {}
}
