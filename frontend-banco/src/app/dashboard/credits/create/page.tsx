import Breadcrumbs from "@/components/credits/breadcrumbs";
import Form from "@/components/credits/create-form";

import { fetchCustomers } from "@/lib/data";

export default async function Page() {

  let customers: any[] = [];

  try {
    customers = await fetchCustomers();
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    // Manejar el error de manera adecuada, por ejemplo, redirigir a una página de error
  }
 
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