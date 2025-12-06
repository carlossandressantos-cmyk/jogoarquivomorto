import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { db } from './firebase';
import { GameState, DEFAULT_GAME_STATE } from '../types/game';

const ROOMS_COLLECTION = 'rooms';

export interface Room {
  id: string;
  gameState: GameState;
  createdAt: number;
}

// Gera código de sala (6 caracteres)
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Cria uma nova sala
export async function createRoom(): Promise<string> {
  const roomId = generateRoomCode();
  const roomRef = doc(db, ROOMS_COLLECTION, roomId);
  
  const room: Room = {
    id: roomId,
    gameState: DEFAULT_GAME_STATE,
    createdAt: Date.now()
  };
  
  await setDoc(roomRef, room);
  return roomId;
}

// Entra em uma sala existente
export async function joinRoom(roomId: string): Promise<Room | null> {
  const roomRef = doc(db, ROOMS_COLLECTION, roomId.toUpperCase());
  const roomSnap = await getDoc(roomRef);
  
  if (roomSnap.exists()) {
    return roomSnap.data() as Room;
  }
  return null;
}

// Atualiza o estado do jogo na sala
export async function updateGameState(
  roomId: string, 
  updates: Partial<GameState>
): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, roomId.toUpperCase());
  await updateDoc(roomRef, {
    [`gameState`]: {
      ...(await getDoc(roomRef)).data()?.gameState,
      ...updates,
      lastUpdate: Date.now()
    }
  });
}

// Escuta mudanças em tempo real na sala
export function subscribeToRoom(
  roomId: string,
  callback: (gameState: GameState) => void
): Unsubscribe {
  const roomRef = doc(db, ROOMS_COLLECTION, roomId.toUpperCase());
  
  return onSnapshot(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      const room = snapshot.data() as Room;
      callback(room.gameState);
    }
  });
}
