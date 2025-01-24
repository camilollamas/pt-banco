import { CreditosModule } from './creditos/creditos.module';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CreditoMiddleware } from './middleware/creditos.middleware';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesModule } from './clientes/clientes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.env.PATH_STATIC || join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI_MONGO_BANKING_SERVICE || 'mongodb+srv://jcllamas:CXATqCOhTAAyuf08@cluster0.pbxj3.mongodb.net/banking?retryWrites=true&w=majority&appName=Cluster0'),
    // MongooseModule.forRoot(process.env.URI_MONGO_BANKING_SERVICE || 'mongodb://localhost:27017/banking'),
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
