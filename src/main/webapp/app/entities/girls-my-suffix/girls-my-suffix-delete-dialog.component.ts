import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GirlsMySuffix } from './girls-my-suffix.model';
import { GirlsMySuffixPopupService } from './girls-my-suffix-popup.service';
import { GirlsMySuffixService } from './girls-my-suffix.service';

@Component({
    selector: 'jhi-girls-my-suffix-delete-dialog',
    templateUrl: './girls-my-suffix-delete-dialog.component.html'
})
export class GirlsMySuffixDeleteDialogComponent {

    girls: GirlsMySuffix;

    constructor(
        private girlsService: GirlsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.girlsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'girlsListModification',
                content: 'Deleted an girls'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-girls-my-suffix-delete-popup',
    template: ''
})
export class GirlsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private girlsPopupService: GirlsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.girlsPopupService
                .open(GirlsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
