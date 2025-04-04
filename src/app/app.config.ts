import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import type { Routes } from "@angular/router";
import type { ApplicationConfig } from "@angular/core";
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";

const routes: Routes = [
	{ path: "pokemons", component: PokemonListComponent },
	{ path: "", redirectTo: "pokemons", pathMatch: "full" },
];

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	],
};
