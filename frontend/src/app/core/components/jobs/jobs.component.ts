import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { HttpClient } from '@angular/common/http';
import { jobs } from '../../models/jobs.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator'; 

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [ReactiveFormsModule, MatPaginatorModule],
  providers: [HttpClient],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  /**
   * JobsService Injection
   */
  public jobsService = inject(JobsService);

  /**
   * Jobs
   */
  public jobs: jobs | null = null;


  /**
   * Loading
   */
  public loading = false;


  /**
   * Search control
   */
  public searchControl: FormControl = new FormControl();

  /**
   * @internal
   */
  ngOnInit(): void {
    this.initJobsList();    
    this.searchJob();
  }

  /**
   * @internal
   */
  ngAfterViewInit(): void {
    this.paginator && this.changePaginatorLabel();
  }

  /**
   * Init jobs list
   */
  public initJobsList(): void {
    this.jobsService.getJobs()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response: jobs | null) => {
        if(response) {
          this.loading = true;
          this.jobs = response;
        }
      });
  }

  /**
   * Change paginator label
   */
  public changePaginatorLabel(): void {
    if(this.paginator) {
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if(!length) return (`${page + 1} de ${length + 1}`)
        return (`${page + 1} de ${Math.ceil((length / pageSize))}`)
      }
      this.paginator._intl.nextPageLabel = 'Proxima página';
      this.paginator._intl.previousPageLabel= 'Página anterior';

      this.paginator._intl.changes.next();
    };
  }

  /**
   * Search job by input
   */
  public searchJob(): void {
    this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        debounceTime(50), 
        switchMap((search: string) => this.jobsService.getJobs(1, search)),
      )
      .subscribe((response: jobs | null) => {
        this.jobs = response;
        this.loading = false;
      });
  }

  /**
   * Paginator change page
   * @param {PageEvent} event 
   */
  public changePage(event: PageEvent): void {
    const searchValue = this.searchControl.value ?? '';
    this.loading = true;

    this.jobsService.getJobs(event.pageIndex + 1, searchValue)
    .pipe(
      finalize(() => {
        this.loading = false;
      }),
    )
    .subscribe((response: jobs | null) => {
      if(response) {
        this.jobs = response;
      }
    });
  }
}

