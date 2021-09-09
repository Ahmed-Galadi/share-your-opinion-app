export class Post {
  image?: string;
  constructor(public caption: string, public author: string, comments: string[]) {}
}
