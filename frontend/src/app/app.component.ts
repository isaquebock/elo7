import { NgOptimizedImage } from '@angular/common';
import { APP_INITIALIZER, Component, ErrorHandler } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './core/components/hero/hero.component';
import { StatementComponent } from './core/components/statement/statement.component';
import { TeamComponent } from './core/components/team/team.component';
import { ValuesComponent } from './core/components/values/values.component';
import { JobsComponent } from './core/components/jobs/jobs.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, HeroComponent, StatementComponent, TeamComponent, ValuesComponent, JobsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
