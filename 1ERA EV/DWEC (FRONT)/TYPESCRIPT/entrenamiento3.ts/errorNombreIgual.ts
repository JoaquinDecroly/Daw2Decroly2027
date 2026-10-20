export class ErrorNombreIgual extends Error {
	constructor() {
		super("Ya se llama así");
		this.name = "ErrorNombreIgual";
	}
}
