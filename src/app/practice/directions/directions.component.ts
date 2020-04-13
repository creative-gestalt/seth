import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { DatabaseExercisesPractice } from '~/app/shared/databases/database-exercises-practice';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'Directions',
    templateUrl: './directions.component.html'
})
export class DirectionsComponent {
    actionBar: number;
    directions: string;
    name: string;

    constructor(
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute,
        private _exercisesDatabase: DatabaseExercisesPractice
    ) {
        this.actionBar = 4;
        this._activatedRoute.params.subscribe((params) => {
            this.directions = params.directions;
            this.name = params.name;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
