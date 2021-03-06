import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PendingChangesGuard } from './../guards/pending-changes.guard';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TagInputModule } from 'ngx-chips';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AddComponent } from './add/add.component';
import { HeaderComponent } from './../shared/header/header.component';
import { SearchComponent } from './search/search.component';
import { SpeechesComponent } from './speeches.component';
import { SpeechSidebarComponent } from '../shared/speech-sidebar/speech-sidebar.component';
import { SpeechMainComponent } from '../shared/speech-main/speech-main.component';

const speechesRoutes: Routes = [
  {
    path: '',
    component: SpeechesComponent
  },
  {
    canDeactivate: [PendingChangesGuard],
    path: 'speeches/add',
    pathMatch: 'full',
    component: AddComponent,
  },
  {
    path: 'speeches/search',
    pathMatch: 'full',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    AddComponent,
    HeaderComponent,
    SearchComponent,
    SpeechesComponent,
    SpeechSidebarComponent,
    SpeechMainComponent
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(speechesRoutes),
    TabsModule.forRoot(),
    TagInputModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [PendingChangesGuard]
})
export class SpeechesRoutingModule { }
