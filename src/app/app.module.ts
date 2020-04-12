import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { SharedModule } from '~/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { DatabaseExercisesPractice } from '~/app/shared/databases/database-exercises-practice';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        DatabaseExercisesPractice
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
