import { Module } from '@nestjs/common';
import { CreditosController } from './creditos.controller';
import { CreditosService } from './creditos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Credito, CreditoSchema } from './entities/credito.entity';
import { AuthModule } from '../auth/auth.module';
import { ClientesService } from 'src/clientes/clientes.service';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Credito.name,
        schema: CreditoSchema
      }
    ]),
    AuthModule,
    ClientesModule
  ],
  controllers: [CreditosController],
  providers: [CreditosService],
  exports: [CreditosService]
})
export class CreditosModule {}
