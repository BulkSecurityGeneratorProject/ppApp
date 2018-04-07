import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Girls } from './girls.model';
import { GirlsPopupService } from './girls-popup.service';
import { GirlsService } from './girls.service';

@Component({
    selector: 'jhi-girls-dialog',
    templateUrl: './girls-dialog.component.html'
})
export class GirlsDialogComponent implements OnInit {

    girls: Girls;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private girlsService: GirlsService,
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
        if (this.girls.id !== undefined) {
            this.subscribeToSaveResponse(
                this.girlsService.update(this.girls));
        } else {
            this.subscribeToSaveResponse(
                this.girlsService.create(this.girls));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Girls>>) {
        result.subscribe((res: HttpResponse<Girls>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Girls) {
        this.eventManager.broadcast({ name: 'girlsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-girls-popup',
    template: ''
})
export class GirlsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private girlsPopupService: GirlsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.girlsPopupService
                    .open(GirlsDialogComponent as Component, params['id']);
            } else {
                this.girlsPopupService
                    .open(GirlsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
