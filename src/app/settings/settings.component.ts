import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { setString, getString } from 'tns-core-modules/application-settings';
import { Page } from 'tns-core-modules/ui/page/page';
import { ThemeService } from '~/app/shared/services/theme.service';
import { GRAY, RED } from '~/app/shared/themes/colors';

@Component({
    selector: 'Settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

    constructor(
        private _page: Page,
        private _theme: ThemeService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onGrayTap(): void {
        setString('color', 'gray');
        app.addCss(this._theme.grayTheme);
    }

    onRedTap(): void {
        setString('color', 'red');
        app.addCss(this._theme.redTheme);
    }

    onBlueTap(): void {
        setString('color', 'blue');
        app.addCss(this._theme.blueTheme);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
