import { Component } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN_Project';


  allPost: Post[] = [];

  onCreatePost(post: Post) {
    console.log("new Post is : ", post);
    this.allPost.push(post);
  }
}
