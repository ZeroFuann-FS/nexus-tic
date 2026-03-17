import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface VoiceSelectionModalProps {
  isOpen: boolean;
  onContinue: (voice: string) => void;
  onCancel: () => void;
}

const formingAnimation = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    transition: { duration: 0.4 }
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.4, staggerChildren: 0.2 }
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    transition: { duration: 0.4 }
  }
};

const contentAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
};

export const VoiceSelectionModal: React.FC<VoiceSelectionModalProps> = ({ isOpen, onContinue, onCancel }) => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedVoice) {
      onContinue(selectedVoice);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialog open={isOpen}>
          <motion.div
            variants={formingAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AlertDialogContent>
              <motion.div variants={contentAnimation}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Elige tu voz preferida para el asistente</AlertDialogTitle>
                  <AlertDialogDescription>
                    Selecciona una de las voces para continuar con el diagnóstico.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center gap-4 my-4">
                  <Button
                    variant={selectedVoice === 'female' ? 'default' : 'outline'}
                    onClick={() => setSelectedVoice('female')}
                  >
                    Mujer
                  </Button>
                  <Button
                    variant={selectedVoice === 'male' ? 'default' : 'outline'}
                    onClick={() => setSelectedVoice('male')}
                  >
                    Hombre
                  </Button>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleContinue} disabled={!selectedVoice}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </motion.div>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};
