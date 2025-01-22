import { unstable_noStore as noStore } from 'next/cache';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

import axios from 'axios';

import { Client, Credit } from '@/lib/definitions';
import { auth } from '@/auth';

export async function fetchFilteredCredits(
  query: { type: string, number: string, creditId: string },
  currentPage: number,
) {
  noStore();

  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const { number, type, creditId } = query;

    if (type && number) {

      const { data: credits } = await axios.get<Credit[]>(`${NEXT_PUBLIC_API_URL}/creditos/client/${type}/${number}`, {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`
        }
      })
      return credits;
    }

    if (creditId) {

      const { data: credit } = await axios.get<Credit>(`${NEXT_PUBLIC_API_URL}/creditos/${creditId}`, {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`
        }
      })

      return credit ? [credit] : [];

    }

    const { data: credits } = await axios.get<Credit[]>(`${NEXT_PUBLIC_API_URL}/creditos`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    return credits;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch credits.');
  }
}

export async function fetchCreditById(id: string) {
  noStore();
  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const { data } = await axios.get<Credit>(`${NEXT_PUBLIC_API_URL}/creditos/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    const credit = { ...data, monto: data.monto / 100 };

    return credit;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCustomers() {
  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const { data: customers } = await axios.get<Client[]>(`${NEXT_PUBLIC_API_URL}/clientes`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(
  query: { type: string, number: string },
  currentPage: number,
) {
  noStore();

  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const { data: customers } = await axios.get<Client[]>(`${NEXT_PUBLIC_API_URL}/clientes`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    if(customers.length === 0) {
      await uploadSeedData();
    }

    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

async function uploadSeedData() {
  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await axios.post(`${NEXT_PUBLIC_API_URL}/clientes/cargar`, {}, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    await axios.post(`${NEXT_PUBLIC_API_URL}/creditos/cargar`, {}, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}