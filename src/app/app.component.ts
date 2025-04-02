import { Component, computed, inject, signal } from "@angular/core";
import type { Pokemon, PokemonList } from "./pokemon.model";
import { PokemonBorderDirective } from "./pokemon-border.directive";
import { DatePipe } from "@angular/common";
import { PokemonService } from "./pokemon.service";

@Component({
	selector: "app-root",
	imports: [PokemonBorderDirective, DatePipe],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	readonly #pokemonService = inject(PokemonService);
	readonly pokemonList = signal(this.#pokemonService.getPokemonList());

	readonly searchTerm = signal("");
	readonly pokemonListFiltered = computed(() => {
		const pokemonList = this.pokemonList();
		const searchTerm = this.searchTerm();

		return pokemonList.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
		);
	});

	size(pokemon: Pokemon) {
		if (pokemon.life < 15) {
			return "small";
		}
		if (pokemon.life > 25) {
			return "large";
		}
		return "medium";
	}

	imageSrc = signal(
		"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
	);

	incrementLife(pokemon: Pokemon) {
		pokemon.life = pokemon.life + 1;
	}
	decrementLife(pokemon: Pokemon) {
		pokemon.life = pokemon.life - 1;
	}
}
