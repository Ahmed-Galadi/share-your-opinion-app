import { Router } from '@angular/router';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: Post[] = [];
  postsSubscription!: Subscription;

  constructor(private postService: PostsService,
              private router: Router) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.booksSubject
                                  .subscribe(
                                    (posts: Post[]) => {
                                      this.posts = posts
                                    }
                                  );
    this.postService.getPosts();
    this.postService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  onCommentPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
