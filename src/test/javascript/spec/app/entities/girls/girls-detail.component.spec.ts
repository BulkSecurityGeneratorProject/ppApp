/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PpAppTestModule } from '../../../test.module';
import { GirlsDetailComponent } from '../../../../../../main/webapp/app/entities/girls/girls-detail.component';
import { GirlsService } from '../../../../../../main/webapp/app/entities/girls/girls.service';
import { Girls } from '../../../../../../main/webapp/app/entities/girls/girls.model';

describe('Component Tests', () => {

    describe('Girls Management Detail Component', () => {
        let comp: GirlsDetailComponent;
        let fixture: ComponentFixture<GirlsDetailComponent>;
        let service: GirlsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [GirlsDetailComponent],
                providers: [
                    GirlsService
                ]
            })
            .overrideTemplate(GirlsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GirlsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GirlsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Girls('123')
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
