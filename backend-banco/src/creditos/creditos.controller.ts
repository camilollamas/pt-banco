import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { Credito } from './entities/credito.entity';


@ApiTags('Créditos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('creditos')
export class CreditosController {

  constructor(
    private readonly creditosService: CreditosService
  ) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Credito })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  create(@Body() CreateCreditoDto: CreateCreditoDto) {
    console.log('CreateCreditoDto Controller:', CreateCreditoDto);
    return this.creditosService.create(CreateCreditoDto);
  }

  @Post('cargar')
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  @ApiResponse({ status: 409, description: 'Conflict: Clients Not Loaded.' })
  cargarCreditos() {
    return this.creditosService.cargarCreditos();
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK.', type: [Credito] })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  findAll() {
    return this.creditosService.findAll();
  }

  @Get(':creditoId')
  @ApiResponse({ status: 200, description: 'OK.', type: Credito })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  findOneByCreditoId(@Param('creditoId') creditoId: string) {
    return this.creditosService.findOneByCreditoId(creditoId);
  }

  @Get(':tipoDocumento/:numeroDocumento')
  @ApiResponse({ status: 200, description: 'Request Successfully', type: Credito })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found ' })
  findyByClientData(
    @Param('tipoDocumento') tipoDocumento: string,
    @Param('numeroDocumento') numeroDocumento: string) {
    return this.creditosService.findyByClientData(tipoDocumento, numeroDocumento);
  }

  @Patch(':creditoId')
  @ApiResponse({ status: 200, description: 'Updated Successfully', type: Credito })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found ' })
  update(
    @Param('creditoId') creditoId: string,
    @Body() updateCreditoDto: UpdateCreditoDto,
  ) {
    return this.creditosService.update(creditoId, updateCreditoDto);
  }

  @Delete(':creditoId')
  @ApiResponse({ status: 200, description: 'Successfully Removed.', type: Credito })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  delete(
    @Param('creditoId') id: string) {
    return this.creditosService.delete(id);
  }
}
