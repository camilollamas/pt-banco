import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCreditoDto } from "./create-credito.dto";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCreditoDto extends PartialType(CreateCreditoDto) {

  @ApiProperty({
    example: 100000,
    description: 'The amount of credit',
    required: false
  })
  @IsOptional()
  @IsNumber()
  monto?: number;

  @ApiProperty({
    example: ['Activo', 'Inactivo'],
    description: 'Credit Status',
    required: false,
    enum: ['Activo', 'Inactivo']
  })
  @IsOptional()
  @IsString()
  @IsEnum(['Activo', 'Inactivo'])
  estado?: string;

  @ApiProperty({
    example: [6, 12, 24, 36, 48, 60, 72],
    description: 'The term in months',
    required: false
  })
  @IsOptional()
  @IsNumber()
  plazoMeses?: number;

  @ApiProperty({
    example: 0.1,
    description: 'The interest rate',
    required: false
  })
  @IsOptional()
  @IsNumber()
  tasaInteres?: number;
}