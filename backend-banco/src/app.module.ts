import { CreditosModule } from './creditos/creditos.module';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CreditoMiddleware } from './middleware/creditos.middleware';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesModule } from './clientes/clientes.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI_MONGO_BANKING_SERVICE || 'mongodb://localhost:27017/banking'),
    CreditosModule, 
    AuthModule, 
    ClientesModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreditoMiddleware)
      // .forRoutes('creditos');
  }
}
