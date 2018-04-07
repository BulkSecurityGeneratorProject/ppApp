import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GirlsMySuffix } from './girls-my-suffix.model';
import { GirlsMySuffixPopupService } from './girls-my-suffix-popup.service';
import { GirlsMySuffixService } from './girls-my-suffix.service';

@Component({
    selector: 'jhi-girls-my-suffix-dialog',
    templateUrl: './girls-my-suffix-dialog.component.html'
})
export class GirlsMySuffixDialogComponent implements OnInit {

    girls: GirlsMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private girlsService: GirlsMySuffixService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<GirlsMySuffix>>) {
        result.subscribe((res: HttpResponse<GirlsMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GirlsMySuffix) {
        this.eventManager.broadcast({ name: 'girlsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-girls-my-suffix-popup',
    template: ''
})
export class GirlsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private girlsPopupService: GirlsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.girlsPopupService
                    .open(GirlsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.girlsPopupService
                    .open(GirlsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
