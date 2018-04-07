import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GirlsMySuffix } from './girls-my-suffix.model';
import { GirlsMySuffixService } from './girls-my-suffix.service';

@Injectable()
export class GirlsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private girlsService: GirlsMySuffixService

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
                this.girlsService.find(id)
                    .subscribe((girlsResponse: HttpResponse<GirlsMySuffix>) => {
                        const girls: GirlsMySuffix = girlsResponse.body;
                        girls.expirationDate = this.datePipe
                            .transform(girls.expirationDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.girlsModalRef(component, girls);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.girlsModalRef(component, new GirlsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    girlsModalRef(component: Component, girls: GirlsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.girls = girls;
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
