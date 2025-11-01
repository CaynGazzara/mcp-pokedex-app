import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing-module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TypeBadgesComponent } from './components/type-badges/type-badges.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,
    TypeBadgesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }