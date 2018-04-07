/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PpAppTestModule } from '../../../test.module';
import { PreferencesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix-detail.component';
import { PreferencesMySuffixService } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.service';
import { PreferencesMySuffix } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.model';

describe('Component Tests', () => {

    describe('PreferencesMySuffix Management Detail Component', () => {
        let comp: PreferencesMySuffixDetailComponent;
        let fixture: ComponentFixture<PreferencesMySuffixDetailComponent>;
        let service: PreferencesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [PreferencesMySuffixDetailComponent],
                providers: [
                    PreferencesMySuffixService
                ]
            })
            .overrideTemplate(PreferencesMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferencesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferencesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PreferencesMySuffix('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.preferences).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
