import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private posts: Post[] = [];

  private PostsUpdatedSubject = new Subject<Post[]>();

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
        this.PostsUpdatedSubject.next([...this.posts]);
      })
  }

  getPost(id: string) {
    return this.http.get<any>(`${this.baseURL}/${id}`)
  }

  onAddPost(title, content) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    }
    this.http.post<{ message: string, postId: string }>(this.baseURL, post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.PostsUpdatedSubject.next([...this.posts]);
      });

  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content
    }
    this.http.put<{ message: string, postId: string }>(`${this.baseURL}/${id}`, post)
      .subscribe((responseData) => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex(p => p.id == post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.PostsUpdatedSubject.next([...this.posts]);
      });

  }



  deletePost(id: string) {
    console.log("new Post id : ", id)
    this.http.delete(`${this.baseURL}/${id}`)
      .subscribe((msg) => {
        console.log(msg);
        const updatedPost = this.posts.filter(post => id !== post.id);
        this.posts = updatedPost;
        this.PostsUpdatedSubject.next([...this.posts]);
      })
      ;
  }

  getPostUpdateListner() {
    return this.PostsUpdatedSubject.asObservable();
  }
}
