export type User = {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  roles: string;
  access_token: string;
};

export interface Credit {
  creditoId: string;
  clienteId: string;
  fechaDesembolso: string;
  monto: number;
  plazoMeses: number;
  tasaInteres: number;
  estado: string;
}

export type CreditForm = {
  creditoId: string;
  clienteId: string;
  monto: number;
  estado: 'Inactivo' | 'Activo';
};

export interface Client {
  clienteId: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
}

export interface NewCredit {
  creditoId?: string;
  clienteId: string;
  fechaDesembolso: string;
  monto: number;
  plazoMeses: number;
  tasaInteres: number;
  estado: string;
}

export interface Session {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  roles: string[];
  access_token: string;
}