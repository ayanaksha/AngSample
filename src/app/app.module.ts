import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SalesModule } from './modules/sales/sales.module';
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AuthGuardService } from './authguard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthenticationModule,
    SalesModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
