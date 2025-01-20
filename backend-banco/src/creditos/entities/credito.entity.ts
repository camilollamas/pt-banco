import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";


export type CreditoDocument = Credito & Document;

@Schema({
  timestamps: true,
  collection: 'creditos'
})

export class Credito {
  @ApiProperty({
    example: 'CRE1737231428884',
    description: 'Identificador único del crédito',
    required: false
  })
  @Prop({ required: false })
  creditoId: string;

  @ApiProperty({
    example: ['CLI001', 'CLI002', 'CLI003', 'CLI004'],
    description: 'Identificador único del cliente'
  })
  @Prop({ required: true })
  clienteId: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de desembolso del crédito'
  })
  @Prop({ required: true })
  fechaDesembolso: string;

  @ApiProperty({
    example: 100000,
    description: 'Monto del crédito'
  })
  @Prop({ required: true })
  monto: number;

  @ApiProperty({
    example: [6,12,24,36,48,60,72],
    description: 'Plazo en meses'
  })
  @Prop({ required: true })
  plazoMeses: number;

  @ApiProperty({
    example: 0.1,
    description: 'Interes del crédito'
  })
  @Prop({ required: true })
  tasaInteres: number;

  @ApiProperty({
    example: ['Activo', 'Inactivo'],
    description: 'Estado del crédito'
  })
  @Prop({ required: true })
  @IsEnum(['Activo', 'Inactivo'])
  estado: string;
}

export const CreditoSchema = SchemaFactory.createForClass(Credito);