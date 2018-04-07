import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PreferencesMySuffixComponent } from './preferences-my-suffix.component';
import { PreferencesMySuffixDetailComponent } from './preferences-my-suffix-detail.component';
import { PreferencesMySuffixPopupComponent } from './preferences-my-suffix-dialog.component';
import { PreferencesMySuffixDeletePopupComponent } from './preferences-my-suffix-delete-dialog.component';

export const preferencesRoute: Routes = [
    {
        path: 'preferences-my-suffix',
        component: PreferencesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.preferences.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'preferences-my-suffix/:id',
        component: PreferencesMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.preferences.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preferencesPopupRoute: Routes = [
    {
        path: 'preferences-my-suffix-new',
        component: PreferencesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.preferences.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preferences-my-suffix/:id/edit',
        component: PreferencesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.preferences.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preferences-my-suffix/:id/delete',
        component: PreferencesMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ppApp.preferences.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
