import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PpAppSharedModule } from '../../shared';
import {
    GirlsService,
    GirlsPopupService,
    GirlsComponent,
    GirlsDetailComponent,
    GirlsDialogComponent,
    GirlsPopupComponent,
    GirlsDeletePopupComponent,
    GirlsDeleteDialogComponent,
    girlsRoute,
    girlsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...girlsRoute,
    ...girlsPopupRoute,
];

@NgModule({
    imports: [
        PpAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GirlsComponent,
        GirlsDetailComponent,
        GirlsDialogComponent,
        GirlsDeleteDialogComponent,
        GirlsPopupComponent,
        GirlsDeletePopupComponent,
    ],
    entryComponents: [
        GirlsComponent,
        GirlsDialogComponent,
        GirlsPopupComponent,
        GirlsDeleteDialogComponent,
        GirlsDeletePopupComponent,
    ],
    providers: [
        GirlsService,
        GirlsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppGirlsModule {}
