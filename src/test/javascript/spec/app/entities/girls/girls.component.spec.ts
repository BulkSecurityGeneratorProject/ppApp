/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PpAppTestModule } from '../../../test.module';
import { GirlsComponent } from '../../../../../../main/webapp/app/entities/girls/girls.component';
import { GirlsService } from '../../../../../../main/webapp/app/entities/girls/girls.service';
import { Girls } from '../../../../../../main/webapp/app/entities/girls/girls.model';

describe('Component Tests', () => {

    describe('Girls Management Component', () => {
        let comp: GirlsComponent;
        let fixture: ComponentFixture<GirlsComponent>;
        let service: GirlsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [GirlsComponent],
                providers: [
                    GirlsService
                ]
            })
            .overrideTemplate(GirlsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GirlsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GirlsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Girls('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.girls[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
