export type CreditoDocument = Credito & Document;
export declare class Credito {
    creditoId: string;
    clienteId: string;
    fechaDesembolso: string;
    monto: number;
    plazoMeses: number;
    tasaInteres: number;
    estado: string;
}
export declare const CreditoSchema: import("mongoose").Schema<Credito, import("mongoose").Model<Credito, any, any, any, import("mongoose").Document<unknown, any, Credito> & Credito & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Credito, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Credito>> & import("mongoose").FlatRecord<Credito> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
