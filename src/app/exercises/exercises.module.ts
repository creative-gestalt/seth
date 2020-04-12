import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { CommonModule } from '@angular/common';

import { DirectionsComponent } from '~/app/exercises/directions/directions.component';
import { ExercisesComponent } from '~/app/exercises/exercises/exercises.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ExercisesRoutingModule,
        NativeScriptUIListViewModule,
        CommonModule
    ],
    declarations: [
        ExercisesComponent,
        DirectionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ExercisesModule { }
