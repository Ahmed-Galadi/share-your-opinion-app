import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from './../../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  posts: Post[] = [];
  post!: Post;
  commentForm!: FormGroup
  postsSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formbuilder: FormBuilder,
              private postsService: PostsService) { }

  ngOnInit(): void {
    this.post = new Post('', '');
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      });
    this.postsSubscription = this.postsService.postsSubject
                                  .subscribe(
                                    (posts: Post[]) => {
                                      this.posts = posts
                                    }
                                  );
    this.initForm();
    this.postsService.emitPosts();
  }

  initForm() {
    this.commentForm = this.formbuilder.group({
      comment: ['', Validators.required]
    });
  }

  onComment(post: Post) {
    const comment: string = this.commentForm.get('comment')!.value;

    this.postsService.commentPost(post, comment);
    this.postsService.savePosts();
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

}
