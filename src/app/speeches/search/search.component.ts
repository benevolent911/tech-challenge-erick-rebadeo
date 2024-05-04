import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SpeechesStore } from './../../services/speeches.store';
import { Speech } from 'src/app/shared/models/speech.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  category: string = 'author';
  keywords: string[] = [];
  noResult = false;
  searchForm: FormGroup;
  speeches$: Observable<Speech[]>;
  speechForm: FormGroup;

  constructor(private speechesStore: SpeechesStore) { }

  ngOnInit() {
    this.speeches$ = this.speechesStore.getSpeeches();
    this.initializeForms();
  }

  /**
   * Initialize forms
   */
  initializeForms(): void {
    this.searchForm = new FormGroup({
      'speeches': new FormControl([])
    });
    this.speechForm = new FormGroup({
      'author': new FormControl(''),
      'keywords': new FormControl([]),
      'date': new FormControl(''),
      'body': new FormControl('')
    });
    this.speechForm.disable();
  }

  /**
   * @param speech
   * Set form values
   */
  onSelect(speech: Speech): void {
    this.speechForm.patchValue(speech);
    this.keywords = speech.keywords;
  }

  /**
   * @param category
   * Set search category
   */
  setSearchCategory(category: string): void {
    switch (category) {
      case '1':
        this.category = 'author';
        break;
      case '2':
        this.category = 'date';
        break;
      case '3':
        this.category = 'keywords';
        break;
      default:
        this.category = 'body';
        break;
    }
  }

  /**
   * Show error when no results
   */
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
}
