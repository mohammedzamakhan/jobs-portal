import { Injectable } from '@angular/core';
import { Meta,
  Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {

  constructor(
    private meta: Meta,
    private title: Title,
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
        this.title.setTitle(seo.title);
        this.meta.removeTag('name="description"');
        this.meta.addTag({
          name: 'description',
          content: seo.description,
        });
      });
  }
}
