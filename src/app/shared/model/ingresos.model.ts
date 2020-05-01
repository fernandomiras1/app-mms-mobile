
export class Categoria {
    constructor(
        public id: number,
        public Id_Entidad: number,
        public Id_Tipo: number,
        public Nombre: string,
        public Tipo: string
    ) { }
}

export interface ICate {
	name: string;
	type: string;
}