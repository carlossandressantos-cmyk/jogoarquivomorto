import { GameMode } from '../types/game';

interface ModeTabsProps {
  currentMode: GameMode;
  onChangeMode: (mode: GameMode) => void;
}

export default function ModeTabs({ currentMode, onChangeMode }: ModeTabsProps) {
  const tabs = [
    { id: 'numbers' as GameMode, label: '1. Evidência Numérica' },
    { id: 'cards' as GameMode, label: '2. Cartas' },
    { id: 'words' as GameMode, label: '3. Palavras' }
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 w-full justify-center">
      {tabs.map(tab => {
        const isActive = currentMode === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeMode(tab.id)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider border-b-4 transition-all ${
              isActive
                ? 'bg-gray-800 text-white border-gray-950'
                : 'bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
