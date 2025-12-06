import { GameState, EVIDENCE_WORDS } from '../types/game';

interface ModeWordsProps {
  state: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
}

export default function ModeWords({ state, onUpdate }: ModeWordsProps) {
  const handleWordClick = (word: string) => {
    let newSelected = [...state.wordsSelected];
    
    if (newSelected.includes(word)) {
      newSelected = newSelected.filter(w => w !== word);
    } else if (newSelected.length < 2) {
      newSelected.push(word);
    }
    
    onUpdate({ wordsSelected: newSelected });
  };

  const handleReveal = () => {
    if (state.wordsSelected.length === 2) {
      onUpdate({ wordsRevealed: true });
    }
  };

  const handleReset = () => {
    onUpdate({ wordsSelected: [], wordsRevealed: false });
  };

  const getStatusMessage = () => {
    if (state.wordsRevealed) return "ASSOCIAÇÃO CONFIRMADA";
    return `Selecione exatamente 2 palavras (${state.wordsSelected.length}/2)`;
  };

  return (
    <div className="w-full flex flex-col items-center flex-grow">
      <div className="mb-4 h-8 text-center font-bold text-lg text-slate-800">
        {getStatusMessage()}
      </div>

      {!state.wordsRevealed && (
        <div className="w-full max-w-3xl word-list-container overflow-y-auto max-h-[400px] border border-gray-400 p-2 bg-white bg-opacity-50 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {EVIDENCE_WORDS.map(word => {
              const isSelected = state.wordsSelected.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  className={`text-xs md:text-sm p-2 border font-mono transition-colors truncate ${
                    isSelected
                      ? 'bg-yellow-400 border-black font-bold'
                      : 'border-gray-400 bg-gray-100 hover:bg-yellow-100'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {state.wordsRevealed && (
        <div className="w-full flex-grow flex flex-col items-center justify-center relative min-h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-9xl font-bold text-red-900 rotate-[-30deg]">CONFIDENCIAL</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center z-10 w-full">
            <div className="bg-black text-white p-6 border-4 border-red-600 transform -rotate-2 shadow-2xl w-full md:w-5/12 text-center">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold title-font blinking-text break-words">
                {state.wordsSelected[0]}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800">+</div>
            <div className="bg-black text-white p-6 border-4 border-red-600 transform rotate-2 shadow-2xl w-full md:w-5/12 text-center">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold title-font blinking-text break-words">
                {state.wordsSelected[1]}
              </span>
            </div>
          </div>
          <div className="mt-12 w-full h-8 crime-tape"></div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center w-full mt-auto">
        {!state.wordsRevealed && (
          <button
            onClick={handleReveal}
            disabled={state.wordsSelected.length !== 2}
            className={`px-8 py-4 bg-red-900 text-white font-bold text-xl tracking-widest hover:bg-red-800 border-b-4 border-black active:border-b-0 active:translate-y-1 ${
              state.wordsSelected.length === 2
                ? 'animate-pulse'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            REVELAR SELEÇÃO
          </button>
        )}
        
        {state.wordsRevealed && (
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-yellow-600 text-white font-bold tracking-wider hover:bg-yellow-500 border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1"
          >
            NOVA SELEÇÃO
          </button>
        )}
      </div>
    </div>
  );
}
