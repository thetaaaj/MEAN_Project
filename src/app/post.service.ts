import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  private posts: Post[] = [];

  private PostsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  onAddPost(title, content) {
    const post: Post = {
      title: title,
      content: content
    }
    this.posts.push(post);
    this.PostsUpdated.next([...this.posts]);
  }

  getPostUpdateListner() {
    return this.PostsUpdated.asObservable();
  }
}
