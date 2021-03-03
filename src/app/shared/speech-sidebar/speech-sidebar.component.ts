import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Speech } from '../models/speech.model';


@Component({
  selector: 'app-speech-sidebar',
  templateUrl: './speech-sidebar.component.html',
  styleUrls: ['./speech-sidebar.component.css']
})
export class SpeechSidebarComponent implements OnInit {

  @Input() speeches: Speech[] = [];
  @Output() private speechChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(speech: Speech): void {
    this.speechChanged.emit(speech);
  }
}
