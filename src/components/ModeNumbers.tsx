import { GameState } from '../types/game';

interface ModeNumbersProps {
  state: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
}

export default function ModeNumbers({ state, onUpdate }: ModeNumbersProps) {
  const numbers = [1, 2, 3, 4, 5, 6];

  const handleNumberSelect = (num: number) => {
    onUpdate({ numSelected: num });
  };

  const handleHide = () => {
    onUpdate({ numHidden: true });
  };

  const handleReveal = () => {
    onUpdate({ numRevealed: true });
  };

  const handleReset = () => {
    onUpdate({ numSelected: null, numHidden: false, numRevealed: false });
  };

  const getStatusMessage = () => {
    if (state.numRevealed) return "CASO REABERTO: Evidência revelada.";
    if (state.numHidden) return "Evidência arquivada. Aguardando revelação...";
    if (state.numSelected) return `Evidência ${state.numSelected} selecionada.`;
    return "Selecione uma evidência numérica.";
  };

  return (
    <div className="w-full flex flex-col items-center flex-grow">
      <div className="mb-6 h-8 text-center font-bold text-lg text-slate-800">
        {getStatusMessage()}
      </div>

      {/* Grid de Seleção */}
      {!state.numHidden && !state.numRevealed && (
        <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
          {numbers.map(num => (
            <button
              key={num}
              onClick={() => handleNumberSelect(num)}
              className={`group relative h-24 border-2 transition-all focus:outline-none ${
                state.numSelected === num
                  ? 'bg-yellow-200 border-yellow-600 ring-2 ring-yellow-500'
                  : 'bg-gray-200 border-gray-800 hover:bg-gray-300'
              }`}
            >
              <span className="absolute top-1 left-2 text-xs font-bold text-gray-500">
                EVIDÊNCIA
              </span>
              <span className="text-4xl font-bold title-font group-hover:scale-110 transition-transform block">
                {num}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Tela Oculta */}
      {state.numHidden && !state.numRevealed && (
        <div className="w-full max-w-md h-64 border-4 border-double border-red-900 flex items-center justify-center relative bg-gray-200 mb-8">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          <div className="stamp-animate border-4 border-red-800 text-red-800 p-2 font-bold text-2xl uppercase tracking-widest title-font transform rotate-[-15deg]">
            Confidencial
          </div>
        </div>
      )}

      {/* Tela Revelada */}
      {state.numRevealed && (
        <div className="w-full max-w-md h-64 flex flex-col items-center justify-center mb-8 relative">
          <p className="text-sm uppercase tracking-widest mb-2">A evidência selecionada foi:</p>
          <div className="w-32 h-32 bg-yellow-400 text-black border-4 border-black flex items-center justify-center shadow-lg transform rotate-2">
            <span className="text-6xl font-bold title-font">{state.numSelected}</span>
          </div>
          <div className="mt-4 w-full h-4 crime-tape"></div>
        </div>
      )}

      {/* Controles */}
      <div className="flex flex-wrap gap-4 justify-center w-full mt-auto">
        {!state.numHidden && !state.numRevealed && (
          <button
            onClick={handleHide}
            disabled={!state.numSelected}
            className="px-6 py-3 bg-gray-800 text-white font-bold tracking-wider hover:bg-gray-700 border-b-4 border-gray-950 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            OCULTAR
          </button>
        )}
        
        {state.numHidden && !state.numRevealed && (
          <button
            onClick={handleReveal}
            className="px-6 py-3 bg-red-800 text-white font-bold tracking-wider hover:bg-red-700 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 animate-pulse"
          >
            MOSTRAR
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-yellow-600 text-white font-bold tracking-wider hover:bg-yellow-500 border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1"
        >
          RESTAURAR
        </button>
      </div>
    </div>
  );
}
