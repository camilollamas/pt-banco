import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ClientesController } from './clientes.controller';
import { Cliente, ClienteSchema } from './entities/cliente.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cliente.name,
        schema: ClienteSchema
      }
    ]),
    AuthModule
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [MongooseModule]
})
export class ClientesModule {}