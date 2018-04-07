import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PpAppSharedModule } from '../../shared';
import {
    PreferencesService,
    PreferencesPopupService,
    PreferencesComponent,
    PreferencesDetailComponent,
    PreferencesDialogComponent,
    PreferencesPopupComponent,
    PreferencesDeletePopupComponent,
    PreferencesDeleteDialogComponent,
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
        PreferencesComponent,
        PreferencesDetailComponent,
        PreferencesDialogComponent,
        PreferencesDeleteDialogComponent,
        PreferencesPopupComponent,
        PreferencesDeletePopupComponent,
    ],
    entryComponents: [
        PreferencesComponent,
        PreferencesDialogComponent,
        PreferencesPopupComponent,
        PreferencesDeleteDialogComponent,
        PreferencesDeletePopupComponent,
    ],
    providers: [
        PreferencesService,
        PreferencesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppPreferencesModule {}
