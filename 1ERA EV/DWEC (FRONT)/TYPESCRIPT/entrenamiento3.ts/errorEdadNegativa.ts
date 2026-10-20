export class ErrorEdadNegativa extends Error {
	constructor() {
		super("La edad no puede ser negativa.");
		this.name = "ErrorEdadNegativa";
	}
}
