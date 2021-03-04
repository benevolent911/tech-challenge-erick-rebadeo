import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddComponent } from './../speeches/add/add.component';

@Injectable()
export class PendingChangesGuard implements CanDeactivate<AddComponent> {
  canDeactivate(component: AddComponent): Observable<boolean> | boolean {
    return component.canDeactivate() ? true : confirm('Changes you made may not be saved.');
  }
}
