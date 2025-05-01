export default function CurrencyBox({ type, buyPrice, sellPrice, spread }) {
    return (
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-md shadow-md w-full">
        {/* Título y Tipo de Dólar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-transform: uppercase text-white">{type}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
            />
          </svg>
        </div>
  
        {/* Precios */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">Vendé a:</p>
          <span className="text-2xl font-bold text-indigo-600">${buyPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">Comprá a:</p>
          <span className="text-2xl font-bold text-green-600">${sellPrice}</span>
        </div>

      </div>

      {/* Spread */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-300">Spread: ${spread}</p>
      </div>
      </div>
    );
  }
  