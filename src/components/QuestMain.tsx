import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import MoodThermometer from "./MoodThermometer";
import MoodButton from "./MoodButton";
import AnimationOverlay from "./animations/AnimationOverlay";
import VictoryScreen from "./VictoryScreen";
import { moodButtons } from "../data/moodButtons";
import { MoodButton as MoodButtonType } from "../types";
import { audioManager } from "../utils/audio";

interface QuestMainProps {
  onRestart: () => void;
}

export default function QuestMain({ onRestart }: QuestMainProps) {
  const [progress, setProgress] = useState(0);
  const [completedButtons, setCompletedButtons] = useState<Set<string>>(
    new Set()
  );
  const [currentAnimation, setCurrentAnimation] = useState<{
    type: string;
    message: string;
    buttonId: string;
  } | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showVictory, setShowVictory] = useState(false);

  const handleButtonClick = (button: MoodButtonType) => {
    if (completedButtons.has(button.id)) return;

    audioManager.playDing();

    setCurrentAnimation({
      type: button.animationType,
      message: button.message,
      buttonId: button.id,
    });

    setTimeout(() => {
      const newProgress = progress + 10;
      setProgress(newProgress);
      setCompletedButtons(new Set([...completedButtons, button.id]));
      setCurrentAnimation(null);

      if (newProgress === 100) {
        audioManager.playCelebration();
        setTimeout(() => setShowVictory(true), 1000);
      }
    }, 8000);
  };

  const handleScreenClick = () => {
    if (currentAnimation) {
      const newProgress = progress + 10;
      setProgress(newProgress);
      setCompletedButtons(
        new Set([...completedButtons, currentAnimation.buttonId])
      );
      setCurrentAnimation(null);

      if (newProgress === 100) {
        audioManager.playCelebration();
        setTimeout(() => setShowVictory(true), 1000);
      }
    }
  };

  const handleReplay = () => {
    setShowVictory(false);
    setProgress(0);
    setCompletedButtons(new Set());
  };

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    audioManager.setEnabled(newState);
  };

  if (showVictory) {
    return <VictoryScreen onReplay={handleReplay} />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-8 px-4 relative overflow-hidden"
      onClick={handleScreenClick}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-40 bg-white/30 backdrop-blur-md p-4 rounded-full shadow-lg border-2 border-white/40"
        aria-label={audioEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {audioEnabled ? (
          <Volume2 className="text-white" size={24} />
        ) : (
          <VolumeX className="text-white" size={24} />
        )}
      </motion.button>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Mood Booster Quest ✨
          </h1>
          <p className="text-xl text-white/90">
            Complete all 10 mood nudges to reach sparkling happiness!
          </p>
        </motion.div>

        <MoodThermometer progress={progress} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
          {moodButtons.map((button, index) => (
            <MoodButton
              key={button.id}
              button={button}
              index={index}
              onClick={handleButtonClick}
              isLocked={completedButtons.has(button.id)}
            />
          ))}
        </div>

        {progress > 0 && progress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12 bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl inline-block mx-auto"
          >
            <p className="text-white font-medium text-lg">
              +{progress}% Happier Vibes Detected! Keep going! 🌟
            </p>
          </motion.div>
        )}
      </div>

      {currentAnimation && (
        <AnimationOverlay
          animationType={currentAnimation.type}
          message={currentAnimation.message}
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
