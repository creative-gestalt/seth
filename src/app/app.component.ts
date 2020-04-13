import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { DatabaseExercisesPractice } from '~/app/shared/databases/database-exercises-practice';
import { DatabaseSaved } from '~/app/shared/databases/database-saved';
import { ThemeService } from '~/app/shared/services/theme.service';
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from 'tns-core-modules/application';
import { filter } from 'rxjs/operators';
import { setString, getString } from 'tns-core-modules/application-settings';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private _router: Router,
        private _saved: DatabaseSaved,
        private _routerExtensions: RouterExtensions,
        private _exercisePractice: DatabaseExercisesPractice,
        private _theme: ThemeService
    ) {
    }

    ngOnInit(): void {
        this._activatedUrl = '/search';
        this._sideDrawerTransition = new SlideInOnTopTransition();
        switch (getString('color')) {
            case 'gray':
                app.addCss(this._theme.grayTheme);
                break;
            case 'red':
                app.addCss(this._theme.redTheme);
                break;
        }

        this._router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this._routerExtensions.navigate([navItemRoute], {
            transition: {
                name: 'fade'
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
