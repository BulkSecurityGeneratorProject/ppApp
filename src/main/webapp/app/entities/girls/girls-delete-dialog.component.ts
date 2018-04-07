import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Girls } from './girls.model';
import { GirlsPopupService } from './girls-popup.service';
import { GirlsService } from './girls.service';

@Component({
    selector: 'jhi-girls-delete-dialog',
    templateUrl: './girls-delete-dialog.component.html'
})
export class GirlsDeleteDialogComponent {

    girls: Girls;

    constructor(
        private girlsService: GirlsService,
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
    selector: 'jhi-girls-delete-popup',
    template: ''
})
export class GirlsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private girlsPopupService: GirlsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.girlsPopupService
                .open(GirlsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
