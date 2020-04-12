import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { DatabaseExercises } from '~/app/shared/databases/database-exercises';
import { Exercises } from '~/app/shared/interfaces/exercises.interface';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'Directions',
    templateUrl: './directions.component.html'
})
export class DirectionsComponent implements OnInit {
    directions: string;
    name: string;

    get exercises(): ObservableArray<Exercises> {
        return this._exercises;
    }

    private _exercises: ObservableArray<Exercises>;

    constructor(
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute,
        private _exercisesDatabase: DatabaseExercises
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.directions = params.directions;
            this.name = params.name;
        });
    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
