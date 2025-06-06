import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import type { Routes } from "@angular/router";
import type { ApplicationConfig } from "@angular/core";
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";
import { PokemonProfileComponent } from "./pokemon/pokemon-profile/pokemon-profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PokemonEditComponent } from "./pokemon/pokemon-edit/pokemon-edit.component";
import { provideHttpClient } from "@angular/common/http";
import { AuthGuard } from "./core/auth/auth.guard";
import { LoginComponent } from "./login/login.component";
import { PokemonAddComponent } from "./pokemon/pokemon-add/pokemon-add.component";

const routes: Routes = [
	{
		path: "login",
		component: LoginComponent,
		title: "Connexion",
	},
	{
		path: "pokemons",
		canActivateChild: [AuthGuard],
		children: [
			{
				path: "add",
				component: PokemonAddComponent,
				title: "Ajout d'un pokemon",
			},
			{
				path: "edit/:id",
				component: PokemonEditComponent,
				title: "Edition d'un pokemon",
			},
			{
				path: ":id",
				component: PokemonProfileComponent,
				title: "pokemon",
			},
			{
				path: "",
				component: PokemonListComponent,
				title: "pokedex",
				canActivate: [AuthGuard],
			},
		],
	},
	{ path: "", redirectTo: "pokemons", pathMatch: "full" },
	{ path: "**", component: PageNotFoundComponent },
];

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
	],
};
