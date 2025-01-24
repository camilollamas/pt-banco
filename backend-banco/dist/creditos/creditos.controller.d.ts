import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { Credito } from './entities/credito.entity';
export declare class CreditosController {
    private readonly creditosService;
    constructor(creditosService: CreditosService);
    create(CreateCreditoDto: CreateCreditoDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/credito.entity").CreditoDocument> & Credito & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    cargarCreditos(): Promise<void>;
    findAll(): Promise<Credito[]>;
    findOneByCreditoId(creditoId: string): Promise<Credito>;
    findyByClientData(tipoDocumento: string, numeroDocumento: string): Promise<Credito[]>;
    update(creditoId: string, updateCreditoDto: UpdateCreditoDto): Promise<Credito>;
    delete(id: string): Promise<Credito>;
}
