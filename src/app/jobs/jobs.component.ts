import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs;
  constructor(private jobsService: JobsService) {
    this.jobsService.getAll().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  ngOnInit() {
  }

  trackByFunction(index, item) {
    return item.jobId;
  }

}
