import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PpAppSharedModule } from '../../shared';
import {
    PreferencesMySuffixService,
    PreferencesMySuffixPopupService,
    PreferencesMySuffixComponent,
    PreferencesMySuffixDetailComponent,
    PreferencesMySuffixDialogComponent,
    PreferencesMySuffixPopupComponent,
    PreferencesMySuffixDeletePopupComponent,
    PreferencesMySuffixDeleteDialogComponent,
    preferencesRoute,
    preferencesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...preferencesRoute,
    ...preferencesPopupRoute,
];

@NgModule({
    imports: [
        PpAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PreferencesMySuffixComponent,
        PreferencesMySuffixDetailComponent,
        PreferencesMySuffixDialogComponent,
        PreferencesMySuffixDeleteDialogComponent,
        PreferencesMySuffixPopupComponent,
        PreferencesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PreferencesMySuffixComponent,
        PreferencesMySuffixDialogComponent,
        PreferencesMySuffixPopupComponent,
        PreferencesMySuffixDeleteDialogComponent,
        PreferencesMySuffixDeletePopupComponent,
    ],
    providers: [
        PreferencesMySuffixService,
        PreferencesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppPreferencesMySuffixModule {}
