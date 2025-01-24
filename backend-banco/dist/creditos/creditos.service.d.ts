import { CreateCreditoDto } from './dto/create-credito.dto';
import { Credito, CreditoDocument } from './entities/credito.entity';
import { Model } from 'mongoose';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { ClienteDocument } from '../clientes/entities/cliente.entity';
export declare class CreditosService {
    private creditoModel;
    private clienteModel;
    constructor(creditoModel: Model<CreditoDocument>, clienteModel: Model<ClienteDocument>);
    cargarCreditos(): Promise<void>;
    create(createProductDto: CreateCreditoDto): Promise<import("mongoose").Document<unknown, {}, CreditoDocument> & Credito & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<Credito[]>;
    findOneByCreditoId(creditoId: string): Promise<Credito | undefined>;
    findyByClientData(tipoDocumento: string, numeroDocumento: string): Promise<Credito[]>;
    update(creditoId: string, updateCreditoDto: UpdateCreditoDto): Promise<Credito>;
    delete(creditoId: string): Promise<Credito>;
}
