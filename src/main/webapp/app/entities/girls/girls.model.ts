import { BaseEntity } from './../../shared';

export class Girls implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public age?: number,
        public country?: string,
        public location?: string,
        public active?: boolean,
        public lat?: number,
        public log?: number,
        public expirationDate?: any,
        public jhipsterUserID?: string,
    ) {
        this.active = false;
    }
}
