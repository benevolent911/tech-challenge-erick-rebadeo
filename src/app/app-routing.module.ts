import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./speeches/speeches.module').then(x => x.SpeechesModule),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'speeches',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
