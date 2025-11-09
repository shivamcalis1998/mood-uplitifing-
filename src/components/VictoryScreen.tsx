import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

interface VictoryScreenProps {
  onReplay: () => void;
}

export default function VictoryScreen({ onReplay }: VictoryScreenProps) {
  const handleShare = async () => {
    const text = "I just completed the Mood Booster Quest! 😄✨ Feeling amazing!";

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard! 📋');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center overflow-hidden z-50"
    >
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 50,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          {['😄', '😊', '🎉', '✨', '💫', '⭐', '🎊', '🌟'][Math.floor(Math.random() * 8)]}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="mb-8"
        >
          <div className="text-9xl mb-4">
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              className="inline-block"
            >
              😄
            </motion.span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            Quest Complete!
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/20 backdrop-blur-xl border-4 border-white/40 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl max-w-2xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
            Kr diya mood fresh, bete! 🎉
          </p>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Esi hi rha kro—your daddy will gonna take care of everything. 😎
          </p>
          <p className="text-lg md:text-xl text-white/80 mt-4 italic">
            (Pyaar se, husband mode on. 💕)
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            🔄 Replay Quest?
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
          >
            <Share2 size={24} />
            Share Victory
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-white/80 text-lg"
        >
          <p>100% Mood Boosted ✨</p>
          <p className="text-sm mt-2">You're absolutely sparkling! 💫</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
