import { Injectable } from '@angular/core';
import { GRAY, RED, BLUE } from '~/app/shared/themes/colors';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    grayTheme =
        `.material-action-bar {background-color:                        ${GRAY['overlay-06dp']}}
         .page__content {background-color:                              ${GRAY['background-dark']}}
         .page__content .exercise {background-color:                    ${GRAY['overlay-01dp']}}
         .page__content .exercise-title {border-bottom-color:           ${GRAY['overlay-24dp']}}
         .page__content .card-quotes {background-color:                 ${GRAY['overlay-02dp']}}
         .page__content .card-quotes .quote-edit {background-color:     ${GRAY['overlay-06dp']}}
         .page__content .card-quotes .quote-delete {background-color:   ${GRAY['overlay-06dp']}}
         .page__content .card-quotes .quote-save {background-color:     ${GRAY['overlay-06dp']}}
         .nt-drawer__header-background {background-color:               ${GRAY['overlay-04dp']}}
         .nt-drawer__body {background-color:                            ${GRAY['background-dark']}}`;

    redTheme =
        `.material-action-bar {background-color:                        ${RED['overlay-06dp']}}
         .page__content {background-color:                              ${RED['background-dark']}}
         .page__content .exercise {background-color:                    ${RED['overlay-01dp']}}
         .page__content .exercise-title {border-bottom-color:           ${RED['overlay-24dp']}}
         .page__content .card-quotes {background-color:                 ${RED['overlay-02dp']}}
         .page__content .card-quotes .quote-edit {background-color:     ${RED['overlay-06dp']}}
         .page__content .card-quotes .quote-delete {background-color:   ${RED['overlay-06dp']}}
         .page__content .card-quotes .quote-save {background-color:     ${RED['overlay-06dp']}}
         .nt-drawer__header-background {background-color:               ${RED['overlay-04dp']}}
         .nt-drawer__body {background-color:                            ${RED['background-dark']}}`;

    blueTheme =
        `.material-action-bar {background-color:                        ${BLUE['overlay-06dp']}}
         .page__content {background-color:                              ${BLUE['background-dark']}}
         .page__content .exercise {background-color:                    ${BLUE['overlay-01dp']}}
         .page__content .exercise-title {border-bottom-color:           ${BLUE['overlay-24dp']}}
         .page__content .card-quotes {background-color:                 ${BLUE['overlay-02dp']}}
         .page__content .card-quotes .quote-edit {background-color:     ${BLUE['overlay-06dp']}}
         .page__content .card-quotes .quote-delete {background-color:   ${BLUE['overlay-06dp']}}
         .page__content .card-quotes .quote-save {background-color:     ${BLUE['overlay-06dp']}}
         .nt-drawer__header-background {background-color:               ${BLUE['overlay-04dp']}}
         .nt-drawer__body {background-color:                            ${BLUE['background-dark']}}`;
}
