import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    cargarClientes(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/cliente.entity").ClienteDocument> & Cliente & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/cliente.entity").ClienteDocument> & Cliente & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOneByTipoNumeroDocumento(tipoDocumento: string, numeroDocumento: string): Promise<import("./entities/cliente.entity").ClienteDocument>;
}
