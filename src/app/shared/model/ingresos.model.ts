
export class Categoria {
    constructor(
        public id: number,
        public Id_Entidad: number,
        public Id_Tipo: number,
        public Nombre: string,
        public Tipo: string
    ) { }
}
export class SubCategoria {
    constructor(
        public id: number,
        public Id_Entidad: number,
        public Id_Categoria: number,
        public Nombre: string,
        public Categoria: string
    ) { }
}

export class CreateIngreso {
    constructor(
        public Id_Entidad: number,
        public Id_Tipo: number,
        public Id_Categoria: number,
        public Id_SubCategoria: number,
        public Id_Forma_Pago: number,
        public Fecha: Date,
        public Observación: string,
        public Precio: number
    ) { }
}
export class CreateIngreso_Firebase {
    constructor(
        public Id_Entidad: number,
        public Tipo: string,
        public Id_Tipo: number,
        public Categoria: string,
        public Id_Categoria: number,
        public SubCategoria: string,
        public Id_SubCategoria: number,
        public Id_Forma_Pago: number,
        public Fecha: string,
        public Observacion: string,
        public Precio: number
    ) { }
}

export const ingresosType = {
    CATE: 'CATE',
    SUB_CATE:'SUB_CATE'
}