import { Injectable, inject } from '@angular/core';
import { job, jobs } from '../models/jobs.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  /**
   * HttpClient Injection
   */
  private httpClient = inject(HttpClient);
  
  /**
   * Jobs BehaviorSubject
   */
  public jobs: Observable<jobs | null> = new BehaviorSubject<jobs | null>(null);

  /**
   * @internal
   */
  constructor() { 
    this.jobs = this.getJobs();
  }

  /**
   * Get jobs from BFF
   * @param page 
   * @param search 
   * @returns {Observable<jobs>}
   */
  getJobs(page = 1, search?: string): Observable<jobs | null> {
    return this.httpClient.get<jobs | null>(`${environment.API}jobs?page=${page}${search ? `&search=${search}` : ''}`)
  }
}
