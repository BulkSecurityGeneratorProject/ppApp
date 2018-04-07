import { BaseEntity } from './../../shared';

export class Preferences implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
