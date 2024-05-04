import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { SpeechesStore } from './../../services/speeches.store';
import { Speech } from 'src/app/shared/models/speech.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  isProcessingRequest: boolean;
  speechForm: FormGroup;

  constructor(private speechesStore: SpeechesStore,
              private toastr: ToastrService) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.speechForm.dirty;
  }

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initialize speech form
   */
  initializeForm(): void {
    this.speechForm = new FormGroup({
      'author': new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'keywords': new FormControl([], [Validators.required]),
      'date': new FormControl('', [Validators.required]),
      'body': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'emailAddress': new FormControl([])
    });
  }

  /**
   * Clear speech form
   */
  onClear() {
    this.speechForm.reset();
  }

  /**
   * Add new speech
   */
  onSubmit(): void {
    const speech: Speech = this.speechForm.value;
    this.isProcessingRequest = true;
    this.speechesStore.addSpeech(speech).pipe(
      tap((speech: Speech) => {
        this.isProcessingRequest = false;
        this.toastr.success(`Speech by ${speech.author} is added!`, 'Speech App');
        this.speechForm.reset();
      })
    ).subscribe();
  }
}
