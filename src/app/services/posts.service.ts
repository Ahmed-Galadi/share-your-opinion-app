import { UploadService } from './upload.service';
import { Post } from './../models/Post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getDatabase, onValue, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor(private uploadService: UploadService) { }

// Emit Posts
  emitPosts() {
    this.postsSubject.next(this.posts);
  }

// Save Posts
  savePosts() {
    const db = getDatabase();
    set(ref(db, '/posts'), this.posts);
  }

// Get Posts From Database
  getPosts() {
    const db = getDatabase();
    const dataRef = ref(db, '/posts');

    onValue(dataRef,
      (dataSnapshot) => {
        this.posts = dataSnapshot.val() ? dataSnapshot.val() : [];
        this.emitPosts();
      }
    );
  }

// Get Single Post Image and Comments and Caption
  getSinglePost(id: number) {
    const db = getDatabase();
    const dataRef = ref(db, `/posts/${id}`);

    return new Promise<Post>(
      (resolve, reject) => {
        onValue(dataRef,
          (dataSnapshot) => {
            resolve(dataSnapshot.val());
          },
          (error) => {
            reject(error);
          },
          {
            onlyOnce: true
          }
        );
      }
    );
  }

// Create New Post
  creatPost(post: Post) {
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }

// Delete Posts
  removePost(post: Post) {
  // Delete Post's Image
    this.uploadService.deleteFile(post);

  // Index of The Post To Delete
    const postIndexToRemove = this.posts.findIndex(
      (postElements) => {
        if(postElements === post) {
          return true;
        } else {
          return false;
        }
      }
    );

  // Delete Post
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

// Like Post
  likePost(post: Post, like: string) {
    const postIndex = this.posts.findIndex(
      (postElements) => {
        if(postElements === post) {
          return true;
        } else {
          return false;
        }
      }
    );
    if(like === 'like') {
      this.posts[postIndex].likes += 1;
    } else {
      this.posts[postIndex].likes -= 1;
    }
    this.savePosts();
    this.emitPosts();
  }

}
