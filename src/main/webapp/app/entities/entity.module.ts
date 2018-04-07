import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PpAppGirlsMySuffixModule } from './girls-my-suffix/girls-my-suffix.module';
import { PpAppPreferencesMySuffixModule } from './preferences-my-suffix/preferences-my-suffix.module';
import { PpAppGirlsModule } from './girls/girls.module';
import { PpAppPreferencesModule } from './preferences/preferences.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PpAppGirlsMySuffixModule,
        PpAppPreferencesMySuffixModule,
        PpAppGirlsModule,
        PpAppPreferencesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppEntityModule {}
