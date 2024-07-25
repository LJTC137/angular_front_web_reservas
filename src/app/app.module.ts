import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './guards/login.guard';
import { ValidacionGuard } from './guards/token.guard';

@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesRoutingModule,
    AuthRoutingModule,
    HttpClientModule,
    PagesModule,
    AuthModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [LoginGuard, ValidacionGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
