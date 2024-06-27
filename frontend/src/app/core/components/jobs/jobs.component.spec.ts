import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JobsService } from '../../services/jobs.service';
import { Subject, of } from 'rxjs';
import { JOBS_MOCK } from '../../mocks/jobs.mock';
import { jobs } from '../../models/jobs.model';
import { ChangeDetectorRef } from '@angular/core';

class MatPaginatorIntlStub extends MatPaginatorIntl {
  override nextPageLabel = 'Next page';
  override previousPageLabel = 'Previous page';
  override changes = new Subject<void>();
}

class MatPaginatorStub {
  _intl: MatPaginatorIntl = new MatPaginatorIntlStub();
}

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let jobsServiceMock: JobsService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsComponent, NgOptimizedImage, ReactiveFormsModule, MatPaginatorModule, MatPaginator],
      providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlStub },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;

    jobsServiceMock = TestBed.inject(JobsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(jobsServiceMock, 'getJobs').and.returnValue(of(JOBS_MOCK))

    expect(component).toBeTruthy();
  });

  it('should populate jobs variable', fakeAsync (() => {
    const spy = spyOn(jobsServiceMock, 'getJobs').and.returnValue(of(JOBS_MOCK))

    component.initJobsList();

    expect(spy).toHaveBeenCalled();
    expect(component.jobs).toEqual(JOBS_MOCK);
  }))

  it('should not populate jobs variable', fakeAsync (() => {
    const spy = spyOn(jobsServiceMock, 'getJobs').and.returnValue(of(null))

    component.initJobsList();

    expect(spy).toHaveBeenCalled();
    expect(component.jobs).toEqual(null);
  }))

  it('should search by given string', fakeAsync (() => {
    const givenString = 'gerente'
    component.jobs = JOBS_MOCK;

    component.searchControl.setValue(givenString);
    spyOn(jobsServiceMock, 'getJobs').and.returnValue(of(JOBS_MOCK));

    tick(500);

    component.searchJob();
    
    const filterMock = JOBS_MOCK.data.filter(job => job.title.includes(givenString));
    const newMock = JOBS_MOCK;
    newMock.data = filterMock;

    expect(component.jobs).toEqual(newMock);
  }))

  it('should change paginator labels', fakeAsync (() => {
    component.paginator = new MatPaginatorStub() as MatPaginator;
    const paginator = component.paginator;
    spyOn(paginator._intl.changes, 'next');
    component.changePaginatorLabel();
    tick(500);


    fixture.autoDetectChanges();

    expect(paginator._intl.nextPageLabel).toBe('Proxima página');
    expect(paginator._intl.previousPageLabel).toBe('Página anterior');
    expect(paginator._intl.getRangeLabel(0, 10, 0)).toBe('1 de 1');
    expect(paginator._intl.getRangeLabel(0, 10, 100)).toBe('1 de 10');
    expect(paginator._intl.getRangeLabel(9, 10, 100)).toBe('10 de 10');
    expect(paginator._intl.changes.next).toHaveBeenCalled();
  }))

  it('should change page', fakeAsync (() => {
    const spy = spyOn(jobsServiceMock, 'getJobs').and.returnValue(of(JOBS_MOCK));

    const pageEvent = {
      pageIndex: 0,
      pageSize: 5,
      length: 10,
  }

    component.changePage(pageEvent);
    tick(500);


    expect(spy).toHaveBeenCalledWith(1, '');
  }))
});
