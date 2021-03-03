import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { SpeechesStore } from '../services/speeches.store';
import { Speech } from '../shared/models/speech.model';

@Component({
  selector: 'app-speeches',
  templateUrl: './speeches.component.html',
  styleUrls: ['./speeches.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechesComponent implements OnInit {

  selectedSpeech: Speech;
  speeches$: Observable<Speech[]>;

  constructor(public router: Router,
              private speechesStore: SpeechesStore) { }

  ngOnInit() {
    this.speeches$ = this.speechesStore.getSpeeches();
  }

  /**
   * Set selected speech
   */
  onSelect(speech: Speech): void {
    this.selectedSpeech = speech;
  }
}
