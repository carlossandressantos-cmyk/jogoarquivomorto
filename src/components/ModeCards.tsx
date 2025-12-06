import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface ModeCardsProps {
  state: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
}

export default function ModeCards({ state, onUpdate }: ModeCardsProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (state.cardSpinning) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.cardSpinning]);

  const handleDrawCard = async () => {
    if (isAnimating) return;

    // Inicia a animação para todos
    onUpdate({ cardSpinning: true });

    // Após 3 segundos, revela carta aleatória
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 60) + 1;
      const newSrc = `/assets/cards/${randomNum}.png`;
      onUpdate({ 
        cardSpinning: false,
        cardSrc: newSrc
      });
    }, 3000);
  };

  const getStatusMessage = () => {
    if (state.cardSpinning) return "Sincronizando banco de dados...";
    if (state.cardSrc.includes('verso.png')) return "Arquivo de Imagens: Solicitar análise.";
    return "Arquivo recuperado.";
  };

  const getButtonText = () => {
    if (state.cardSrc.includes('verso.png')) return "INVESTIGAR ARQUIVO";
    return "INVESTIGAR NOVA CARTA";
  };

  return (
    <div className="w-full flex flex-col items-center flex-grow perspective-container">
      <div className="mb-4 h-8 text-center font-bold text-lg text-slate-800">
        {getStatusMessage()}
      </div>
      
      <div className="flex-grow flex items-center justify-center w-full mb-6">
        <div className="relative w-64 h-96 bg-gray-200 border-4 border-gray-800 shadow-2xl rounded-lg p-2 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={state.cardSrc}
            alt="Carta"
            className={`w-full h-full object-cover rounded shadow-inner ${
              isAnimating ? 'card-spinning' : ''
            }`}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center w-full mt-auto">
        <button
          onClick={handleDrawCard}
          disabled={isAnimating}
          className={`px-8 py-4 bg-gray-800 text-white font-bold text-xl tracking-widest hover:bg-gray-700 transition-colors border-b-4 border-gray-950 active:border-b-0 active:translate-y-1 shadow-lg ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
