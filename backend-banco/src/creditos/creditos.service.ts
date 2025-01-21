import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreditoBancario } from './interfaces/credito.interface';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Credito, CreditoDocument } from './entities/credito.entity';
import { Model } from 'mongoose';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { Cliente, ClienteDocument } from '../clientes/entities/cliente.entity';

@Injectable()
export class CreditosService {
  constructor(
    @InjectModel(Credito.name) private creditoModel: Model<CreditoDocument>,
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>,
  ) { }

  async cargarCreditos() {
    const clientesExistentes = await this.clienteModel.find().exec();
    if (clientesExistentes.length == 0) {
      throw new ConflictException('Clientes no estan cargados');
    }

    const creditos = [
      new this.creditoModel({
        creditoId: `CRE${Date.now()}`,
        clienteId: 'CLI001',
        fechaDesembolso: new Date(),
        monto: 12000000,
        plazoMeses: 36,
        tasaInteres: 1.5,
        estado: 'Activo'
      }),
      new this.creditoModel({
        creditoId: `CRE${Date.now()}`,
        clienteId: 'CLI002',
        fechaDesembolso: new Date(),
        monto: 45000000,
        plazoMeses: 72,
        tasaInteres: 1.1,
        estado: 'Activo'
      }),
      new this.creditoModel({
        creditoId: `CRE${Date.now()}`,
        clienteId: 'CLI003',
        fechaDesembolso: new Date(),
        monto: 11500000,
        plazoMeses: 48,
        tasaInteres: 1,
        estado: 'Activo'
      }),
      new this.creditoModel({
        creditoId: `CRE${Date.now()}`,
        clienteId: 'CLI004',
        fechaDesembolso: new Date(),
        monto: 1000000,
        plazoMeses: 12,
        tasaInteres: 1.5,
        estado: 'Activo'
      }),
    ];

    for (const credito of creditos) {
      await credito.save();
    }
  }

  async create(createProductDto: CreateCreditoDto) {
    console.log('createProductDto', createProductDto);
    const creditoId = `CRE${Date.now()}`;
    const created = new this.creditoModel({
      ...createProductDto,
      creditoId,
      monto: createProductDto.monto,
    });
    return created.save();
  }

  async findAll(): Promise<Credito[]> {
    return this.creditoModel.find().exec();
  }

  async findOneByCreditoId(creditoId: string): Promise<Credito | undefined> {
    const credito = await this.creditoModel.findOne({ creditoId: creditoId }).exec();
    if (!credito) return;
    return credito;
  }

  // async findyByClientData(tipoDocumento: string, numeroDocumento: string): Promise<{ cliente: Cliente, creditos: Credito[] }>  {
  //   const cliente = await this.clienteModel.findOne({ tipoDocumento, numeroDocumento }).exec();
  //   if (!cliente) throw new NotFoundException(`Cliente con tipoDocumento '${tipoDocumento}' y numeroDocumento '${numeroDocumento}' no encontrado`);
  //   const creditos = await this.creditoModel.find({ clienteId: cliente.clienteId }).exec();
  //   return { cliente, creditos };
  // }

  async findyByClientData(tipoDocumento: string, numeroDocumento: string): Promise<Credito[]> {
    const cliente = await this.clienteModel.findOne({ tipoDocumento, numeroDocumento }).exec();
    if (!cliente) return []
    
    const creditos = await this.creditoModel.find({ clienteId: cliente.clienteId }).exec();
    
    return creditos;
  }

  async update(creditoId: string, updateCreditoDto: UpdateCreditoDto): Promise<Credito> {
    const credito = await this.creditoModel
      .findOneAndUpdate({ creditoId }, updateCreditoDto, { new: true })
      .exec();
    if (!credito) throw new NotFoundException(`Credito con id '${creditoId}' no encontrado`);
    return credito;
  }

  async delete(creditoId: string): Promise<Credito> {
    // No deberia removerse logicamente, quizas se deberia cambiar el estado a eliminado.
    const credito = await this.creditoModel.findOneAndDelete({ creditoId }).exec();
    if (!credito) throw new NotFoundException(`Credito con id '${creditoId}' no encontrado`);
    return credito;
  }

}
