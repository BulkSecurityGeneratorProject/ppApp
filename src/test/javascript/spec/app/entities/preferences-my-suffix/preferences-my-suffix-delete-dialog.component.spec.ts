/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PpAppTestModule } from '../../../test.module';
import { PreferencesMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix-delete-dialog.component';
import { PreferencesMySuffixService } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.service';

describe('Component Tests', () => {

    describe('PreferencesMySuffix Management Delete Component', () => {
        let comp: PreferencesMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PreferencesMySuffixDeleteDialogComponent>;
        let service: PreferencesMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [PreferencesMySuffixDeleteDialogComponent],
                providers: [
                    PreferencesMySuffixService
                ]
            })
            .overrideTemplate(PreferencesMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferencesMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferencesMySuffixService);
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
