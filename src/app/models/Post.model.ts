export class Post {
  image!: string;
  comments!: string[];
  likes: number = 0;
  constructor( public caption: string,
               public author: string,
               public crated_at: Date) {}
}
