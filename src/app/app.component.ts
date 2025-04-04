import { Component, computed, inject, signal } from "@angular/core";
import type { Pokemon, PokemonList } from "./pokemon.model";
import { PokemonBorderDirective } from "./pokemon-border.directive";
import { DatePipe } from "@angular/common";
import { PokemonService } from "./pokemon.service";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, RouterLink],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {}
