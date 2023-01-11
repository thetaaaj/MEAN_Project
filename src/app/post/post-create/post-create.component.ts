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

  @ViewChild('postForm') postForm: NgForm;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }
    this.postService.onAddPost(this.postForm.value);

  }

}
