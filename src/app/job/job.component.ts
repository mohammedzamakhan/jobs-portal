import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  job$;
  constructor(private route: ActivatedRoute, private jobsService: JobsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.job$ = this.jobsService.getOne(params.id);
    });
  }

}
