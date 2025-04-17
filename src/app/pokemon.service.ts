import { inject, Injectable } from "@angular/core";
import { POKEMON_LIST } from "./pokemon-list";
import type { Pokemon, PokemonList } from "./pokemon.model";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PokemonService {
	readonly #POKEMON_API_URL = "http://localhost:3000/pokemons";
	readonly #http = inject(HttpClient);

	getPokemonList(): Observable<PokemonList> {
		return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
	}
	getPokemonById(id: number): Pokemon {
		const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);
		if (!pokemon) {
			throw new Error(`Pokemon with id ${id} not found`);
		}
		return pokemon;
	}
	getPokemonTypeList(): string[] {
		return [
			"Plante",
			"Feu",
			"Eau",
			"Normal",
			"Insecte",
			"Vol",
			"Electrik",
			"Fée",
			"Poison",
		];
	}
}
