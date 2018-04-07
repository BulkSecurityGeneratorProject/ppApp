import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GirlsComponent } from './girls.component';
import { GirlsDetailComponent } from './girls-detail.component';
import { GirlsPopupComponent } from './girls-dialog.component';
import { GirlsDeletePopupComponent } from './girls-delete-dialog.component';

export const girlsRoute: Routes = [
    {
        path: 'girls',
        component: GirlsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'girls/:id',
        component: GirlsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const girlsPopupRoute: Routes = [
    {
        path: 'girls-new',
        component: GirlsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'girls/:id/edit',
        component: GirlsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'girls/:id/delete',
        component: GirlsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
