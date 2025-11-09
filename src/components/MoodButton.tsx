import { motion } from 'framer-motion';
import { MoodButton as MoodButtonType } from '../types';

interface MoodButtonProps {
  button: MoodButtonType;
  index: number;
  onClick: (button: MoodButtonType) => void;
  isLocked: boolean;
}

export default function MoodButton({ button, index, onClick, isLocked }: MoodButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={
        !isLocked
          ? {
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={() => !isLocked && onClick(button)}
      disabled={isLocked}
      className={`
        relative group
        ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className={`
          relative w-full h-40 rounded-3xl overflow-hidden
          ${
            isLocked
              ? 'bg-gray-400/20'
              : 'bg-gradient-to-br from-white/30 to-white/10'
          }
          backdrop-blur-xl border-2 border-white/30
          shadow-2xl
          transition-all duration-300
        `}
        animate={
          !isLocked
            ? {
                boxShadow: [
                  '0 10px 30px rgba(0,0,0,0.2)',
                  '0 15px 40px rgba(255,255,255,0.3)',
                  '0 10px 30px rgba(0,0,0,0.2)',
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {!isLocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-blue-400/20"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
          <motion.div
            className="text-5xl mb-3"
            animate={
              !isLocked
                ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {button.emoji}
          </motion.div>

          <h3 className="text-sm font-bold text-white leading-tight px-2">
            {button.title}
          </h3>

          {isLocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-green-500 rounded-full p-2"
            >
              <span className="text-white text-sm font-bold">✓</span>
            </motion.div>
          )}

          {!isLocked && (
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10"
              style={{
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="h-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Click me! ✨</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
