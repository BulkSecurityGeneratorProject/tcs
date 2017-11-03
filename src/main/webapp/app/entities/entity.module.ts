import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TcsWorkModule } from './work/work.module';
import { TcsExpenseModule } from './expense/expense.module';
import { TcsEmployeeModule } from './employee/employee.module';
import { TcsSuperiorModule } from './superior/superior.module';
import { TcsProjectModule } from './project/project.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TcsWorkModule,
        TcsExpenseModule,
        TcsEmployeeModule,
        TcsSuperiorModule,
        TcsProjectModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TcsEntityModule {}
