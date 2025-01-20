'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CreditsTable from '../../components/CreditsTable';
import FilterForm from '../../components/FilterForm';
import NewCreditModal from '../../components/NewCreditModal';
import { useAuth } from 'app/hook/useAuth';
import { Client, Credit } from 'app/data/interfaces';


export default function Dashboard() {
  const { session, logout } = useAuth();
  const router = useRouter();
  const [credits, setCredits] = useState<Credit[]>([]);
  const [isNewCreditModalOpen, setIsNewCreditModalOpen] = useState(false);
  const [client, setClient] = useState<Client>();
  const [showClient, setShowClient] = useState(false);
  const [creditToEdit, setCreditToEdit] = useState<Credit | null>(null);
  const [formMode, setFormMode] = useState<'new' | 'edit'>('new');

  // const fetchCredits = useCallback(async (type?: string, number?: string) => {
  //   setShowClient(false);
  //   setCredits([]);
  //   try {
  //     let url = 'http://localhost:3000/creditos';
  //     if (type && number) {
  //       url += `/${type}/${number}`;
  //     }
  //     const response = await fetch(url, {
  //       headers: {
  //         'Authorization': `Bearer ${session?.access_token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch credits');
  //     }
  //     const data = await response.json();
  //     setCredits(data);
  //   } catch (error) {
  //     console.error('Error fetching credits:', error);
  //   }
  // }, [session]);

  const fetchCredits = async (type?: string, number?: string) => {
    setShowClient(false);
    setCredits([]);
    try {
      let url = 'http://localhost:3000/creditos';
      if (type && number) {
        url += `/${type}/${number}`;
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }
      const data = await response.json();
      setCredits(data);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const fetchCreditsByDocument = async (type: string, number: string) => {
    setShowClient(false);
    setCredits([]);
    try {
      const response = await fetch(`http://localhost:3000/creditos/${type}/${number}`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }
      const data = await response.json();
      const {creditos} = data;
      setClient(data.cliente);
      setCredits(creditos);
      setShowClient(true);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  }

  const handleEdit = async (creditoToUpdate: Credit) => {
    setCreditToEdit(creditoToUpdate)
    setIsNewCreditModalOpen(true);
    setFormMode('edit');
  };

  const onSaveEdit = async (updatedData:  Omit<Credit, '_id' | 'creditoId'>) => {
    try {
      const response = await fetch(`http://localhost:3000/creditos/${creditToEdit?.creditoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ...updatedData,
          monto: Number(updatedData.monto),
          plazoMeses: Number(updatedData.plazoMeses),
          tasaInteres: Number(updatedData.tasaInteres),
          fechaDesembolso: new Date(updatedData.fechaDesembolso).toISOString().split('T')[0],
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update credit');
      }
      fetchCredits(); 
    } catch (error) {
      console.error('Error updating credit:', error);
    }

  }

  const handleDelete = async (creditId: string) => {
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar este crédito?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/creditos/${creditId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete credit');
      }
      fetchCredits(); // Refresh the credits list
    } catch (error) {
      console.error('Error deleting credit:', error);
    }
  };

  const handleNewCredit = async (newCreditData: Omit<Credit, '_id' | 'creditoId'>) => {
    try {
      const response = await fetch('http://localhost:3000/creditos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ...newCreditData,
          monto: Number(newCreditData.monto),
          plazoMeses: Number(newCreditData.plazoMeses),
          tasaInteres: Number(newCreditData.tasaInteres),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new credit');
      }


      fetchCredits(); 
      setIsNewCreditModalOpen(false);
    } catch (error) {
      console.error('Error creating new credit:', error);
    }
  };
  const handleClearFilter = () => {
    setShowClient(false);
    fetchCredits();
  }

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      fetchCredits();
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <FilterForm onFilter={fetchCreditsByDocument} />
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => {
                  setFormMode('new')
                  setCreditToEdit(null)
                  setIsNewCreditModalOpen(true)
                }
              }
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
              Nuevo Crédito
              </button>
                <button
                onClick={() => handleClearFilter()} 
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                {showClient ? 'Limpiar Filtro' : 'Refrescar Créditos'}
                </button>
            </div>
            {showClient && client && (
                  <div className="mb-4 p-4 bg-white shadow rounded-md">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Datos del Cliente</h2>
                  <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">clienteId</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.clienteId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.nombres}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.apellidos}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.tipoDocumento} {client.numeroDocumento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{client.telefono}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
            )}
            <CreditsTable 
              credits={credits} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </div>
        </div>
      </main>

      <NewCreditModal
        isOpen={isNewCreditModalOpen}
        formMode={formMode}
        onClose={() => setIsNewCreditModalOpen(false)}
        onSubmit={ (data) => {
          if (formMode === 'new') {
            handleNewCredit(data);
          } else {
            onSaveEdit(data);
          }
        }} 
        creditToEdit={creditToEdit}
      />
    </div>
  );
}

