import { Injectable } from '@angular/core';
import { SeoSocialShareService } from 'ngx-seo';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {

  constructor(
    private seoService: SeoSocialShareService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(r => r.outlet === 'primary')
      )
      .subscribe(activeRoute => {
        const seo = activeRoute.snapshot.data.seo;
        this.seoService.setData({
          title: seo.title,
          description: seo.description,
          author: 'Dallas Jobs Portal',
          type: 'website',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Dallas_bridge_skyline.jpg/250px-Dallas_bridge_skyline.jpg',
          url: 'https://step-6-jobs-portal.now.sh' + this.router.routerState.snapshot.url,
        });
      });
  }
}
