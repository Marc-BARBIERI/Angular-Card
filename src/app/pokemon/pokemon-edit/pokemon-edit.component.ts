import { DatePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PokemonService } from "../../pokemon.service";
import {
	Form,
	FormArray,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { getPokemonColor, POKEMON_RULES } from "../../pokemon.model";

@Component({
	selector: "app-pokemon-edit",
	standalone: true,
	imports: [RouterLink, ReactiveFormsModule],
	templateUrl: "./pokemon-edit.component.html",
	styles: "",
})
export class PokemonEditComponent {
	readonly route = inject(ActivatedRoute);
	readonly pokemonService = inject(PokemonService);
	readonly pokemonId = signal(
		Number(this.route.snapshot.paramMap.get("id")),
	).asReadonly();
	readonly pokemon = signal(
		this.pokemonService.getPokemonById(this.pokemonId()),
	).asReadonly();

	readonly form = new FormGroup({
		name: new FormControl(this.pokemon().name, [
			Validators.required,
			Validators.minLength(POKEMON_RULES.MIN_NAME),
			Validators.maxLength(POKEMON_RULES.MAX_NAME),
			Validators.pattern(POKEMON_RULES.NAME_PATTERN),
		]),
		life: new FormControl(this.pokemon().life),
		damage: new FormControl(this.pokemon().damage),
		types: new FormArray(
			this.pokemon().types.map((type) => new FormControl(type)),
		),
	});

	get pokemonTypeList(): FormArray {
		return this.form.get("types") as FormArray;
	}
	isPokemonTypeSelected(type: string): boolean {
		return !!this.pokemonTypeList.controls.find(
			(control) => control.value === type,
		);
	}
	onPokemontypeChange(type: string, ischecked: boolean) {
		if (ischecked) {
			const control = new FormControl(type);
			this.pokemonTypeList.push(control);
		} else {
			const index = this.pokemonTypeList.controls
				.map((control) => control.value)
				.indexOf(type);
			this.pokemonTypeList.removeAt(index);
		}
	}

	getPokemonTypeColor(type: string) {
		return getPokemonColor(type);
	}
	getShiptextColor(type: string): "black" | "white" {
		return type === "Electrik" ? "black" : "white";
	}

	onSubmit() {
		console.log(this.form.value);
	}
}
