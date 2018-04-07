import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GirlsMySuffix } from './girls-my-suffix.model';
import { GirlsMySuffixService } from './girls-my-suffix.service';

@Component({
    selector: 'jhi-girls-my-suffix-detail',
    templateUrl: './girls-my-suffix-detail.component.html'
})
export class GirlsMySuffixDetailComponent implements OnInit, OnDestroy {

    girls: GirlsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private girlsService: GirlsMySuffixService,
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
            .subscribe((girlsResponse: HttpResponse<GirlsMySuffix>) => {
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
