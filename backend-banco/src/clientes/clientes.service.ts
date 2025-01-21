import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>,
  ) { }

  async cargarClientes() {
    //validar que ya existan clientes con los siguientes clienteId: CLI001, CLI002, CLI003, CLI004
    const clientesExistentes = await this.clienteModel.find().exec();
    if (clientesExistentes.length > 0) {
      throw new ConflictException('Clientes ya cargados');
    }
    const clientes = [
      new this.clienteModel({
        clienteId: `CLI001`,
        nombres: 'Juan',
        apellidos: 'Perez',
        tipoDocumento: 'CC',
        numeroDocumento: '12345678',
        email: 'juan.Perez@correo.com',
        telefono: '+573015243344',
      }),
      new this.clienteModel({
        clienteId: `CLI002`,
        nombres: 'Maria',
        apellidos: 'Gomez',
        tipoDocumento: 'CC',
        numeroDocumento: '87654321',
        email: 'maria.gomez@correo.com',
        telefono: '+573015243345',
      }),
      new this.clienteModel({
        clienteId: `CLI003`,
        nombres: 'Carlos',
        apellidos: 'Rodriguez',
        tipoDocumento: 'CC',
        numeroDocumento: '11223344',
        email: 'carlos.rodriguez@correo.com',
        telefono: '+573015243346',
      }),
      new this.clienteModel({
        clienteId: `CLI004`,
        nombres: 'Ana',
        apellidos: 'Martinez',
        tipoDocumento: 'CC',
        numeroDocumento: '44332211',
        email: 'ana.martinez@correo.com',
        telefono: '+573015243347',
      }),
    ];

    for (const cliente of clientes) {
      await cliente.save();
    }
  }

  async findAll() {
    return this.clienteModel.find().exec();
  }

  async findOne(tipoDocumento: string, numeroDocumento: string) {
    const cliente: ClienteDocument = await this.clienteModel.findOne({ tipoDocumento, numeroDocumento }).exec();
    if (!cliente) throw new NotFoundException(`Cliente con documento '${tipoDocumento}' '${numeroDocumento}' no encontrado`);
    return cliente;
  }
}
