import { notFound } from 'next/navigation';

import Form from "@/components/credits/edit-form";
import Breadcrumbs from '@/components/credits/breadcrumbs';

import { fetchCreditById, fetchCustomers } from '@/lib/data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;
  const [credit, customers] = await Promise.all([
    fetchCreditById(id),
    fetchCustomers(),
  ]);

  if (!credit) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Creditos', href: '/dashboard/credits' },
          {
            label: 'Editar Credito',
            href: `/dashboard/credits/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form credit={credit} customers={customers} />
    </main>
  );
}