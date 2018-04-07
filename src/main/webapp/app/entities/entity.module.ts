import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PpAppGirlsMySuffixModule } from './girls-my-suffix/girls-my-suffix.module';
import { PpAppPreferencesMySuffixModule } from './preferences-my-suffix/preferences-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PpAppGirlsMySuffixModule,
        PpAppPreferencesMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PpAppEntityModule {}
