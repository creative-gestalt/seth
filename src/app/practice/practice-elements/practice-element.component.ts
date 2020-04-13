import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseExercisesPractice } from '~/app/shared/databases/database-exercises-practice';
import { Exercises } from '~/app/shared/interfaces/exercises.interface';
import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { BOOKS } from '~/app/shared/components/books';
import { isAndroid } from 'tns-core-modules/platform';
import * as app from 'tns-core-modules/application';
import { Label } from 'tns-core-modules/ui/label';

@Component({
    selector: 'Practice',
    templateUrl: './practice-element.component.html'
})
export class PracticeElementComponent implements OnInit {
    elements: Array<Exercises>;
    unknownOne: Array<Exercises>;
    unknownTwo: Array<Exercises>;
    elevation: number;

    constructor(
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute,
        private _elements: DatabaseExercisesPractice
    ) {
    }

    ngOnInit(): void {
        this.elevation = 2;
        this._elements.fetchPracticeElements().then((results) => {
            this.elements = results;
            this.unknownOne = this.elements.filter((b) => b.book === BOOKS[5]);
            this.unknownTwo = this.elements.filter((b) => b.book === BOOKS[6]);
        });
    }

    onLabelLoaded(args) {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(16);
        }
    }

    onElementTap(exArgs, directions, name) {
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
