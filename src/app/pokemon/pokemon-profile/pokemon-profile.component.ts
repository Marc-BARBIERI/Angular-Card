import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { PokemonService } from "../../pokemon.service";
import { Pokemon } from "../../pokemon.model";
import { DatePipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of } from "rxjs";

@Component({
	selector: "app-pokemon-profile",
	imports: [DatePipe, RouterLink],
	templateUrl: "./pokemon-profile.component.html",
	styles: "",
})
export class PokemonProfileComponent {
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #pokemonService = inject(PokemonService);

	readonly #pokemonId = Number(this.#route.snapshot.paramMap.get("id"));

	readonly #pokemonResponse = toSignal(
		this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
			map((pokemon) => ({
				value: pokemon,
				error: undefined,
			})),
			catchError((error) => of({ value: undefined, error: error })),
		),
	);

	readonly loading = computed(() => this.#pokemonResponse === undefined);
	readonly error = computed(() => this.#pokemonResponse()?.error);
	readonly pokemon = computed(() => this.#pokemonResponse()?.value);

	deletePokemon() {
		this.#pokemonService.deletePokemon(this.#pokemonId).subscribe(() => {
			this.#router.navigate(["/pokemons"]);
		});
	}
}
