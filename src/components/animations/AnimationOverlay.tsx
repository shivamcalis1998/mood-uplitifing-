import { motion, AnimatePresence } from 'framer-motion';
import { gratitudeItems } from '../../data/moodButtons';

interface AnimationOverlayProps {
  animationType: string | null;
  message: string;
  onComplete: () => void;
}

export default function AnimationOverlay({ animationType, message, onComplete }: AnimationOverlayProps) {
  if (!animationType) return null;

  const renderAnimation = () => {
    switch (animationType) {
      case 'breathe':
        return <BreatheAnimation />;
      case 'hug':
        return <HugAnimation />;
      case 'dance':
        return <DanceAnimation />;
      case 'gratitude':
        return <GratitudeAnimation />;
      case 'eyeroll':
        return <EyeRollAnimation />;
      case 'meme':
        return <MemeAnimation />;
      case 'stretch':
        return <StretchAnimation />;
      case 'whisper':
        return <WhisperAnimation />;
      case 'nap':
        return <NapAnimation />;
      case 'victory':
        return <VictoryAnimation />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
        onClick={onComplete}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="relative"
        >
          {renderAnimation()}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 bg-white/90 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-2xl max-w-md"
          >
            <p className="text-xl font-medium text-gray-800">{message}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BreatheAnimation() {
  return (
    <motion.div
      className="text-9xl"
      animate={{
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3,
        repeat: 2,
        ease: 'easeInOut',
      }}
    >
      💨
    </motion.div>
  );
}

function HugAnimation() {
  return (
    <div className="relative">
      <motion.div
        className="text-9xl"
        animate={{
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 1,
          repeat: 3,
        }}
      >
        🤗
      </motion.div>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            top: '50%',
            left: '50%',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5],
            opacity: [1, 0],
            x: Math.cos((i * Math.PI * 2) / 8) * 100,
            y: Math.sin((i * Math.PI * 2) / 8) * 100,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
}

function DanceAnimation() {
  return (
    <motion.div
      className="text-9xl"
      animate={{
        rotate: [0, -30, 30, -30, 30, 0],
        y: [0, -20, 0, -20, 0],
      }}
      transition={{
        duration: 2,
        repeat: 2,
        ease: 'easeInOut',
      }}
    >
      🕺
    </motion.div>
  );
}

function GratitudeAnimation() {
  const randomGratitude = gratitudeItems[Math.floor(Math.random() * gratitudeItems.length)];

  return (
    <div className="text-center">
      <motion.div
        className="text-9xl mb-6"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        🙏
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl"
      >
        {randomGratitude}
      </motion.div>
    </div>
  );
}

function EyeRollAnimation() {
  return (
    <motion.div
      className="text-9xl"
      animate={{
        rotate: [0, 360, 720],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
    >
      🙄
    </motion.div>
  );
}

function MemeAnimation() {
  const memes = ['😂', '🤣', '😹', '😸', '😺'];
  return (
    <div className="grid grid-cols-3 gap-4">
      {memes.map((emoji, i) => (
        <motion.div
          key={i}
          className="text-6xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: i * 0.1,
            type: 'spring',
            stiffness: 200,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

function StretchAnimation() {
  return (
    <motion.div
      className="text-9xl"
      animate={{
        scaleX: [1, 1.5, 1],
        scaleY: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: 2,
        ease: 'easeInOut',
      }}
    >
      🤸
    </motion.div>
  );
}

function WhisperAnimation() {
  return (
    <div className="relative">
      <motion.div
        className="text-9xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: 3,
          ease: 'easeInOut',
        }}
      >
        🌸
      </motion.div>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            top: '50%',
            left: '50%',
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 1],
            opacity: [0.8, 0],
            x: Math.cos((i * Math.PI * 2) / 12) * 150,
            y: Math.sin((i * Math.PI * 2) / 12) * 150,
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        >
          🌺
        </motion.div>
      ))}
    </div>
  );
}

function NapAnimation() {
  return (
    <div className="relative">
      <motion.div
        className="text-9xl"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: 3,
          ease: 'easeInOut',
        }}
      >
        😴
      </motion.div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-60"
          style={{
            top: '-20%',
            left: `${20 + i * 15}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -50,
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: 2,
          }}
        >
          💭
        </motion.div>
      ))}
    </div>
  );
}

function VictoryAnimation() {
  return (
    <div className="relative">
      <motion.div
        className="text-9xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: 5,
        }}
      >
        🎉
      </motion.div>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            top: '50%',
            left: '50%',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 0.5],
            opacity: [1, 0],
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: 'easeOut',
          }}
        >
          {['✨', '🎊', '🎈', '⭐', '💫'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  );
}
