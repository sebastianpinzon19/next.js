import { Clientes } from "./Clientes.type";
import { Proveedor } from "./Proveedor.type";

export interface Productos {
    _id: string;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    proveedor: Proveedor[];
    cliente: Clientes[];
    activo?: boolean;
}