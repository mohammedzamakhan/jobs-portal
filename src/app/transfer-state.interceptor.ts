import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TransferStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId,
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlStateKey = makeStateKey(req.url);
    if (this.transferState.hasKey(urlStateKey)) {
      const response: any = this.transferState.get(urlStateKey, {});
      this.transferState.remove(urlStateKey);
      return of(new HttpResponse({
        ...response,
        headers: new HttpHeaders(response.headers)
      }));
    }
    return next.handle(req).pipe(
      tap((res) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(urlStateKey, res);
        }
      })
    );
  }
}
