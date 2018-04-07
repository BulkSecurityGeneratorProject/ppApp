import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GirlsMySuffixComponent } from './girls-my-suffix.component';
import { GirlsMySuffixDetailComponent } from './girls-my-suffix-detail.component';
import { GirlsMySuffixPopupComponent } from './girls-my-suffix-dialog.component';
import { GirlsMySuffixDeletePopupComponent } from './girls-my-suffix-delete-dialog.component';

export const girlsRoute: Routes = [
    {
        path: 'girls-my-suffix',
        component: GirlsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'girls-my-suffix/:id',
        component: GirlsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const girlsPopupRoute: Routes = [
    {
        path: 'girls-my-suffix-new',
        component: GirlsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'girls-my-suffix/:id/edit',
        component: GirlsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'girls-my-suffix/:id/delete',
        component: GirlsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.girls.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
