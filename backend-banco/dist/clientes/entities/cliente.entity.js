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
exports.ClienteSchema = exports.Cliente = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['CLI001', 'CLI002', 'CLI003', 'CLI004'],
        description: 'Identificador único del cliente'
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Cliente.prototype, "clienteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['CC', 'CE', 'TI', 'PP'],
        description: 'Tipo de documento'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "tipoDocumento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1067936999',
        description: 'Número de documento'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "numeroDocumento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Juan Camilo',
        description: 'Nombre del cliente'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Llamas Mendoza',
        description: 'Apellidos del cliente'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "apellidos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'juan.llamas@correo.com',
        description: 'Correo electrónico del cliente'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+3015243348',
        description: 'Teléfono Celular del cliente'
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
exports.Cliente = Cliente = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'clientes'
    })
], Cliente);
exports.ClienteSchema = mongoose_1.SchemaFactory.createForClass(Cliente);
//# sourceMappingURL=cliente.entity.js.map