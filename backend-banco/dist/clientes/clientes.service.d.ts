import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from './entities/cliente.entity';
export declare class ClientesService {
    private clienteModel;
    constructor(clienteModel: Model<ClienteDocument>);
    cargarClientes(): Promise<(import("mongoose").Document<unknown, {}, ClienteDocument> & Cliente & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ClienteDocument> & Cliente & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(tipoDocumento: string, numeroDocumento: string): Promise<ClienteDocument>;
}
