import { unstable_noStore as noStore } from 'next/cache';

import axios from 'axios';

import { Client, Credit } from '@/lib/definitions';
import { auth } from '@/auth';

export async function fetchFilteredCredits(
  query: { type: string, number: string, creditId: string },
  currentPage: number,
) {
  noStore();
  console.log('query', query);

  try {

    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const { number, type, creditId } = query;

    if (type && number) {

      const { data: credits } = await axios.get<Credit[]>(`http://localhost:3000/creditos/client/${type}/${number}`, {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`
        }
      })
      return credits;
    }

    if (creditId) {

      const { data: credit } = await axios.get<Credit>(`http://localhost:3000/creditos/${creditId}`, {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`
        }
      })

      return credit ? [credit] : [];

    }

    const { data: credits } = await axios.get<Credit[]>('http://localhost:3000/creditos', {
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

    const { data } = await axios.get<Credit>(`http://localhost:3000/creditos/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    console.log(' fetchCreditById data', data);

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

    const { data: customers } = await axios.get<Client[]>('http://localhost:3000/clientes', {
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

    const { data: customers } = await axios.get<Client[]>('http://localhost:3000/clientes', {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    })

    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}