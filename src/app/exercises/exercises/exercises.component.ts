import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { DatabaseExercises } from '~/app/shared/databases/database-exercises';
import { Exercises } from '~/app/shared/interfaces/exercises.interface';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { BOOKS } from '~/app/exercises/books/books';
import { isAndroid } from 'tns-core-modules/platform';
import { Label } from 'tns-core-modules/ui/label';

@Component({
    selector: 'Exercises',
    templateUrl: './exercises.component.html'
})
export class ExercisesComponent implements OnInit {
    exercises: Array<Exercises>;
    sethSpeaks: Array<Exercises>;
    sessionsOne: Array<Exercises>;
    massEvents: Array<Exercises>;
    personalReality: Array<Exercises>;
    psyche: Array<Exercises>;
    unknownOne: Array<Exercises>;
    unknownTwo: Array<Exercises>;
    towardsHealth: Array<Exercises>;
    elevation: number;

    constructor(
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute,
        private _exercisesDatabase: DatabaseExercises
    ) {
    }

    ngOnInit(): void {
        this.elevation = 2;
        this._exercisesDatabase.fetch().then((results) => {
            this.exercises = results;
            this.sethSpeaks         = this.exercises.filter((b) => b.book === BOOKS[0]);
            this.sessionsOne        = this.exercises.filter((b) => b.book === BOOKS[1]);
            this.massEvents         = this.exercises.filter((b) => b.book === BOOKS[2]);
            this.personalReality    = this.exercises.filter((b) => b.book === BOOKS[3]);
            this.psyche             = this.exercises.filter((b) => b.book === BOOKS[4]);
            this.unknownOne         = this.exercises.filter((b) => b.book === BOOKS[5]);
            this.unknownTwo         = this.exercises.filter((b) => b.book === BOOKS[6]);
            this.towardsHealth      = this.exercises.filter((b) => b.book === BOOKS[7]);
        });
    }

    onLabelLoaded(args) {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(16);
        }
    }

    onExerciseTap(exArgs, directions, name) {
        this._router.navigate(['../directions', {directions, name}],
            {
                transition: {
                    name: 'slide',
                    duration: 200
                },
                relativeTo: this._activatedRoute
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
