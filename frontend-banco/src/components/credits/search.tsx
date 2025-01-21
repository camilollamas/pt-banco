'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
          onChange={(e) => handleSearch(e.target.name, e.target.value)}
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
            handleSearch(e.target.name, e.target.value);
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
            handleSearch(e.target.name, e.target.value);
          }}
          defaultValue={searchParams.get('creditId')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}
