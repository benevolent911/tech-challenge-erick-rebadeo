import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { SpeechesStore } from './../../services/speeches.store';
import { Speech } from '../models/speech.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-share-speech',
  templateUrl: './share-speech.component.html',
  styleUrls: ['./share-speech.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareSpeechComponent implements OnInit {

  emailForm: FormGroup;
  isProcessingRequest: boolean;
  speech: Speech;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              private speechesStore: SpeechesStore) {}

  ngOnInit() {
    this.initializeSpeechForm();
  }

  /**
   * Initialize email form
   */
  initializeSpeechForm(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * Save email share
   */
  onSubmit() {
    const email = this.emailForm.value.email;
    this.speech.emailAddress.push(email);
    this.speechesStore.saveSpeech(this.speech.id, this.speech).pipe(
      tap(res => {
        this.event.emit(email);
        this.bsModalRef.hide();
      })
    ).subscribe();
  }
}
