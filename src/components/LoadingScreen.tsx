import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const cloudMood = progress < 30 ? '😔' : progress < 70 ? '😐' : '😊';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-peach-200 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <motion.div
          className="relative inline-block mb-8"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-8xl relative">
            <motion.div
              className="absolute inset-0 blur-xl opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
              }}
            />
            <span className="relative z-10 drop-shadow-lg">{cloudMood}</span>
          </div>

          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            ✨
          </motion.div>
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mood Booster Quest
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Loading your happiness journey...
        </p>

        <div className="w-80 h-6 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-sm text-gray-700 mt-4 font-medium">{progress}%</p>
      </div>
    </motion.div>
  );
}
