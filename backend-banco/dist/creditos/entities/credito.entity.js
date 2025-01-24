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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditoSchema = exports.Credito = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Credito = class Credito {
};
exports.Credito = Credito;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CRE1737231428884',
        description: 'Identificador único del crédito',
        required: false
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Credito.prototype, "creditoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['CLI001', 'CLI002', 'CLI003', 'CLI004'],
        description: 'Identificador único del cliente'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Credito.prototype, "clienteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-01-01T00:00:00Z',
        description: 'Fecha de desembolso del crédito'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Credito.prototype, "fechaDesembolso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100000,
        description: 'Monto del crédito'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Credito.prototype, "monto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [6, 12, 24, 36, 48, 60, 72],
        description: 'Plazo en meses'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Credito.prototype, "plazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.1,
        description: 'Interes del crédito'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Credito.prototype, "tasaInteres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Activo', 'Inactivo'],
        description: 'Estado del crédito'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsEnum)(['Activo', 'Inactivo']),
    __metadata("design:type", String)
], Credito.prototype, "estado", void 0);
exports.Credito = Credito = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'creditos'
    })
], Credito);
exports.CreditoSchema = mongoose_1.SchemaFactory.createForClass(Credito);
//# sourceMappingURL=credito.entity.js.map