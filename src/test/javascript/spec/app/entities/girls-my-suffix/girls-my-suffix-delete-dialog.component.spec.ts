/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PpAppTestModule } from '../../../test.module';
import { GirlsMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix-delete-dialog.component';
import { GirlsMySuffixService } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.service';

describe('Component Tests', () => {

    describe('GirlsMySuffix Management Delete Component', () => {
        let comp: GirlsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<GirlsMySuffixDeleteDialogComponent>;
        let service: GirlsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [GirlsMySuffixDeleteDialogComponent],
                providers: [
                    GirlsMySuffixService
                ]
            })
            .overrideTemplate(GirlsMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GirlsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GirlsMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
