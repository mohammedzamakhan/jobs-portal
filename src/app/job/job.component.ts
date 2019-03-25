import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';
import { tap } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  job$;
  applied: boolean;
  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job$ = this.jobsService.getOne(params.id)
        .pipe(
          tap((job: any) => {
            this.title.setTitle(`${job.title} - Dallas Jobs Portal`);
            this.meta.removeTag('name="description"');
            this.meta.addTag({
              name: 'description',
              content: job.description,
            });
          })
        );
    });
  }

  toggleApplied() {
    this.applied = !this.applied;
  }

}
