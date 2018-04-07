/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PpAppTestModule } from '../../../test.module';
import { PreferencesMySuffixComponent } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.component';
import { PreferencesMySuffixService } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.service';
import { PreferencesMySuffix } from '../../../../../../main/webapp/app/entities/preferences-my-suffix/preferences-my-suffix.model';

describe('Component Tests', () => {

    describe('PreferencesMySuffix Management Component', () => {
        let comp: PreferencesMySuffixComponent;
        let fixture: ComponentFixture<PreferencesMySuffixComponent>;
        let service: PreferencesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [PreferencesMySuffixComponent],
                providers: [
                    PreferencesMySuffixService
                ]
            })
            .overrideTemplate(PreferencesMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferencesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferencesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PreferencesMySuffix('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.preferences[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
