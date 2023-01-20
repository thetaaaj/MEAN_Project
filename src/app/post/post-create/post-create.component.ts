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

  enteredTitle = '';
  enteredContent = '';
  mode = 'create';
  private postId: string;
  post: any;

  @ViewChild('postForm') postForm: NgForm;

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.postService.getPost(this.postId)
            .subscribe(response => {
              console.log(response);
              this.post = response.post;
            });
        }
        else {
          this.mode = 'create';
          this.postId = null;
          this.post = { title: '', content: '' };
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
    }
    form.resetForm();
  }



}
