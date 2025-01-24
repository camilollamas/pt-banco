"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Bank RestFul API')
        .setDescription('Bank enpoints')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Endpoints de autenticación')
        .addTag('Créditos', 'Endpoints de créditos')
        .addTag('Clientes', 'Endpoints de clientes')
        .build();
    const documentFactory = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
main();
//# sourceMappingURL=main.js.map