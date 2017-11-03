import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Superior } from './superior.model';
import { SuperiorPopupService } from './superior-popup.service';
import { SuperiorService } from './superior.service';

@Component({
    selector: 'jhi-superior-delete-dialog',
    templateUrl: './superior-delete-dialog.component.html'
})
export class SuperiorDeleteDialogComponent {

    superior: Superior;

    constructor(
        private superiorService: SuperiorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.superiorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'superiorListModification',
                content: 'Deleted an superior'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-superior-delete-popup',
    template: ''
})
export class SuperiorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private superiorPopupService: SuperiorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.superiorPopupService
                .open(SuperiorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
