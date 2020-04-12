import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ExercisesComponent } from '~/app/exercises/exercises/exercises.component';
import { DirectionsComponent } from '~/app/exercises/directions/directions.component';

const routes: Routes = [
    { path: '', redirectTo: 'exercises', pathMatch: 'full' },
    { path: 'exercises', component: ExercisesComponent },
    { path: 'directions', component: DirectionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ExercisesRoutingModule { }
