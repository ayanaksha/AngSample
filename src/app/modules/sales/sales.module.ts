import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SalesService } from './sales.service';
import { TokenInterceptor } from './interceptor.service';
import { SalesRouterModule } from './sales-router.module'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RelationmanagerComponent } from './components/relationmanager/relationmanager.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SalesRouterModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  declarations: [
    DashboardComponent,
    RelationmanagerComponent,
  ],
  exports: [
    SalesRouterModule,
    DashboardComponent,
    RelationmanagerComponent,
  ],
  providers: [
    SalesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SalesModule { }
