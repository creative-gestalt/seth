import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { SharedModule } from '~/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { DatabaseExercisesPractice } from '~/app/shared/databases/database-exercises-practice';
import { DatabaseSaved } from '~/app/shared/databases/database-saved';
import { AppComponent } from './app.component';
import { ThemeService } from '~/app/shared/services/theme.service';

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
        DatabaseExercisesPractice,
        DatabaseSaved,
        ThemeService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
