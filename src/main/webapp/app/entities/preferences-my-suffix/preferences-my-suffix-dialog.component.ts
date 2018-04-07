import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PreferencesMySuffix } from './preferences-my-suffix.model';
import { PreferencesMySuffixPopupService } from './preferences-my-suffix-popup.service';
import { PreferencesMySuffixService } from './preferences-my-suffix.service';

@Component({
    selector: 'jhi-preferences-my-suffix-dialog',
    templateUrl: './preferences-my-suffix-dialog.component.html'
})
export class PreferencesMySuffixDialogComponent implements OnInit {

    preferences: PreferencesMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private preferencesService: PreferencesMySuffixService,
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
        if (this.preferences.id !== undefined) {
            this.subscribeToSaveResponse(
                this.preferencesService.update(this.preferences));
        } else {
            this.subscribeToSaveResponse(
                this.preferencesService.create(this.preferences));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PreferencesMySuffix>>) {
        result.subscribe((res: HttpResponse<PreferencesMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PreferencesMySuffix) {
        this.eventManager.broadcast({ name: 'preferencesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-preferences-my-suffix-popup',
    template: ''
})
export class PreferencesMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencesPopupService: PreferencesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.preferencesPopupService
                    .open(PreferencesMySuffixDialogComponent as Component, params['id']);
            } else {
                this.preferencesPopupService
                    .open(PreferencesMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
