import { useState, useEffect } from 'react';
import Lobby from '../components/Lobby';
import ModeTabs from '../components/ModeTabs';
import ModeNumbers from '../components/ModeNumbers';
import ModeCards from '../components/ModeCards';
import ModeWords from '../components/ModeWords';
import AudioPlayer from '../components/AudioPlayer';
import { subscribeToRoom, updateGameState } from '../api/multiplayerService';
import { GameState, GameMode } from '../types/game';

export default function Game() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showLobby, setShowLobby] = useState(false);

  // Escuta mudanças em tempo real
  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = subscribeToRoom(roomId, (newState) => {
      setGameState(newState);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleStartGame = () => {
    setShowSplash(false);
    setShowLobby(true);
  };

  const handleJoinRoom = (id: string) => {
    setRoomId(id);
    setShowLobby(false);
  };

  const handleModeChange = (mode: GameMode) => {
    if (roomId && gameState) {
      updateGameState(roomId, { mode });
    }
  };

  const handleStateUpdate = (updates: Partial<GameState>) => {
    if (roomId) {
      updateGameState(roomId, updates);
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('/assets/fundo.png')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <img 
            src="/assets/logo.png" 
            alt="Arquivo Morto Logo" 
            className="h-48 md:h-64 object-contain mb-8 logo-breath drop-shadow-2xl"
          />
          
          <div className="text-gray-400 text-sm tracking-[0.2em] mb-12 font-bold uppercase">
            Acesso Restrito // Departamento de Casos Frios
          </div>

          <button 
            onClick={handleStartGame}
            className="group relative px-8 py-4 bg-transparent border-2 border-red-800 text-red-600 font-bold text-xl uppercase tracking-widest hover:bg-red-900/20 hover:text-red-500 hover:border-red-600 transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Iniciar Investigação
            </span>
          </button>
        </div>
        
        <div className="absolute bottom-8 text-gray-600 text-xs font-mono">
          SISTEMA ONLINE v3.1 | MULTIPLAYER ATIVO
        </div>
      </div>
    );
  }

  if (showLobby) {
    return <Lobby onJoinRoom={handleJoinRoom} />;
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl animate-pulse">Conectando à sala...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/assets/fundo.png')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start p-4">
      <AudioPlayer />

      {/* Room Code Display */}
      <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm border border-red-800 px-4 py-2 rounded">
        <div className="text-xs text-gray-400 uppercase tracking-wider">Sala</div>
        <div className="text-lg font-bold text-red-500 tracking-widest">{roomId}</div>
      </div>

      {/* Container Principal */}
      <div className="paper-texture text-gray-900 w-full max-w-4xl rounded-sm p-2 relative mt-4 mb-8 border-t-8 border-yellow-700 shadow-2xl">
        
        {/* Clipe decorativo */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gray-400 rounded-t-lg opacity-80 shadow-md"></div>

        <div className="border-2 border-gray-400 border-dashed p-4 md:p-6 h-full flex flex-col items-center min-h-[600px]">
          
          {/* Cabeçalho */}
          <header className="w-full flex flex-col items-center mb-6 border-b-2 border-gray-800 pb-4">
            <img 
              src="/assets/logo.png" 
              alt="Arquivo Morto Logo" 
              className="h-24 md:h-32 object-contain mb-2 drop-shadow-sm"
            />

            {/* Abas de Navegação */}
            <ModeTabs 
              currentMode={gameState.mode} 
              onChangeMode={handleModeChange} 
            />
          </header>

          {/* Renderiza modo atual */}
          {gameState.mode === 'numbers' && (
            <ModeNumbers state={gameState} onUpdate={handleStateUpdate} />
          )}
          
          {gameState.mode === 'cards' && (
            <ModeCards state={gameState} onUpdate={handleStateUpdate} />
          )}
          
          {gameState.mode === 'words' && (
            <ModeWords state={gameState} onUpdate={handleStateUpdate} />
          )}

        </div>
        
        <div className="text-center mt-2 text-xs text-gray-500 font-mono">
          SISTEMA INTEGRADO DE ARQUIVO MORTO v3.1 (Multi-Agente)
        </div>
      </div>
    </div>
  );
}
