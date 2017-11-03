import { BaseEntity } from './../../shared';

export class Expense implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public amount?: number,
        public project?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
