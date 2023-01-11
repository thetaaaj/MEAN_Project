import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.onAddPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
