import Breadcrumbs from "@/components/credits/breadcrumbs";
import Form from "@/components/credits/create-form";

import { fetchCustomers } from "@/lib/data";

export default async function Page() {

  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Creditos', href: '/dashboard/credits' },
          {
            label: 'Crear Credito',
            href: '/dashboard/credits/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}