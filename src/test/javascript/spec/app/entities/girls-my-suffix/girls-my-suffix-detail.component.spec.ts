/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PpAppTestModule } from '../../../test.module';
import { GirlsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix-detail.component';
import { GirlsMySuffixService } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.service';
import { GirlsMySuffix } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.model';

describe('Component Tests', () => {

    describe('GirlsMySuffix Management Detail Component', () => {
        let comp: GirlsMySuffixDetailComponent;
        let fixture: ComponentFixture<GirlsMySuffixDetailComponent>;
        let service: GirlsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [GirlsMySuffixDetailComponent],
                providers: [
                    GirlsMySuffixService
                ]
            })
            .overrideTemplate(GirlsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GirlsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GirlsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GirlsMySuffix('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.girls).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
