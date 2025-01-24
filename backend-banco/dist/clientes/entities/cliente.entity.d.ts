import { Document } from 'mongoose';
export type ClienteDocument = Cliente & Document;
export declare class Cliente {
    clienteId: string;
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
}
export declare const ClienteSchema: import("mongoose").Schema<Cliente, import("mongoose").Model<Cliente, any, any, any, Document<unknown, any, Cliente> & Cliente & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cliente, Document<unknown, {}, import("mongoose").FlatRecord<Cliente>> & import("mongoose").FlatRecord<Cliente> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
