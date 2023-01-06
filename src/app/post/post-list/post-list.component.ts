import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() inputPostList: Post[];
  constructor() { }
  posts: Post[];
  panelOpenState = false;

  ngOnInit(): void {
    this.posts = this.inputPostList;
    console.log("list of Post is :", this.posts);
  }



}
