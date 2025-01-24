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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const clientes_service_1 = require("./clientes.service");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClientesController = class ClientesController {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    cargarClientes() {
        return this.clientesService.cargarClientes();
    }
    findAll() {
        return this.clientesService.findAll();
    }
    findOneByTipoNumeroDocumento(tipoDocumento, numeroDocumento) {
        return this.clientesService.findOne(tipoDocumento, numeroDocumento);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Post)('cargar'),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict: Clients not loaded.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "cargarClientes", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK.', type: [cliente_entity_1.Cliente] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':tipoDocumento/:numeroDocumento'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK.', type: cliente_entity_1.Cliente }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    __param(0, (0, common_1.Param)('tipoDocumento')),
    __param(1, (0, common_1.Param)('numeroDocumento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "findOneByTipoNumeroDocumento", null);
exports.ClientesController = ClientesController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map