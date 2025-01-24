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
exports.CreditosController = void 0;
const common_1 = require("@nestjs/common");
const creditos_service_1 = require("./creditos.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const create_credito_dto_1 = require("./dto/create-credito.dto");
const update_credito_dto_1 = require("./dto/update-credito.dto");
const credito_entity_1 = require("./entities/credito.entity");
let CreditosController = class CreditosController {
    constructor(creditosService) {
        this.creditosService = creditosService;
    }
    create(CreateCreditoDto) {
        console.log('CreateCreditoDto Controller:', CreateCreditoDto);
        return this.creditosService.create(CreateCreditoDto);
    }
    cargarCreditos() {
        return this.creditosService.cargarCreditos();
    }
    findAll() {
        return this.creditosService.findAll();
    }
    findOneByCreditoId(creditoId) {
        return this.creditosService.findOneByCreditoId(creditoId);
    }
    findyByClientData(tipoDocumento, numeroDocumento) {
        return this.creditosService.findyByClientData(tipoDocumento, numeroDocumento);
    }
    update(creditoId, updateCreditoDto) {
        return this.creditosService.update(creditoId, updateCreditoDto);
    }
    delete(id) {
        return this.creditosService.delete(id);
    }
};
exports.CreditosController = CreditosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The record has been successfully created.', type: credito_entity_1.Credito }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credito_dto_1.CreateCreditoDto]),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('cargar'),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict: Clients Not Loaded.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "cargarCreditos", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK.', type: [credito_entity_1.Credito] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden. Token related.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':creditoId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK.', type: credito_entity_1.Credito }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized, No Token.' }),
    __param(0, (0, common_1.Param)('creditoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "findOneByCreditoId", null);
__decorate([
    (0, common_1.Get)('client/:tipoDocumento/:numeroDocumento'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Request Successfully', type: credito_entity_1.Credito }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found ' }),
    __param(0, (0, common_1.Param)('tipoDocumento')),
    __param(1, (0, common_1.Param)('numeroDocumento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "findyByClientData", null);
__decorate([
    (0, common_1.Patch)(':creditoId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated Successfully', type: credito_entity_1.Credito }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found ' }),
    __param(0, (0, common_1.Param)('creditoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_credito_dto_1.UpdateCreditoDto]),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':creditoId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully Removed.', type: credito_entity_1.Credito }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    __param(0, (0, common_1.Param)('creditoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreditosController.prototype, "delete", null);
exports.CreditosController = CreditosController = __decorate([
    (0, swagger_1.ApiTags)('Créditos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('creditos'),
    __metadata("design:paramtypes", [creditos_service_1.CreditosService])
], CreditosController);
//# sourceMappingURL=creditos.controller.js.map