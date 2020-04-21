import { Injectable } from '@angular/core';
const grayTheme = require('~/styles/themes/gray-theme.scss');
const redTheme = require('~/styles/themes/red-theme.scss');
const tealTheme = require('~/styles/themes/teal-theme.scss');

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    grayTheme = grayTheme;

    redTheme = redTheme;

    tealTheme = tealTheme;
}
