import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PokemonList } from './components/pokemon-list/pokemon-list';
import { PokemonDetails } from './components/pokemon-details/pokemon-details';
import { SearchBar } from './components/search-bar/search-bar';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { TypeBadges } from './components/type-badges/type-badges';

@NgModule({
  declarations: [
    App,
    PokemonList,
    PokemonDetails,
    SearchBar,
    LoadingSpinner,
    TypeBadges
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
