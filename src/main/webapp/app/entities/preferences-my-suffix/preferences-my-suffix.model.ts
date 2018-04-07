import { BaseEntity } from './../../shared';

export class PreferencesMySuffix implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
