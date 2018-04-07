/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PpAppTestModule } from '../../../test.module';
import { GirlsMySuffixComponent } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.component';
import { GirlsMySuffixService } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.service';
import { GirlsMySuffix } from '../../../../../../main/webapp/app/entities/girls-my-suffix/girls-my-suffix.model';

describe('Component Tests', () => {

    describe('GirlsMySuffix Management Component', () => {
        let comp: GirlsMySuffixComponent;
        let fixture: ComponentFixture<GirlsMySuffixComponent>;
        let service: GirlsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PpAppTestModule],
                declarations: [GirlsMySuffixComponent],
                providers: [
                    GirlsMySuffixService
                ]
            })
            .overrideTemplate(GirlsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GirlsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GirlsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GirlsMySuffix('123')],
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
