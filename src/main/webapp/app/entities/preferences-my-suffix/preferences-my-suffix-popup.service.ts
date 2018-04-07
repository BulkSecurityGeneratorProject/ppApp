import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PreferencesMySuffix } from './preferences-my-suffix.model';
import { PreferencesMySuffixService } from './preferences-my-suffix.service';

@Injectable()
export class PreferencesMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private preferencesService: PreferencesMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.preferencesService.find(id)
                    .subscribe((preferencesResponse: HttpResponse<PreferencesMySuffix>) => {
                        const preferences: PreferencesMySuffix = preferencesResponse.body;
                        this.ngbModalRef = this.preferencesModalRef(component, preferences);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.preferencesModalRef(component, new PreferencesMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    preferencesModalRef(component: Component, preferences: PreferencesMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.preferences = preferences;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
