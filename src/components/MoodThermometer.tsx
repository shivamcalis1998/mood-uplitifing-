import { motion } from 'framer-motion';

interface MoodThermometerProps {
  progress: number;
}

export default function MoodThermometer({ progress }: MoodThermometerProps) {
  const getMoodEmoji = (progress: number) => {
    if (progress <= 20) return '😔';
    if (progress <= 40) return '😐';
    if (progress <= 60) return '🙂';
    if (progress <= 80) return '😊';
    if (progress < 100) return '😀';
    return '😄';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="text-5xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: progress === 100 ? [0, 10, -10, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: progress === 100 ? Infinity : 0,
            }}
          >
            {getMoodEmoji(progress)}
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">Mood Level</h3>
            <p className="text-sm text-white/70">{progress}% Boosted</p>
          </div>
        </div>
        <div className="text-4xl font-bold text-white">{progress}%</div>
      </div>

      <div className="relative h-16 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
        <motion.div
          className="h-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6, #FBBF24)',
          }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-white/40 rounded-full"
              style={{
                left: `${i * 10 + 5}%`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {progress === 100 && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-2xl"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '50%',
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: ['-20%', '-100%'],
                  opacity: [1, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
