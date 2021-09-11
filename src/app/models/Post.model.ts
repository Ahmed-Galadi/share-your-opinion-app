export class Post {
  image?: string;
  constructor( public caption: string,
               public author: string,
               public likes: number,
               public comments: string[] ) {}
}
