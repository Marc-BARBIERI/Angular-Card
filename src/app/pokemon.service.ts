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
	getPokemonById(id: number): Observable<Pokemon> {
		const url = `${this.#POKEMON_API_URL}/${id}`;
		return this.#http.get<Pokemon>(url);
	}

	updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
		const url = `${this.#POKEMON_API_URL}/${pokemon.id}`;
		return this.#http.put<Pokemon>(url, pokemon);
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
