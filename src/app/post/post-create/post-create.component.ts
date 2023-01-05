import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPost: string = '';
  enteredPost: string;
  constructor() { }

  ngOnInit(): void {
  }

  onAddPost() {
    this.enteredPost = this.newPost;
    this.newPost = '';
  }

}
