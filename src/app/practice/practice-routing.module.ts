import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PracticeElementComponent } from '~/app/practice/practice-elements/practice-element.component';
import { DirectionsComponent } from '~/app/practice/directions/directions.component';

const routes: Routes = [
    { path: '', redirectTo: 'elements', pathMatch: 'full' },
    { path: 'elements', component: PracticeElementComponent },
    { path: 'directions', component: DirectionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PracticeRoutingModule { }
