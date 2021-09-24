import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/User.model';
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
  likeButtons = Array(this.posts.length).fill(false);
  dislikeButtons = Array(this.posts.length).fill(true);
  postsSubscription!: Subscription;
  hide: boolean = false;
  commentForm!: FormGroup;
  users: UserProfile[] = [];
  user!:UserProfile;
  usersSubscription!: Subscription;


  constructor(private postService: PostsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.postsSubject
                                  .subscribe(
                                    (posts: Post[]) => {
                                      this.posts = posts
                                    }
                                  );
    this.usersSubscription = this.userService.usersSubject
                                 .subscribe(
                                   (users: UserProfile[]) => {
                                     this.users = users
                                   }
                                 )
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

  onDisablLike(index: number, button: string) {
    if(button === 'like') {
      this.likeButtons[index] = true;
      this.dislikeButtons[index] = false;
    } else {
      this.likeButtons[index] = false;
      this.dislikeButtons[index] = true;
    }
  }

  onLike(post: Post, index: number , button: string) {
      this.postService.likePost(post, button);
      this.showThumb(post);
      this.onDisablLike(index, button);
  }

  onComment(post: Post, id: number) {
    const comment: string = this.commentForm.get('comment')?.value;
    this.postService.commentPost(post, comment);
    this.onSeePost(id);
  }

}
