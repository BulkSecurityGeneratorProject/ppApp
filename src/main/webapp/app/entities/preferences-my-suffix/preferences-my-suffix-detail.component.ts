import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PreferencesMySuffix } from './preferences-my-suffix.model';
import { PreferencesMySuffixService } from './preferences-my-suffix.service';

@Component({
    selector: 'jhi-preferences-my-suffix-detail',
    templateUrl: './preferences-my-suffix-detail.component.html'
})
export class PreferencesMySuffixDetailComponent implements OnInit, OnDestroy {

    preferences: PreferencesMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private preferencesService: PreferencesMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPreferences();
    }

    load(id) {
        this.preferencesService.find(id)
            .subscribe((preferencesResponse: HttpResponse<PreferencesMySuffix>) => {
                this.preferences = preferencesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'preferencesListModification',
            (response) => this.load(this.preferences.id)
        );
    }
}
