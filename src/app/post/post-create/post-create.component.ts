import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService, public route: ActivatedRoute) { }

  mode = 'create';
  private postId: string;
  post: Post;

  @ViewChild('postForm') postForm: NgForm;

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.post = this.postService.getPost(this.postId);
        }
        else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'edit') {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.postService.onAddPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }



}
