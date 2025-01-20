import { Test, TestingModule } from '@nestjs/testing';
import { CreditosService } from './creditos.service';
import { AuthModule } from '../auth/auth.module';
import { Model } from 'mongoose';
import { Credito, CreditoDocument } from './entities/credito.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreditosController } from './creditos.controller';
import { CreateCreditoDto } from './dto/create-credito.dto';

const mockCreditoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOneByCreditoId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CreditosService', () => {
  let creditoService: CreditosService;
  let creditoController: CreditosController;
  let CreditoModel: Model<CreditoDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        CreditosService,
        {
          provide: getModelToken(Credito.name),
          useValue: mockCreditoService,
        },
      ],
      controllers: [CreditosController]
    }).compile();

    creditoService = module.get<CreditosService>(CreditosService);
    creditoController = module.get<CreditosController>(CreditosController);
    CreditoModel = module.get<Model<CreditoDocument>>(getModelToken(Credito.name));

  });

  it('Servicios de Creditos', () => {
    expect(creditoService).toBeDefined();
  });

  it('Controlador de Creditos', () => {
    expect(creditoController).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un nuevo crédito', async () => {
      const createCreditoDto: CreateCreditoDto = {
        clienteId: '123',
        fechaDesembolso: '2023-01-01',
        monto: 100000,
        plazoMeses: 12,
        tasaInteres: 5.5,
        estado: 'Activo',
      };
      jest.spyOn(creditoService, 'create').mockResolvedValue(createCreditoDto as any);
      expect(await creditoController.create(createCreditoDto)).toEqual(createCreditoDto);
    });
  })

  describe('findAll', () => {
    it('Debería retornar todos los créditos', async () => {
      const result = [
        {
          creditoId: 'CRE123',
          clienteId: '1',
          fechaDesembolso: '2023-01-01',
          monto: 100000,
          plazoMeses: 12,
          tasaInteres: 5.5,
          estado: 'Activo',
        },
      ];
      jest.spyOn(creditoService, 'findAll').mockResolvedValue(result);
      expect(await creditoController.findAll()).toBe(result);
    });
  });

  describe('findOneByCreditoId', () => {
    it('Debería retornar un crédito por ID', async () => {
      const creditoId = 'CRE123';
      const result = {
        creditoId: 'CRE123',
        clienteId: 'CLI123',
        fechaDesembolso: '2023-01-01',
        monto: 100000,
        plazoMeses: 12,
        tasaInteres: 5.5,
        estado: 'Activo',
      };
      jest.spyOn(creditoService, 'findOneByCreditoId').mockResolvedValue(result);
      expect(await creditoController.findOneByCreditoId(creditoId)).toBe(result);
    });
  });

  describe('findyByClientData', () => {
    it('Debería retornar datos del cliente y datos de sus créditos.', async () => {
      const tipoDocumento = 'CC';
      const numeroDocumento = 'CLI01';
      const result = {
        cliente: {
          clienteId: "CLI001",
          tipoDocumento: "CC",
          numeroDocumento: "12345678",
          nombres: "Juan",
          apellidos: "Perez",
          email: "juan.Perez@correo.com",
          telefono: "+573015243344",
        },
        creditos: [
          {
            creditoId: "CRE1737300452126",
            clienteId: "CLI001",
            fechaDesembolso: "Sun Jan 19 2025 10:27:32 GMT-0500 (hora estándar de Colombia)",
            monto: 12000000,
            lazoMeses: 36,
            tasaInteres: 1.5,
            estado: "Activo",
          }
        ]
      }

      jest.spyOn(creditoService, 'findOneByCreditoId').mockResolvedValue(result as any);
      expect(await creditoController.findyByClientData(tipoDocumento, numeroDocumento)).toBe(result);
    });
  });

  describe('update', () => {
    it('Debería actualizar un crédito', async () => {
      const creditoId = 'CRE123';
      const updateCreditoDto = {
        monto: 150000,
        plazoMeses: 24,
        tasaInteres: 6.0,
        estado: 'Activo',
      };
      const result = {
        creditoId: 'CRE123',
        clienteId: 'CLI123',
        fechaDesembolso: '2023-01-01',
        monto: 150000,
        plazoMeses: 24,
        tasaInteres: 6.0,
        estado: 'Activo',
      };
      jest.spyOn(creditoService, 'update').mockResolvedValue(result);
      expect(await creditoController.update(creditoId, updateCreditoDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('Debería eliminar un crédito', async () => {
      const creditoId = 'CRE123';
      const result = {
        creditoId: 'CRE123',
        clienteId: 'CLI123',
        fechaDesembolso: '2023-01-01',
        monto: 100000,
        plazoMeses: 12,
        tasaInteres: 5.5,
        estado: 'Activo',
      };
      jest.spyOn(creditoService, 'delete').mockResolvedValue(result);
      expect(await creditoController.delete(creditoId)).toBe(result);
    });
  });
});