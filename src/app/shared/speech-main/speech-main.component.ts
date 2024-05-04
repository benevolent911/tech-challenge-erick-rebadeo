import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ShareSpeechComponent } from '../share-speech/share-speech.component';
import { SpeechesStore } from './../../services/speeches.store';
import { Speech } from '../models/speech.model';

@Component({
  selector: 'app-speech-main',
  templateUrl: './speech-main.component.html',
  styleUrls: ['./speech-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechMainComponent implements OnInit, OnChanges {

  @Input() speech: Speech;

  modalRef: BsModalRef;
  speechForm: FormGroup;

  constructor(private modalService: BsModalService,
              private speechesStore: SpeechesStore,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.initializeSpeechForm();
  }

  ngOnChanges() {
    if (this.speech) {
      this.speechForm.patchValue(this.speech);
      this.speechForm.enable();
    }
  }

  /**
   * Initialize post form
   */
  initializeSpeechForm(): void {
    this.speechForm = new FormGroup({
      '_id': new FormControl(''),
      'author': new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'keywords': new FormControl([], [Validators.required]),
      'date': new FormControl('', [Validators.required]),
      'body': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'emailAddress': new FormControl([])
    });
    this.speechForm.disable();
  }

  /**
   * Deletes a speech
   */
  onDelete(): void {
    const speech = this.speechForm.value;
    this.speechesStore.deleteSpeech(speech._id).pipe(
      finalize(() => {
        this.speechForm.reset();
        this.speechForm.disable();
        this.toastr.warning('Speech deleted!', 'Speech App');
      })
    ).subscribe();
  }

  /**
   * Update speech
   */
  onSubmit(): void {
    const speech: Speech = this.speechForm.value;
    this.speechesStore.saveSpeech(speech._id, speech).pipe(
      finalize(() => {
        this.toastr.success(`Speech by ${speech.author} is updated!`, 'Speech App');
      })
    ).subscribe();
  }

  /**
   * Open share speech modal
   */
  openModal(): void {
    const initialState = {
      speech: this.speechForm.value
    };
    this.modalRef = this.modalService.show(ShareSpeechComponent, {initialState});
    this.modalRef.content.event.subscribe(email => {
      this.toastr.success(`Speech shared to ${email}.`, 'Speech App');
    });
  }
}
