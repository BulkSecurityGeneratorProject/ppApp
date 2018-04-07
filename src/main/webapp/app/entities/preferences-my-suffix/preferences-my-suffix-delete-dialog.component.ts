import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PreferencesMySuffix } from './preferences-my-suffix.model';
import { PreferencesMySuffixPopupService } from './preferences-my-suffix-popup.service';
import { PreferencesMySuffixService } from './preferences-my-suffix.service';

@Component({
    selector: 'jhi-preferences-my-suffix-delete-dialog',
    templateUrl: './preferences-my-suffix-delete-dialog.component.html'
})
export class PreferencesMySuffixDeleteDialogComponent {

    preferences: PreferencesMySuffix;

    constructor(
        private preferencesService: PreferencesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.preferencesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'preferencesListModification',
                content: 'Deleted an preferences'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-preferences-my-suffix-delete-popup',
    template: ''
})
export class PreferencesMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencesPopupService: PreferencesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.preferencesPopupService
                .open(PreferencesMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
