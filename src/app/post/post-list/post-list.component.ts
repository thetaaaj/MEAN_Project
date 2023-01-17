import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) { }

  posts: Post[];
  panelOpenState = false;

  private postsSub: Subscription;

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.getPostUpdateListner().subscribe(
      (postList) => {
        this.posts = postList;
        console.log("list of Post is :", postList);

      },
      (error) => {
        console.log("Error Occured !");
      }
    )
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }


}
