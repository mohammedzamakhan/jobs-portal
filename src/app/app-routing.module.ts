import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jobs' },
  { path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule', data: {
    seo: {
      title: 'Dallas Jobs Portal - Find New Jobs',
      description: 'Search millions of jobs online in and around Dallas Fortworth Area'
    }
  } },
  { path: 'job/:slug/:id', loadChildren: './job/job.module#JobModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
