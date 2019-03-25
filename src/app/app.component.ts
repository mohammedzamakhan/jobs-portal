import { Component } from '@angular/core';
import { RouteHelperService } from './route-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jobs-portal';

  constructor(private routeHelper: RouteHelperService) {

  }
}
