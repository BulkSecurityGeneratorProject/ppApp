import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PpAppSharedModule } from '../../shared';
import {
    GirlsMySuffixService,
    GirlsMySuffixPopupService,
    GirlsMySuffixComponent,
    GirlsMySuffixDetailComponent,
    GirlsMySuffixDialogComponent,
    GirlsMySuffixPopupComponent,
    GirlsMySuffixDeletePopupComponent,
    GirlsMySuffixDeleteDialogComponent,
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
        GirlsMySuffixComponent,
        GirlsMySuffixDetailComponent,
        GirlsMySuffixDialogComponent,
        GirlsMySuffixDeleteDialogComponent,
        GirlsMySuffixPopupComponent,
        GirlsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        GirlsMySuffixComponent,
        GirlsMySuffixDialogComponent,
        GirlsMySuffixPopupComponent,
        GirlsMySuffixDeleteDialogComponent,
        GirlsMySuffixDeletePopupComponent,
    ],
    providers: [
        GirlsMySuffixService,
        GirlsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppGirlsMySuffixModule {}
