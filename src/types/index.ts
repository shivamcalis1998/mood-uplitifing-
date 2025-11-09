export interface MoodButton {
  id: string;
  title: string;
  emoji: string;
  message: string;
  animationType: string;
  locked: boolean;
}

export interface QuestState {
  progress: number;
  completedButtons: Set<string>;
  currentMood: string;
}
