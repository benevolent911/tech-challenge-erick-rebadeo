import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { DataService } from './data.service';
import { Speech } from '../shared/models/speech.model';

@Injectable({
  providedIn: 'root'
})
export class SpeechesStore {

  private subject = new BehaviorSubject<Speech[]>(null);
  speeches$: Observable<Speech[]> = this.subject.asObservable();

  constructor(private dataService: DataService,
              private toastr: ToastrService) {
              this.loadSpeeches();
  }

  /**
   * @param post
   * Adds new post
   */
  // addPost(post: Post): Observable<any> {
  //   return this.dataService.createPost(post).pipe(
  //     tap(res => {
  //       const posts = this.subject.getValue();
  //       const newPosts = [...posts, res];

  //       this.subject.next(newPosts);
  //       this.toastr.success('Post added!', 'Public Blog');
  //     })
  //   );
  // }

  /**
   * @param postId
   * Deletes a speech
   */
  deleteSpeech(speechId: number): Observable<boolean> {
    const speeches = this.subject.getValue();
    const newSpeeches = speeches.filter(speech => speech.id !== speechId);

    this.subject.next(newSpeeches);

    return of(true);
  }

  /**
   * Load all speeches
   */
  loadSpeeches(): void {
    this.dataService.loadSpeeches().pipe(
      tap(speeches => this.subject.next(speeches))
    ).subscribe();
  }

  /**
   * Get all speeches
   */
  getSpeeches(): Observable<Speech[]> {
    return this.speeches$;
  }

  /**
   * Get post by id
   */
  // getPost(postId: number): Observable<Post> {
  //   return this.posts$.pipe(
  //     map(posts => posts.find(post => post.id === postId))
  //   );
  // }

  /**
   * @param postId
   * @param changes
   * Update speech
   */
  saveSpeech(speechId: number, changes: Partial<Speech>): Observable<any> {
    const speeches = this.subject.getValue();
    const speechIndex = speeches.findIndex(post => post.id === speechId);
    const newCourse: Speech = {
      ...speeches[speechIndex],
      ...changes
    };
    const newCourses: Speech[] = speeches.slice(0);
    newCourses[speechIndex] = newCourse;

    this.subject.next(newCourses);

    return of(speeches[speechIndex]);
  }
}
