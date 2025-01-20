import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsEnum } from "class-validator";

export class CreateCreditoDto {
  // @ApiProperty({
  //   required: false
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // readonly creditoId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly clienteId: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly fechaDesembolso: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly monto: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly plazoMeses: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly tasaInteres: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Activo', 'Inactivo'])
  readonly estado: string;
}