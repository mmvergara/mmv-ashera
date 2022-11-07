import { Modal, ModalContent } from "@chakra-ui/react";
import { Box, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 40%; }
  25% { transform: scale(1.3) rotate(0); border-radius: 20%; }
  50% { transform: scale(1.3) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(-270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 40%; }
`;
const animation = `${animationKeyframes} 2s ease-in-out infinite`;

const LoadingModal: React.FC = () => {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalContent style={{ width: "fit-content", padding: "1em" }}>
        <Box
          as={motion.div}
          animation={animation}
          padding='2'
          bgGradient='linear(to-l, #390e3e, #c300ff, #00a6ff)'
          width='12'
          height='12'
          display='flex'
          backgroundColor='none'
        />
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
