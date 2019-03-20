import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatIcon } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRouterModule } from './authentication-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthenticationModule { }
