import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrebootModule } from 'preboot';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferStateInterceptor } from './transfer-state.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PrebootModule.withConfig({appRoot: 'app-root'}),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TransferStateInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
