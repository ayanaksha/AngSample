import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../authguard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RelationmanagerComponent } from './components/relationmanager/relationmanager.component';

const salesRoutes: Routes = [
    {
        path: 'onlinesales',
        children: [
            {
                path: '',
                redirectTo: '/onlinesales/dashboard',
                pathMatch: 'full',
                canActivate: [AuthGuardService]
            },
            {
                path :'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuardService]
            },
            {
                path : 'relationmanager',
                component : RelationmanagerComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(salesRoutes),
    ],
    exports: [
        RouterModule,
    ]
})
export class SalesRouterModule { }