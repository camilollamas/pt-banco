import clsx from 'clsx';

import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CreditStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'Inactivo',
          'bg-green-500 text-white': status === 'Activo',
        },
      )}
    >
      {status === 'Inactivo' ? (
        <>
          Inactivo
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Activo' ? (
        <>
          Activo
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
