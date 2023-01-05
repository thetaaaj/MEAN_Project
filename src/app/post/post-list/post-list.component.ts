import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  panelOpenState = false;
  posts: any[] = [
    { title: 'First Post', content: 'This is my first Post' },
    { title: 'Second Post', content: 'This is my Second Post' },
    { title: 'Third Post', content: 'This is my Third Post' },

  ];

}
