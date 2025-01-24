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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClientesService = class ClientesService {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
    }
    async cargarClientes() {
        const clientesExistentes = await this.clienteModel.find().exec();
        if (clientesExistentes.length > 0) {
            throw new common_1.ConflictException('Clientes ya cargados');
        }
        const clientes = [
            new this.clienteModel({
                clienteId: `CLI001`,
                nombres: 'Juan',
                apellidos: 'Perez',
                tipoDocumento: 'CC',
                numeroDocumento: '12345678',
                email: 'juan.Perez@correo.com',
                telefono: '+573015243344',
            }),
            new this.clienteModel({
                clienteId: `CLI002`,
                nombres: 'Maria',
                apellidos: 'Gomez',
                tipoDocumento: 'CC',
                numeroDocumento: '87654321',
                email: 'maria.gomez@correo.com',
                telefono: '+573015243345',
            }),
            new this.clienteModel({
                clienteId: `CLI003`,
                nombres: 'Carlos',
                apellidos: 'Rodriguez',
                tipoDocumento: 'CC',
                numeroDocumento: '11223344',
                email: 'carlos.rodriguez@correo.com',
                telefono: '+573015243346',
            }),
            new this.clienteModel({
                clienteId: `CLI004`,
                nombres: 'Ana',
                apellidos: 'Martinez',
                tipoDocumento: 'CC',
                numeroDocumento: '44332211',
                email: 'ana.martinez@correo.com',
                telefono: '+573015243347',
            }),
        ];
        for (const cliente of clientes) {
            await cliente.save();
        }
        return clientes;
    }
    async findAll() {
        return this.clienteModel.find().exec();
    }
    async findOne(tipoDocumento, numeroDocumento) {
        const cliente = await this.clienteModel.findOne({ tipoDocumento, numeroDocumento }).exec();
        if (!cliente)
            throw new common_1.NotFoundException(`Cliente con documento '${tipoDocumento}' '${numeroDocumento}' no encontrado`);
        return cliente;
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cliente_entity_1.Cliente.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map