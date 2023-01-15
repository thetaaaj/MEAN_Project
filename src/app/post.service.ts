import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private posts: Post[] = [];

  private PostsUpdated = new Subject<Post[]>();

  private baseURL = "http://localhost:3000/api/posts";


  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>(this.baseURL)
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.PostsUpdated.next([...this.posts]);
      })
  }


  onAddPost(title, content) {
    const post: Post = {
      title: title,
      content: content
    }
    console.log("new Post  : ", post);
    this.http.post<{ message: string }>(this.baseURL, post)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(post);
        this.PostsUpdated.next([...this.posts]);
      });

  }


  getPostUpdateListner() {
    return this.PostsUpdated.asObservable();
  }
}
