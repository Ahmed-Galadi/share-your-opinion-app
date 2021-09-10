import { Post } from './../models/Post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  booksSubject = new Subject<Post[]>();

  constructor() { }
}
