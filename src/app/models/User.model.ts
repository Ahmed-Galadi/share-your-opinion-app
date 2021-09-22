import { Post } from './Post.model';
export class UserProfile {
  image?: string;
  sharedPosts?: Post[];
  likedPosts?: Post[];
  constructor(public userName: string,
              public age: number,
              public email: string,
              public password: string,
              public bio: string) {}
}
