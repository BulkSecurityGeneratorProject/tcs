import { BaseEntity } from './../../shared';

export class Work implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public hours?: number,
        public project?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
