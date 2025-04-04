import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import type { Routes } from "@angular/router";
import type { ApplicationConfig } from "@angular/core";
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";
import { PokemonProfileComponent } from "./pokemon/pokemon-profile/pokemon-profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
	{
		path: "pokemons/:id",
		component: PokemonProfileComponent,
		title: "pokemon",
	},
	{ path: "pokemons", component: PokemonListComponent, title: "pokedex" },
	{ path: "", redirectTo: "pokemons", pathMatch: "full" },
	{ path: "**", component: PageNotFoundComponent },
];

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	],
};
