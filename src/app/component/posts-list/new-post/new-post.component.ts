import { PostsService } from './../../../services/posts.service';
import { Post } from 'src/app/models/Post.model';
import { UploadService } from '../../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup;
  fileIsUploading: boolean = false;
  fileUrl!: string;
  fileUploaded: boolean = false;
  CreatedAt: string = new Date().toString();

  constructor(private formBuilder: FormBuilder,
              private postService: PostsService,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      caption: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSavePost() {
    const caption = this.postForm.get('caption')!.value;
    const author = this.postForm.get('author')!.value;
    const date = this.CreatedAt;
    const newPost = new Post(caption, author, []);

    newPost.created_at = date;

    if(this.fileUrl && this.fileUrl !== '') {
      newPost.image = this.fileUrl;
    }
    this.postService.creatPost(newPost);
    this.router.navigate(['/posts']);
  }

  onUpLoadFile(file: File) {
    this.fileIsUploading = true;
    this.uploadService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  onDetectFile(event: any) {
    this.onUpLoadFile(event.target.files[0]);
  }

}

