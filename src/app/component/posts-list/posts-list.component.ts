import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  hide: boolean = false;
  commentForm!: FormGroup;
  hideLike!: any;
  hideDislike!:any;

  constructor(private postService: PostsService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.postsSubject
                                  .subscribe(
                                    (posts: Post[]) => {
                                      this.posts = posts
                                    }
                                  );
    this.initCommentForm();
    this.postService.getPosts();
    this.postService.emitPosts();
  }

  initCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    })
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  onSeePost(id: number) {
    this.router.navigate(['/posts', 'comments', id]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

   getColor(post: Post) {
     if(post.likes < 0) {
      return 'red';
      } else if(post.likes > 0) {
       return 'green';
     } else {
       return '';
     }

  }

  showThumb(post: Post) {
      if(post.likes < 0) {
        this.hide = true;
      } else if(post.likes > 0) {
        this.hide = false;
      }
  }



  onLike(post: Post) {
    this.postService.likePost(post, 'like');
    this.showThumb(post);
  }

  onDislike(post: Post) {
    this.postService.likePost(post, 'dislike')
    this.showThumb(post);
  }

  onComment(post: Post, id: number) {
    const comment: string = this.commentForm.get('comment')?.value;
    this.postService.commentPost(post, comment);
    this.onSeePost(id);
  }

}
