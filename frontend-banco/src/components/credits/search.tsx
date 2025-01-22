'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../ui/button';


export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((name: string, value: string) => {
    console.log(`Searching... ${name} - ${value}`);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearfilter = (name: string) => {
    const params = new URLSearchParams(searchParams);

    if(name === 'client'){
      params.delete('type');
      params.delete('number');
      replace(`${pathname}?${params.toString()}`);
      (document.getElementById('documentType') as HTMLSelectElement).value = '';
      (document.getElementsByName('number')[0] as HTMLInputElement).value = '';
    }
    else if(name === 'creditId'){
      params.delete('creditId');
      replace(`${pathname}?${params.toString()}`);
      (document.getElementsByName('creditId')[0] as HTMLInputElement).value = '';
    }

  }



  return (
    <div className='flex flex-1 gap-2'>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="documentType" className="sr-only">
          Seleccione el tipo de documento
        </label>
        <select
          id="documentType"
          name='type'
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={(e) => {
            clearfilter('creditId')
            setTimeout(() => {
              handleSearch(e.target.name, e.target.value);
            }, 300);
          }}
          defaultValue={searchParams.get('type')?.toString()}
        >
          <option value="">Seleccionar tipo de documento</option>
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="PS">PS</option>
        </select>
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          name='number'
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={`Ingrese número de documento...`}
          onChange={(e) => {
            clearfilter('creditId')
            setTimeout(() => {
              handleSearch(e.target.name, e.target.value);
            }, 300);
          }}
          defaultValue={searchParams.get('number')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          name='creditId'
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={`Ingrese número de crédito...`}
          onChange={(e) => {
            clearfilter('client')
            setTimeout(() => {
              handleSearch(e.target.name, e.target.value);
            }, 300);
          }}
          defaultValue={searchParams.get('creditId')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
          <Button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('type');
              params.delete('number');
              params.delete('creditId');
              replace(`${pathname}?${params.toString()}`);
              (document.getElementById('documentType') as HTMLSelectElement).value = '';
              (document.getElementsByName('number')[0] as HTMLInputElement).value = '';
              (document.getElementsByName('creditId')[0] as HTMLInputElement).value = '';
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
  );
}
