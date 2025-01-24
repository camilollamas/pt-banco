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
exports.UpdateCreditoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_credito_dto_1 = require("./create-credito.dto");
const class_validator_1 = require("class-validator");
class UpdateCreditoDto extends (0, swagger_1.PartialType)(create_credito_dto_1.CreateCreditoDto) {
}
exports.UpdateCreditoDto = UpdateCreditoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100000,
        description: 'The amount of credit',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCreditoDto.prototype, "monto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Activo', 'Inactivo'],
        description: 'Credit Status',
        required: false,
        enum: ['Activo', 'Inactivo']
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['Activo', 'Inactivo']),
    __metadata("design:type", String)
], UpdateCreditoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [6, 12, 24, 36, 48, 60, 72],
        description: 'The term in months',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCreditoDto.prototype, "plazoMeses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.1,
        description: 'The interest rate',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCreditoDto.prototype, "tasaInteres", void 0);
//# sourceMappingURL=update-credito.dto.js.map