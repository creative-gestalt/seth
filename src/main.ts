// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

registerElement('CardView', () => CardView);
enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);
