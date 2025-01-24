"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const credito_entity_1 = require("./entities/credito.entity");
const mongoose_2 = require("mongoose");
const cliente_entity_1 = require("../clientes/entities/cliente.entity");
let CreditosService = class CreditosService {
    constructor(creditoModel, clienteModel) {
        this.creditoModel = creditoModel;
        this.clienteModel = clienteModel;
    }
    async cargarCreditos() {
        const clientesExistentes = await this.clienteModel.find().exec();
        if (clientesExistentes.length == 0) {
            throw new common_1.ConflictException('Clientes no estan cargados');
        }
        const creditos = [
            new this.creditoModel({
                creditoId: `CRE${Date.now()}`,
                clienteId: 'CLI001',
                fechaDesembolso: new Date(),
                monto: 12000000,
                plazoMeses: 36,
                tasaInteres: 1.5,
                estado: 'Activo'
            }),
            new this.creditoModel({
                creditoId: `CRE${Date.now()}`,
                clienteId: 'CLI002',
                fechaDesembolso: new Date(),
                monto: 45000000,
                plazoMeses: 72,
                tasaInteres: 1.1,
                estado: 'Activo'
            }),
            new this.creditoModel({
                creditoId: `CRE${Date.now()}`,
                clienteId: 'CLI003',
                fechaDesembolso: new Date(),
                monto: 11500000,
                plazoMeses: 48,
                tasaInteres: 1,
                estado: 'Activo'
            }),
            new this.creditoModel({
                creditoId: `CRE${Date.now()}`,
                clienteId: 'CLI004',
                fechaDesembolso: new Date(),
                monto: 1000000,
                plazoMeses: 12,
                tasaInteres: 1.5,
                estado: 'Activo'
            }),
        ];
        for (const credito of creditos) {
            await credito.save();
        }
    }
    async create(createProductDto) {
        console.log('createProductDto', createProductDto);
        const creditoId = `CRE${Date.now()}`;
        const created = new this.creditoModel({
            ...createProductDto,
            creditoId,
            monto: createProductDto.monto,
        });
        return created.save();
    }
    async findAll() {
        return this.creditoModel.find().exec();
    }
    async findOneByCreditoId(creditoId) {
        const credito = await this.creditoModel.findOne({ creditoId: creditoId }).exec();
        if (!credito)
            return;
        return credito;
    }
    async findyByClientData(tipoDocumento, numeroDocumento) {
        const cliente = await this.clienteModel.findOne({ tipoDocumento, numeroDocumento }).exec();
        if (!cliente)
            return [];
        const creditos = await this.creditoModel.find({ clienteId: cliente.clienteId }).exec();
        return creditos;
    }
    async update(creditoId, updateCreditoDto) {
        const credito = await this.creditoModel
            .findOneAndUpdate({ creditoId }, updateCreditoDto, { new: true })
            .exec();
        if (!credito)
            throw new common_1.NotFoundException(`Credito con id '${creditoId}' no encontrado`);
        return credito;
    }
    async delete(creditoId) {
        const credito = await this.creditoModel.findOneAndDelete({ creditoId }).exec();
        if (!credito)
            throw new common_1.NotFoundException(`Credito con id '${creditoId}' no encontrado`);
        return credito;
    }
};
exports.CreditosService = CreditosService;
exports.CreditosService = CreditosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(credito_entity_1.Credito.name)),
    __param(1, (0, mongoose_1.InjectModel)(cliente_entity_1.Cliente.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CreditosService);
//# sourceMappingURL=creditos.service.js.map