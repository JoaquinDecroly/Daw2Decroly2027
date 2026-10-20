export class ErrorEdadIgual extends Error {
	constructor() {
		super("La edad es igual, no se efectuaron cambios.");
		this.name = "ErrorEdadIgual";
	}
}
