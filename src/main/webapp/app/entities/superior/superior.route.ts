import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SuperiorComponent } from './superior.component';
import { SuperiorDetailComponent } from './superior-detail.component';
import { SuperiorPopupComponent } from './superior-dialog.component';
import { SuperiorDeletePopupComponent } from './superior-delete-dialog.component';

export const superiorRoute: Routes = [
    {
        path: 'superior',
        component: SuperiorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superiors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'superior/:id',
        component: SuperiorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superiors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const superiorPopupRoute: Routes = [
    {
        path: 'superior-new',
        component: SuperiorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superiors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'superior/:id/edit',
        component: SuperiorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superiors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'superior/:id/delete',
        component: SuperiorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superiors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
