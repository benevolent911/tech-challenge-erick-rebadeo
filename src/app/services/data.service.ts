import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Speech } from '../shared/models/speech.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Load all speeches
   */
  loadSpeeches() {
    return this.http.get(environment.api);
  }

  /**
   * Add new speech
   */
  addSpeech(speech: Speech) {
    return this.http.post(environment.api, speech);
  }

  /**
   * Delete a speech
   */
  deleteSpeech(id: string) {
    return this.http.delete(`${environment.api}/${id}`);
  }

  /**
   * Update a speech
   */
  updateSpeech(id: string, speech: Speech) {
    return this.http.put(`${environment.api}/${id}`, speech);
  }
}
