import { CreateCreditoDto } from "./create-credito.dto";
declare const UpdateCreditoDto_base: import("@nestjs/common").Type<Partial<CreateCreditoDto>>;
export declare class UpdateCreditoDto extends UpdateCreditoDto_base {
    monto?: number;
    estado?: string;
    plazoMeses?: number;
    tasaInteres?: number;
}
export {};
