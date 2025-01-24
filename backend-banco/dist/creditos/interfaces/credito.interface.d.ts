export interface CreditoBancario {
    creditoId?: string;
    clienteId: string;
    fechaDesembolso: Date;
    monto: number;
    plazoMeses: number;
    tasaInteres: number;
    estado: string;
}
