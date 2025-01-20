import React, { useState } from 'react';

interface FilterFormProps {
  onFilter: (type: string, number: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(type, number);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center space-x-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Seleccionar tipo de documento</option>
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="PS">PS</option>
        </select>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Número de documento"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

export default FilterForm;

