import CreditStatus from '@/components/credits/status';
import { DeleteCredit, UpdateCredit } from '@/components/credits/buttons';

import { fetchFilteredCustomers } from '@/lib/data';
import { formatCurrency, formatDateToLocal } from '@/lib/util';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: { type: string, number: string };
  currentPage: number;
}) {

  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Id. Cliente</th>
                <th scope="col" className="px-3 py-5 font-medium">Nombre</th>
                <th scope="col" className="px-3 py-5 font-medium">Apellidos</th>
                <th scope="col" className="px-3 py-5 font-medium">Documento</th>
                <th scope="col" className="px-3 py-5 font-medium">Email</th>
                <th scope="col" className="px-3 py-5 font-medium">Teléfono</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer, index) => (
                <tr
                  key={customer.clienteId + index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{customer.clienteId}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.nombres}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.apellidos}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.tipoDocumento} {customer.numeroDocumento}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{customer.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
