import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Superior } from './superior.model';
import { SuperiorPopupService } from './superior-popup.service';
import { SuperiorService } from './superior.service';

@Component({
    selector: 'jhi-superior-dialog',
    templateUrl: './superior-dialog.component.html'
})
export class SuperiorDialogComponent implements OnInit {

    superior: Superior;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private superiorService: SuperiorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.superior.id !== undefined) {
            this.subscribeToSaveResponse(
                this.superiorService.update(this.superior));
        } else {
            this.subscribeToSaveResponse(
                this.superiorService.create(this.superior));
        }
    }

    private subscribeToSaveResponse(result: Observable<Superior>) {
        result.subscribe((res: Superior) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Superior) {
        this.eventManager.broadcast({ name: 'superiorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-superior-popup',
    template: ''
})
export class SuperiorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private superiorPopupService: SuperiorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.superiorPopupService
                    .open(SuperiorDialogComponent as Component, params['id']);
            } else {
                this.superiorPopupService
                    .open(SuperiorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
