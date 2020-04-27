
export class Categoria {
    constructor(
        public id: number,
        public Id_Entidad: number,
        public Id_Tipo: number,
        public Nombre: string
    ) { }
}

export interface ICate {
	name: string;
	type: string;
}
export interface ITipo {
	id: number;
	name: string;
}