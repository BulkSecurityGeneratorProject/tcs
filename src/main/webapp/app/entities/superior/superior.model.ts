import { BaseEntity } from './../../shared';

export class Superior implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
