import { Injectable } from "@angular/core";
import { POKEMON_LIST } from "./pokemon-list";
import type { Pokemon, PokemonList } from "./pokemon.model";

@Injectable({
	providedIn: "root",
})
export class PokemonService {
	getPokemonList(): PokemonList {
		return POKEMON_LIST;
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
