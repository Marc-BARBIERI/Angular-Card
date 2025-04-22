import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (!authService.isLoggedIn()) {
		router.navigate(["/login"]);
		return false;
	}
	return true;
};
