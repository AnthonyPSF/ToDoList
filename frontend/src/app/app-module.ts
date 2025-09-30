import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Todos } from './component/todos/todos';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <-- agregar CommonModule
@NgModule({
  declarations: [
    App,
    Todos
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,FormsModule,CommonModule
     
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
