import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from "../../pokemon.service";
import { Pokemon } from "../../pokemon.model";

@Component({
	selector: "app-pokemon-profile",
	imports: [],
	templateUrl: "./pokemon-profile.component.html",
	styles: "",
})
export class PokemonProfileComponent {
	readonly #route = inject(ActivatedRoute);
	readonly #pokemonService = inject(PokemonService);
	readonly #pokemonId = Number(this.#route.snapshot.paramMap.get("id"));
	readonly pokemon = signal(
		this.#pokemonService.getPokemonById(this.#pokemonId),
	);
}
