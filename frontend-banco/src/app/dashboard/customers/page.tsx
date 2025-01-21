import { Suspense } from 'react';

import Table from "@/components/customers/table"
import Search from '@/components/customers/search';

import { lusitana } from '@/configs';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    type?: string;
    number?: string;
    page?: string;
  }>;
}) {

  const type = ( await searchParams)?.type || '';
  const number = ( await searchParams)?.number || '';

  const currentPage = Number(( await searchParams)?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Buscar cliente..." /> */}
        {/* <CreateInvoice /> */}
      </div>
      <Suspense key={type + number + currentPage} fallback={<>Loading...</>}>
        <Table query={{ type, number }} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}