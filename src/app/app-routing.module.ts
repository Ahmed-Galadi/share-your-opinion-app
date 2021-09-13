import { CommentsComponent } from './component/posts-list/comments/comments.component';
import { NewPostComponent } from './component/posts-list/new-post/new-post.component';
import { PostsListComponent } from './component/posts-list/posts-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './component/auth/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'auth/signin', component: SignInComponent },
  { path: 'auth/signup', component: SignUpComponent },
  { path: 'posts', canActivate: [AuthGuardService], component: PostsListComponent },
  { path: 'posts/new', canActivate: [AuthGuardService], component: NewPostComponent },
  { path: 'posts/comments/:id', canActivate: [AuthGuardService], component: CommentsComponent},
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
