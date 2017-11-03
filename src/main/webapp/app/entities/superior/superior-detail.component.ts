import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Superior } from './superior.model';
import { SuperiorService } from './superior.service';

@Component({
    selector: 'jhi-superior-detail',
    templateUrl: './superior-detail.component.html'
})
export class SuperiorDetailComponent implements OnInit, OnDestroy {

    superior: Superior;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private superiorService: SuperiorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSuperiors();
    }

    load(id) {
        this.superiorService.find(id).subscribe((superior) => {
            this.superior = superior;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSuperiors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'superiorListModification',
            (response) => this.load(this.superior.id)
        );
    }
}
