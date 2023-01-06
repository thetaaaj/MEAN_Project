import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Output() newPostEvent = new EventEmitter<Post>();

  enteredTitle: string;
  enteredPost: string;
  constructor() { }

  ngOnInit(): void {
  }

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredPost
    }

    console.log(post);
    this.newPostEvent.emit(post);

    this.enteredPost = '';
    this.enteredTitle = '';
  }

}
