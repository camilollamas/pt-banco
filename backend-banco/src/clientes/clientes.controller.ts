import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiSchema, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';


@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService
  ) { }

  @Post('cargar')
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  @ApiResponse({ status: 409, description: 'Conflict: Clients not loaded.' })
  cargarClientes(){
    return this.clientesService.cargarClientes();
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK.', type: [Cliente] })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':tipoDocumento/:numeroDocumento')
  @ApiResponse({ status: 200, description: 'OK.', type: Cliente })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, No Token.' })
  findOneByTipoNumeroDocumento(
    @Param('tipoDocumento') tipoDocumento: string,
    @Param('numeroDocumento') numeroDocumento: string) {
    return this.clientesService.findOne(tipoDocumento, numeroDocumento);
  }

}
