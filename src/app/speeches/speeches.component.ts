import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ShareSpeechComponent } from './../shared/share-speech/share-speech.component';
import { SpeechesStore } from '../services/speeches.store';
import { Speech } from '../shared/models/speech.model';
import { of } from 'rxjs';

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
              private modalService: BsModalService,
              private speechesStore: SpeechesStore,
              private toastr: ToastrService) { }

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
