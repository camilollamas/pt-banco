"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const common_1 = require("@nestjs/common");
const clientes_service_1 = require("./clientes.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const clientes_controller_1 = require("./clientes.controller");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClientesModule = class ClientesModule {
};
exports.ClientesModule = ClientesModule;
exports.ClientesModule = ClientesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: cliente_entity_1.Cliente.name,
                    schema: cliente_entity_1.ClienteSchema
                }
            ]),
            auth_module_1.AuthModule
        ],
        controllers: [clientes_controller_1.ClientesController],
        providers: [clientes_service_1.ClientesService],
        exports: [mongoose_1.MongooseModule]
    })
], ClientesModule);
//# sourceMappingURL=clientes.module.js.map