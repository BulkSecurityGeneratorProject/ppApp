import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Girls } from './girls.model';
import { GirlsService } from './girls.service';

@Component({
    selector: 'jhi-girls-detail',
    templateUrl: './girls-detail.component.html'
})
export class GirlsDetailComponent implements OnInit, OnDestroy {

    girls: Girls;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private girlsService: GirlsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGirls();
    }

    load(id) {
        this.girlsService.find(id)
            .subscribe((girlsResponse: HttpResponse<Girls>) => {
                this.girls = girlsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGirls() {
        this.eventSubscriber = this.eventManager.subscribe(
            'girlsListModification',
            (response) => this.load(this.girls.id)
        );
    }
}
