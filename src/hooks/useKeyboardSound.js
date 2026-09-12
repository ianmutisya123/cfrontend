const keyStrokeSound = new Audio("/sounds/mouse-click.mp3");

export const useKeyboardSound = () => {
  const playKeyStrokeSound = () => {
    keyStrokeSound.currentTime = 0;
    keyStrokeSound.play().catch((error) => {
      console.error("Error playing keystroke sound:", error);
    });
  };

  return { playKeyStrokeSound };
} 