import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';
import { tap } from 'rxjs/operators';
import { SeoSocialShareService } from 'ngx-seo';

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
    private seoService: SeoSocialShareService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job$ = this.jobsService.getOne(params.id)
        .pipe(
          tap((job: any) => {
            this.seoService.setData({
              title: `${job.title} - Dallas Jobs Portal`,
              description: job.description,
              published: job.created_at,
              author: 'Dallas Jobs Portal',
              type: 'website',
            });
          })
        );
    });
  }

  toggleApplied() {
    this.applied = !this.applied;
  }

}
