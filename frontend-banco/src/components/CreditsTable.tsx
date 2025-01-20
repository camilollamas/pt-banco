import React from 'react';
import { Table } from './ui/table';
import { Credit } from 'app/data/interfaces';



interface CreditsTableProps {
  credits: Credit[];
  onEdit: (creditId: Credit) => void;
  onDelete: (creditId: string) => void;
}

const CreditsTable: React.FC<CreditsTableProps> = ({ credits, onEdit, onDelete }) => {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const moneyFormat = (amount: number): string => {
    return amount.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Id. Crédito</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Id. Cliente</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Desembolso</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Meses</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Interes</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {credits.map((credit, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{credit.creditoId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{credit.clienteId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{formatDate(credit.fechaDesembolso)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{moneyFormat(credit.monto)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{credit.plazoMeses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{credit.tasaInteres}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{credit.estado}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={() => onEdit(credit)} className="text-indigo-600 hover:text-indigo-900 mr-2">Editar</button>
                      <button onClick={() => onDelete(credit.creditoId)} className="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Table
       />
    </div>
  );
};

export default CreditsTable;

