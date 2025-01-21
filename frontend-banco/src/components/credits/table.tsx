import CreditStatus from '@/components/credits/status';
import { DeleteCredit, UpdateCredit } from '@/components/credits/buttons';

import { fetchFilteredCredits } from '@/lib/data';
import { formatCurrency, formatDateToLocal } from '@/lib/util';
import { Credit } from '@/lib/definitions';

export default async function CreditsTable({
  query,
  currentPage,
}: {
  query: { type: string, number: string, creditId: string };
  currentPage: number;
}) {

  const credits = await fetchFilteredCredits(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Id. Crédito</th>
                <th scope="col" className="px-3 py-5 font-medium">Id. Cliente</th>
                <th scope="col" className="px-3 py-5 font-medium">Fecha Desembolso</th>
                <th scope="col" className="px-3 py-5 font-medium">Monto</th>
                <th scope="col" className="px-3 py-5 font-medium">Meses</th>
                <th scope="col" className="px-3 py-5 font-medium">Interes</th>
                <th scope="col" className="px-3 py-5 font-medium">Estado</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Accion</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              { Array.isArray(credits) && credits.map((credit, index) => (
                <tr
                  key={credit.creditoId + index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{credit.creditoId}</td>
                  <td className="whitespace-nowrap px-3 py-3">{credit.clienteId}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(credit.fechaDesembolso)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{formatCurrency(credit.monto)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{credit.plazoMeses}</td>
                  <td className="whitespace-nowrap px-3 py-3">{credit.tasaInteres}%</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CreditStatus status={credit.estado} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCredit id={credit.creditoId} />
                      <DeleteCredit id={credit.creditoId} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
