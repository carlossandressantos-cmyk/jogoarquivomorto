import { useState } from 'react';
import { createRoom, joinRoom } from '../api/multiplayerService';

interface LobbyProps {
  onJoinRoom: (roomId: string) => void;
}

export default function Lobby({ onJoinRoom }: LobbyProps) {
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    setLoading(true);
    setError('');
    try {
      const newRoomId = await createRoom();
      onJoinRoom(newRoomId);
    } catch (err) {
      setError('Erro ao criar sala. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      setError('Digite um código válido');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const room = await joinRoom(roomCode);
      if (room) {
        onJoinRoom(room.id);
      } else {
        setError('Sala não encontrada');
      }
    } catch (err) {
      setError('Erro ao entrar na sala. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/assets/fundo.png')] bg-cover bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 w-full max-w-md">
        <img 
          src="/assets/logo.png" 
          alt="Arquivo Morto" 
          className="h-32 md:h-40 object-contain mb-8 mx-auto drop-shadow-2xl logo-breath"
        />

        <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-red-800 p-6 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-red-500 mb-6 text-center uppercase tracking-wider">
            Sistema Multiplayer
          </h2>

          {error && (
            <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-2 mb-4 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleCreateRoom}
              disabled={loading}
              className="w-full px-6 py-4 bg-red-800 text-white font-bold text-lg uppercase tracking-wider hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-red-950 active:border-b-0 active:translate-y-1"
            >
              {loading ? 'Criando...' : 'Criar Nova Sala'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-500 uppercase tracking-wider">Ou</span>
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="CÓDIGO DA SALA"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 text-white text-center text-xl font-bold uppercase tracking-widest focus:outline-none focus:border-red-600 rounded mb-3"
              />
              <button
                onClick={handleJoinRoom}
                disabled={loading || !roomCode.trim()}
                className="w-full px-6 py-3 bg-gray-800 text-white font-bold uppercase tracking-wider hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-gray-950 active:border-b-0 active:translate-y-1"
              >
                {loading ? 'Entrando...' : 'Entrar na Sala'}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-xs font-mono">
          SISTEMA SEGURO v3.1 | CONEXÃO CRIPTOGRAFADA
        </div>
      </div>
    </div>
  );
}
