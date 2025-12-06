import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { Player } from '../types/game';

interface ScoreBoardProps {
  players: Player[];
  currentWitnessIndex: number;
  roundNumber: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  players, 
  currentWitnessIndex,
  roundNumber 
}) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const maxScore = sortedPlayers[0]?.score || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-md p-6 rounded-lg border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)] scanlines"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-neon-cyan retro-font">
            PLACAR - RODADA {roundNumber}
          </h2>
        </div>
      </div>

      {/* Player Scores */}
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const isWitness = players.findIndex(p => p.id === player.id) === currentWitnessIndex;
          const isLeader = index === 0 && player.score > 0;

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                isLeader 
                  ? 'bg-gradient-to-r from-yellow-600/40 to-yellow-800/40 border-2 border-yellow-400' 
                  : 'bg-gray-800/40 border border-cyan-400/30'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`text-2xl font-bold retro-font ${
                  isLeader ? 'text-neon-yellow' : 'text-cyan-400'
                }`}>
                  #{index + 1}
                </div>

                {/* Player Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      isLeader ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {player.name}
                    </span>
                    {isWitness && (
                      <span className="px-2 py-1 bg-pink-600/50 text-pink-200 text-xs rounded border border-pink-400">
                        TESTEMUNHA
                      </span>
                    )}
                    {isLeader && (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className={`text-3xl font-bold retro-font ${
                  isLeader ? 'text-neon-yellow' : 'text-neon-cyan'
                }`}>
                  {player.score}
                </div>
                <div className="text-xs text-gray-400 uppercase">pontos</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      {maxScore > 0 && (
        <div className="mt-6 space-y-2">
          {sortedPlayers.map((player) => (
            <div key={`progress-${player.id}`} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{player.name}</span>
                <span>{player.score} pts</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(player.score / maxScore) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
