// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';

registerElement('CardView', () => CardView);
enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);
