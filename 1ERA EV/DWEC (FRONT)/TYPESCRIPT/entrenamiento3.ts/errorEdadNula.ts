export class ErrorEdadNula extends Error {
	constructor() {
		super("La edad no puede ser nula.");
		this.name = "ErrorEdadNula";
	}
}
