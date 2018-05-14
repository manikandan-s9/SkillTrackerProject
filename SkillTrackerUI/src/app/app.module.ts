import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AddskillComponent } from './addskill/addskill.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { SkilldashboardComponent } from './skilldashboard/skilldashboard.component';
import { SkillTrackerService } from './Service/skilltracker.service';
import { AssociateFilterPipe } from './skilldashboard/associate-filter.pipe'
import { CONST_ROUTING } from './app.routing';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component'; 
const routes: Routes = [
  { path: 'addskill', component: AddskillComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'updateemployee', component: UpdateemployeeComponent },
  { path: 'viewemployee', component: ViewemployeeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddskillComponent,
    AddemployeeComponent,
    UpdateemployeeComponent,
    SkilldashboardComponent,
    AssociateFilterPipe,
    ViewemployeeComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    CONST_ROUTING,
    FormsModule,
    JsonpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [SkillTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
