import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Speech } from '../shared/models/speech.model';
import Speeches from './data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private speeches: Speech[] = Speeches;

  constructor() { }

  /**
   * Load all speeches
   */
  loadSpeeches(): Observable<Speech[]> {
    return of(this.speeches).pipe(
      shareReplay()
    );
  }
}
