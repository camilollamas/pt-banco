import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Bank RestFul API')
    .setDescription('Bank enpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Endpoints de autenticación')
    .addTag('Créditos', 'Endpoints de créditos')
    .addTag('Clientes', 'Endpoints de clientes')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
main();
