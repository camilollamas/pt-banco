'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
import { z } from 'zod';

import { auth, signIn } from '@/auth';

const CreditSchema = z.object({
  creditoId: z.string(),
  clienteId: z.string({
    invalid_type_error: 'Por favor seleccione cliente.',
  }),
  fechaDesembolso: z.string(),
  monto: z.coerce
    .number()
    .gt(0, { message: 'Por favor ingrese un monto mayor a $0.' }),
  plazoMeses: z.number(),
  tasaInteres: z.number(),
  estado: z.enum(['Inactivo', 'Activo'], {
    invalid_type_error: 'Por favor seleccione un estado de crédito.',
  }),
});

export type State = {
  errors?: {
    clienteId?: string[];
    fechaDesembolso?: string[];
    monto?: string[];
    plazoMeses?: string[];
    tasaInteres?: string[];
    estado?: string[];
  };
  message?: string | null;
};

const CreateCredit = CreditSchema.omit({ creditoId: true });
const UpdateCredit = CreditSchema.omit({ fechaDesembolso: true, creditoId: true, plazoMeses: true, tasaInteres: true });

export async function createCredit(prevState: State, formData: FormData) {

  const validatedFields = CreateCredit.safeParse({
    clienteId: formData.get('customerId'),
    fechaDesembolso: formData.get('fechaDesembolso'),
    monto: formData.get('amount'),
    plazoMeses: Number(formData.get('plazoMeses')),
    tasaInteres: Number(formData.get('tasaInteres')),
    estado: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. Error al crear crédito.',
    };
  }

  const { clienteId, fechaDesembolso, monto, plazoMeses, tasaInteres, estado } = validatedFields.data;
  const amountInCents = monto * 100;

  try {

    const session = await auth();

    if (!session) {
      throw new Error('Unauthorized');
    }

    await axios.post(`${NEXT_PUBLIC_API_URL}/creditos`, {
      clienteId,
      fechaDesembolso,
      monto: amountInCents,
      plazoMeses,
      tasaInteres,
      estado,
    }, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

  } catch (error) {
    console.error('Database Error:', (error as any).response.data);
    return {
      message: 'Database Error: Failed to Create Credit.',
    };
  }

  revalidatePath('/dashboard/credits');
  redirect('/dashboard/credits');

}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function updateCredit(
  id: string,
  prevState: State,
  formData: FormData,
) {

  const validatedFields = UpdateCredit.safeParse({
    clienteId: formData.get('customerId'),
    monto: formData.get('amount'),
    estado: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Credit.',
    };
  }

  const { clienteId, monto, estado } = validatedFields.data;
  const amountInCents = monto * 100;

  try {

    const session = await auth();

    if (!session) {
      throw new Error('Unauthorized');
    }

    await axios.patch(`${NEXT_PUBLIC_API_URL}/creditos/${id}`, {
      clienteId,
      monto: amountInCents,
      estado,
    }, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

  } catch (error) {
    return { message: 'Database Error: Failed to Update Credit.' };
  }

  revalidatePath('/dashboard/credits');
  redirect('/dashboard/credits');
}

export async function deleteCredit(creditId: string) {

  try {
    const session = await auth();

    if (!session) {
      throw new Error('Unauthorized');
    }

    await axios.delete(`${NEXT_PUBLIC_API_URL}/creditos/${creditId}`, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    revalidatePath('/dashboard/credits');

  } catch (error) {
    return { message: 'Database Error: Failed to Delete Credit.' };
  }

}