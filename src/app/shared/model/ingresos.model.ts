
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

export const ingresosType = {
    CATE: 'CATE',
    SUB_CATE:'SUB_CATE'
}