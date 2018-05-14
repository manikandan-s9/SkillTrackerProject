import { Routes, RouterModule } from '@angular/router';
import { AddskillComponent } from './addskill/addskill.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { SkilldashboardComponent } from './skilldashboard/skilldashboard.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/skilldashboard', pathMatch: 'full' },
    { path: 'addskill', component: AddskillComponent },
    { path: 'addemployee', component: AddemployeeComponent },
    { path: 'updateemployee', component: UpdateemployeeComponent },
    { path: 'skilldashboard', component: SkilldashboardComponent },
    { path: 'viewemployee', component: ViewemployeeComponent}
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);