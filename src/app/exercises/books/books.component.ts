import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { DatabaseExercises } from '~/app/shared/databases/database-exercises';
import { Exercises } from '~/app/shared/interfaces/exercises.interface';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { BOOKS } from '~/app/exercises/books/books';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'Books',
    templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
    books;

    get exercises(): ObservableArray<Exercises> {
        return this._exercises;
    }

    private _exercises: ObservableArray<Exercises>;

    constructor(
        private _router: RouterExtensions,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.books = BOOKS;
    }

    ngOnInit(): void {
        const route = this._router.router.url;
        console.log(route);
    }

    onBookTap(bookArgs, book) {
        this._router.navigate(['../exercises', {book}],
            {
                transition: {
                    name: 'fade',
                    duration: 300
                },
                relativeTo: this._activatedRoute
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
