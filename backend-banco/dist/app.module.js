"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const creditos_module_1 = require("./creditos/creditos.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const creditos_middleware_1 = require("./middleware/creditos.middleware");
const clientes_module_1 = require("./clientes/clientes.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(creditos_middleware_1.CreditoMiddleware);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: process.env.PATH_STATIC || (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.URI_MONGO_BANKING_SERVICE || 'mongodb+srv://jcllamas:CXATqCOhTAAyuf08@cluster0.pbxj3.mongodb.net/banking?retryWrites=true&w=majority&appName=Cluster0'),
            creditos_module_1.CreditosModule,
            auth_module_1.AuthModule,
            clientes_module_1.ClientesModule
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map