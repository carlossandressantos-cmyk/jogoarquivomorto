import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  onFlip?: () => void;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  id,
  image,
  isFlipped,
  onFlip,
  isSelected,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (onFlip) onFlip();
  };

  return (
    <motion.div
      className={`relative w-32 h-48 cursor-pointer ${isSelected ? 'ring-4 ring-yellow-400' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front (verso) */}
      <div
        className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <img
          src="/assets/verso.png"
          alt="Verso da carta"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Back (image) */}
      <div
        className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        {imageError ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            <span className="text-sm">Carta #{id}</span>
          </div>
        ) : (
          <img
            src={image}
            alt={`Carta ${id}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </motion.div>
  );
};
