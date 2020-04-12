import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { BooksComponent } from './books/books.component';
import { DatabaseExercises } from '~/app/shared/databases/database-exercises';
import { ExercisesComponent } from '~/app/exercises/exercises/exercises.component';
import { DirectionsComponent } from '~/app/exercises/directions/directions.component';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ExercisesRoutingModule,
        NativeScriptUIListViewModule,
        CommonModule
    ],
    declarations: [
        BooksComponent,
        ExercisesComponent,
        DirectionsComponent
    ],
    providers: [
        DatabaseExercises
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ExercisesModule { }
