import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { setString } from 'tns-core-modules/application-settings';
import { Page } from 'tns-core-modules/ui/page/page';
import { ThemeService } from '~/app/shared/services/theme.service';

@Component({
    selector: 'Settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

    constructor(
        private _page: Page,
        private _theme: ThemeService
    ) {
    }

    ngOnInit(): void {
        // don't need anything here yet
    }

    onGrayTap(): void {
        setString('color', 'gray');
        app.addCss(this._theme.grayTheme);
    }

    onRedTap(): void {
        setString('color', 'red');
        app.addCss(this._theme.redTheme);
    }

    onTealTap(): void {
        setString('color', 'teal');
        app.addCss(this._theme.tealTheme);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
