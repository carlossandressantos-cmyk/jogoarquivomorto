import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { ScoreBoard } from './ScoreBoard';
import { generateCards, shuffleArray, getRandomEvidenceWords } from '../api/cards';
import { Card as CardType } from '../api/cards';
import { Player, calculateScore } from '../types/game';
import { updateGameState } from '../api/multiplayerService';

interface GameBoardProps {
  players: Player[];
  roomId?: string;
  isMultiplayer?: boolean;
  onGameEnd?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  players: initialPlayers,
  roomId,
  isMultiplayer = false,
  onGameEnd
}) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [evidenceWords, setEvidenceWords] = useState<string[]>([]);
  const [revealedCards, setRevealedCards] = useState<CardType[]>([]);
  const [phase, setPhase] = useState<'setup' | 'witness-select' | 'detective-select' | 'reveal' | 'vote' | 'score'>('setup');
  const [witnessCard, setWitnessCard] = useState<CardType | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [roundNumber, setRoundNumber] = useState(1);
  const [selectedCards, setSelectedCards] = useState<Record<string, number>>({});

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allCards = generateCards();
    const shuffledCards = shuffleArray(allCards);
    
    // Deal 5 cards to each player
    const updatedPlayers = players.map((player, index) => {
      const startIdx = index * 5;
      return {
        ...player,
        hand: shuffledCards.slice(startIdx, startIdx + 5).map(c => c.id)
      };
    });

    setPlayers(updatedPlayers);
    setCards(shuffledCards);
    startNewRound(updatedPlayers);
  };

  const startNewRound = (currentPlayers: Player[] = players) => {
    const words = getRandomEvidenceWords(2);
    setEvidenceWords(words);
    setRevealedCards([]);
    setWitnessCard(null);
    setVotes({});
    setSelectedCards({});
    setPhase('witness-select');

    if (isMultiplayer && roomId) {
      updateGameState(roomId, {
        selectedEvidenceWords: words,
        phase: 'witness-select',
        roundNumber
      });
    }
  };

  const handleWitnessSelectCard = (cardId: number) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setWitnessCard(card);
      setSelectedCards({ [players[currentPlayerIndex].id]: cardId });
      setPhase('detective-select');

      if (isMultiplayer && roomId) {
        updateGameState(roomId, {
          witnessCardId: cardId,
          phase: 'detective-select'
        });
      }
    }
  };

  const handleDetectiveSelectCard = (playerId: string, cardId: number) => {
    setSelectedCards(prev => ({ ...prev, [playerId]: cardId }));

    // Check if all detectives selected
    const detectiveCount = players.length - 1;
    const selectedCount = Object.keys(selectedCards).length + 1; // +1 for current selection

    if (selectedCount === players.length) {
      revealAllCards();
    }
  };

  const revealAllCards = () => {
    if (!witnessCard) return;

    const allSelectedCards = Object.values(selectedCards).map(cardId => 
      cards.find(c => c.id === cardId)!
    );

    const shuffledReveal = shuffleArray([witnessCard, ...allSelectedCards]);
    setRevealedCards(shuffledReveal);
    setPhase('vote');

    if (isMultiplayer && roomId) {
      updateGameState(roomId, {
        revealedCards: shuffledReveal.map(c => c.id),
        phase: 'vote'
      });
    }
  };

  const handleVote = (playerId: string, cardId: number) => {
    if (playerId === players[currentPlayerIndex].id) return; // Witness can't vote

    setVotes(prev => ({ ...prev, [playerId]: cardId }));

    // Check if all voted
    const voteCount = Object.keys(votes).length + 1;
    const requiredVotes = players.length - 1;

    if (voteCount === requiredVotes) {
      calculateRoundScores({ ...votes, [playerId]: cardId });
    }
  };

  const calculateRoundScores = (finalVotes: Record<string, number>) => {
    if (!witnessCard) return;

    const scoreChanges = calculateScore(
      witnessCard.id,
      finalVotes,
      players[currentPlayerIndex].id
    );

    const updatedPlayers = players.map(player => ({
      ...player,
      score: player.score + (scoreChanges[player.id] || 0)
    }));

    setPlayers(updatedPlayers);
    setPhase('score');

    if (isMultiplayer && roomId) {
      updateGameState(roomId, {
        players: updatedPlayers,
        phase: 'score',
        votes: finalVotes
      });
    }

    // Show scores for 5 seconds then next round
    setTimeout(() => {
      nextRound(updatedPlayers);
    }, 5000);
  };

  const nextRound = (currentPlayers: Player[]) => {
    const nextIndex = (currentPlayerIndex + 1) % currentPlayers.length;
    setCurrentPlayerIndex(nextIndex);
    setRoundNumber(prev => prev + 1);
    startNewRound(currentPlayers);
  };

  const currentWitness = players[currentPlayerIndex];
  const isCurrentPlayerWitness = (playerId: string) => playerId === currentWitness.id;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-retro-grid">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with 80s styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-neon-cyan retro-font mb-2 drop-shadow-[0_0_10px_rgba(0,255,255,1)]">
            ARQUIVO MORTO
          </h1>
          <p className="text-neon-pink text-xl retro-font">
            INVESTIGAÇÃO ANO 1985
          </p>
        </motion.div>

        {/* ScoreBoard */}
        <ScoreBoard 
          players={players} 
          currentWitnessIndex={currentPlayerIndex}
          roundNumber={roundNumber}
        />

        {/* Evidence Words */}
        {(phase === 'witness-select' || phase === 'detective-select' || phase === 'vote') && evidenceWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-pink-900/90 to-purple-900/90 backdrop-blur-md p-6 rounded-lg border-2 border-neon-pink shadow-[0_0_30px_rgba(255,0,255,0.5)] scanlines"
          >
            <h2 className="text-xl text-center text-pink-200 mb-3 retro-font">
              EVIDÊNCIAS DO CASO:
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              {evidenceWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-3xl font-bold text-neon-yellow px-6 py-3 bg-black/50 rounded border-2 border-yellow-400 shadow-[0_0_15px_rgba(255,255,0,0.5)] retro-font"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Current Phase Indicator */}
        <div className="text-center">
          {phase === 'witness-select' && (
            <div className="text-2xl text-neon-cyan retro-font">
              🔍 {currentWitness.name} - SELECIONE SUA MEMÓRIA
            </div>
          )}
          {phase === 'detective-select' && (
            <div className="text-2xl text-neon-pink retro-font">
              🕵️ DETETIVES - ESCOLHAM SUAS PISTAS
            </div>
          )}
          {phase === 'vote' && (
            <div className="text-2xl text-neon-yellow retro-font">
              ⚖️ VOTEM NA MEMÓRIA DA TESTEMUNHA
            </div>
          )}
        </div>

        {/* Player Hands */}
        {(phase === 'witness-select' || phase === 'detective-select') && (
          <div className="space-y-6">
            {players.map((player, playerIdx) => {
              const isWitness = isCurrentPlayerWitness(player.id);
              const canSelect = (phase === 'witness-select' && isWitness) || 
                              (phase === 'detective-select' && !isWitness);
              const hasSelected = selectedCards[player.id] !== undefined;

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: playerIdx * 0.1 }}
                  className={`p-6 rounded-lg border-2 ${
                    isWitness 
                      ? 'bg-pink-900/30 border-pink-400' 
                      : 'bg-cyan-900/30 border-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className={`text-2xl font-bold retro-font ${
                      isWitness ? 'text-neon-pink' : 'text-neon-cyan'
                    }`}>
                      {player.name}
                    </h3>
                    {isWitness && (
                      <span className="px-3 py-1 bg-pink-600 text-white text-sm rounded border border-pink-400">
                        TESTEMUNHA
                      </span>
                    )}
                    {hasSelected && (
                      <span className="px-3 py-1 bg-green-600 text-white text-sm rounded border border-green-400">
                        ✓ SELECIONADO
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    {player.hand.map((cardId) => {
                      const card = cards.find(c => c.id === cardId);
                      if (!card) return null;

                      return (
                        <div key={cardId} className={!canSelect ? 'opacity-50 cursor-not-allowed' : ''}>
                          <Card
                            id={card.id}
                            image={card.image}
                            isFlipped={false}
                            isSelected={selectedCards[player.id] === cardId}
                            onClick={() => {
                              if (!canSelect || hasSelected) return;
                              
                              if (isWitness) {
                                handleWitnessSelectCard(cardId);
                              } else {
                                handleDetectiveSelectCard(player.id, cardId);
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Revealed Cards for Voting */}
        {phase === 'vote' && revealedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-purple-900/90 to-black/90 p-8 rounded-lg border-2 border-yellow-400 shadow-[0_0_30px_rgba(255,255,0,0.5)]"
          >
            <h3 className="text-3xl text-neon-yellow text-center mb-6 retro-font">
              QUAL É A MEMÓRIA DA TESTEMUNHA?
            </h3>
            <div className="flex gap-6 justify-center flex-wrap">
              {revealedCards.map((card, idx) => (
                <motion.div
                  key={`${card.id}-${idx}`}
                  initial={{ opacity: 0, rotateY: 180 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative"
                >
                  <Card
                    id={card.id}
                    image={card.image}
                    isFlipped={true}
                    onClick={() => {
                      // Current player votes (except witness)
                      const voterId = players[0].id; // In local game, simulate voting
                      if (!votes[voterId] && !isCurrentPlayerWitness(voterId)) {
                        handleVote(voterId, card.id);
                      }
                    }}
                  />
                  {votes[players[0]?.id] === card.id && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                      ✓
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Score Phase */}
        {phase === 'score' && witnessCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-900/90 to-black/90 p-8 rounded-lg border-2 border-green-400 shadow-[0_0_30px_rgba(0,255,0,0.5)] scanlines"
          >
            <h3 className="text-4xl text-center text-neon-yellow mb-6 retro-font">
              CASO RESOLVIDO!
            </h3>
            
            <div className="text-center mb-6">
              <p className="text-xl text-green-300 mb-4">A memória da testemunha era:</p>
              <div className="flex justify-center">
                <Card
                  id={witnessCard.id}
                  image={witnessCard.image}
                  isFlipped={true}
                />
              </div>
            </div>

            <div className="text-center text-cyan-400 text-lg retro-font">
              Próximo caso em 5 segundos...
            </div>
          </motion.div>
        )}

        {/* End Game Button */}
        {onGameEnd && (
          <div className="text-center">
            <button
              onClick={onGameEnd}
              className="px-8 py-4 bg-red-900/80 hover:bg-red-800/80 text-white font-bold rounded-lg border-2 border-red-500 transition-all retro-font text-xl"
            >
              ENCERRAR INVESTIGAÇÃO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
