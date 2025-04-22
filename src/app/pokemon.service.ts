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
		return this.#http.get<Pokemon>(`${this.#POKEMON_API_URL}/${id}`);
	}

	updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
		return this.#http.put<Pokemon>(
			`${this.#POKEMON_API_URL}/${pokemon.id}`,
			pokemon,
		);
	}

	deletePokemon(pokemonId: number): Observable<void> {
		return this.#http.delete<void>(`${this.#POKEMON_API_URL}/${pokemonId}`);
	}

	addPokemon(pokemon: Omit<Pokemon, "id">): Observable<Pokemon> {
		return this.#http.post<Pokemon>(this.#POKEMON_API_URL, pokemon);
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
