/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TcsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SuperiorDetailComponent } from '../../../../../../main/webapp/app/entities/superior/superior-detail.component';
import { SuperiorService } from '../../../../../../main/webapp/app/entities/superior/superior.service';
import { Superior } from '../../../../../../main/webapp/app/entities/superior/superior.model';

describe('Component Tests', () => {

    describe('Superior Management Detail Component', () => {
        let comp: SuperiorDetailComponent;
        let fixture: ComponentFixture<SuperiorDetailComponent>;
        let service: SuperiorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TcsTestModule],
                declarations: [SuperiorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SuperiorService,
                    JhiEventManager
                ]
            }).overrideTemplate(SuperiorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuperiorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuperiorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Superior(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.superior).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
