import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';
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
   * @param speech
   * Adds new speech
   */
  addSpeech(speech: Speech): Observable<any> {
    const speeches = this.subject.getValue();

    return this.dataService.addSpeech(speech).pipe(
      tap((newSpeech) => {
        speeches.push(newSpeech);

        this.subject.next(speeches);

        return of(speech);
      })
    );
  }

  /**
   * @param speechId
   * Deletes a speech
   */
  deleteSpeech(speechId: string): Observable<any> {
    const speeches = this.subject.getValue();

    return this.dataService.deleteSpeech(speechId).pipe(
      tap(() => {
        const newSpeeches = speeches.filter(speech => speech._id !== speechId);

        this.subject.next(newSpeeches);

        return of(true);
      })
    )
  }

  /**
   * Load all speeches
   */
  loadSpeeches(): void {
    this.dataService.loadSpeeches().pipe(
      tap((speeches: any) => this.subject.next(speeches))
    ).subscribe();
  }

  /**
   * Get all speeches
   */
  getSpeeches(): Observable<Speech[]> {
    return this.speeches$;
  }

  /**
   * @param postId
   * @param changes
   * Update speech
   */
  saveSpeech(speechId: string, changes: Partial<Speech>): Observable<any> {
    const speeches = this.subject.getValue();
    const speechIndex = speeches.findIndex(speech => speech._id === speechId);
    const newSpeech: Speech = {
      ...speeches[speechIndex],
      ...changes
    };
    const newSpeeches: Speech[] = speeches.slice(0);
    return this.dataService.updateSpeech(speechId, newSpeech).pipe(
      tap(() => {
        newSpeeches[speechIndex] = newSpeech;

        this.subject.next(newSpeeches);

        return of(speeches[speechIndex]);
      })
    );
  }
}
