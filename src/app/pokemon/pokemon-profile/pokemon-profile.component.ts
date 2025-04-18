import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PokemonService } from "../../pokemon.service";
import { Pokemon } from "../../pokemon.model";
import { DatePipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-pokemon-profile",
	imports: [DatePipe, RouterLink],
	templateUrl: "./pokemon-profile.component.html",
	styles: "",
})
export class PokemonProfileComponent {
	readonly #route = inject(ActivatedRoute);
	readonly #pokemonService = inject(PokemonService);
	readonly #pokemonId = Number(this.#route.snapshot.paramMap.get("id"));
	readonly pokemon = toSignal(
		this.#pokemonService.getPokemonById(this.#pokemonId),
	);
}
