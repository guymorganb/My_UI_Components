import { chakra } from '@chakra-ui/react';
export function CustomTooltip({ children }) {
    return (
      <chakra.span
        className="tooltip"
        position="absolute"
        top="0"
        fontSize="14px"
        bg="white"
        color="black" // Adjust color to be visible on white background
        p="5px 8px"
        borderRadius="5px"
        boxShadow="0 10px 10px rgba(0, 0, 0, 0.1)"
        opacity="0"
        pointerEvents="none"
        transition="all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        _before={{
          content: `""`,
          position: "absolute",
          height: "8px",
          width: "8px",
          bg: "white",
          bottom: "-3px",
          left: "50%",
          transform: "translate(-50%) rotate(45deg)",
          transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        }}
      >
        {children}
      </chakra.span>
    );
  }