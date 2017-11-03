import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TcsSharedModule } from '../../shared';
import {
    SuperiorService,
    SuperiorPopupService,
    SuperiorComponent,
    SuperiorDetailComponent,
    SuperiorDialogComponent,
    SuperiorPopupComponent,
    SuperiorDeletePopupComponent,
    SuperiorDeleteDialogComponent,
    superiorRoute,
    superiorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...superiorRoute,
    ...superiorPopupRoute,
];

@NgModule({
    imports: [
        TcsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SuperiorComponent,
        SuperiorDetailComponent,
        SuperiorDialogComponent,
        SuperiorDeleteDialogComponent,
        SuperiorPopupComponent,
        SuperiorDeletePopupComponent,
    ],
    entryComponents: [
        SuperiorComponent,
        SuperiorDialogComponent,
        SuperiorPopupComponent,
        SuperiorDeleteDialogComponent,
        SuperiorDeletePopupComponent,
    ],
    providers: [
        SuperiorService,
        SuperiorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TcsSuperiorModule {}
