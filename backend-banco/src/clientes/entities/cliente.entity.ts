import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema({
  timestamps: true,
  collection: 'clientes'
})
export class Cliente {
  @ApiProperty({
    example: ['CLI001', 'CLI002', 'CLI003', 'CLI004'],
    description: 'Identificador único del cliente'
  })
  @Prop({ required: false })
  clienteId: string;

  @ApiProperty({
    example: ['CC', 'CE', 'TI', 'PP'],
    description: 'Tipo de documento'
  })
  @Prop({ required: true })
  tipoDocumento: string;

  @ApiProperty({
    example: '1067936999',
    description: 'Número de documento'
  })
  @Prop({ required: true })
  numeroDocumento: string;

  @ApiProperty({
    example: 'Juan Camilo',
    description: 'Nombre del cliente'
  })
  @Prop({ required: true })
  nombres: string;

  @ApiProperty({
    example: 'Llamas Mendoza',
    description: 'Apellidos del cliente'
  })
  @Prop({ required: true })
  apellidos: string;

  @ApiProperty({
    example: 'juan.llamas@correo.com',
    description: 'Correo electrónico del cliente'
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    example: '+3015243348',
    description: 'Teléfono Celular del cliente'
  })
  @Prop({ required: true })
  telefono: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);