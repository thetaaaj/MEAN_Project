import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
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
    this.http.get<{ message: string, posts: any }>(this.baseURL)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
        console.log("post data : ", transformedPosts)
        this.posts = transformedPosts;
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
        // console.log(data.message);
        // this.posts.push(post);
        // this.PostsUpdated.next([...this.posts]);
        this.getPosts();
      });

  }


  deletePost(id: string) {
    return this.http.delete(this.baseURL)
  }

  getPostUpdateListner() {
    return this.PostsUpdated.asObservable();
  }
}
