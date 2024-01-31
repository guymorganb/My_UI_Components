/**
 * Author 
 * guyycodes
 */
import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { css, keyframes } from '@emotion/react';

const typewriterAnimation = keyframes`
  from { 
    width: 0; 
    border-right: 2px solid black; // Simulate cursor with border
  }
  to { 
    width: 100%;
    border-right: 2px solid black; // Keep the cursor at the end
  }
`;
const blinkCursorAnimation = keyframes`
  0%, 100% { border-color: transparent; }
  50% { border-color: black; }
`;
export const TypewriterText = ({ children }) => {
    const [key, setKey] = useState(0); // key state to re-trigger the animation
  
    useEffect(() => {
      const animationDuration = 4000; // Duration of the typewriter animation in milliseconds
      const delay = 1000; // Delay before restarting the animation in milliseconds
      const totalDuration = animationDuration + delay;
  
      const interval = setInterval(() => {
        setKey(prevKey => prevKey + 1); // Increment the key to re-trigger the animation
      }, totalDuration);
  
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);
  
    return (
      <Box
        key={key} // Use key to re-trigger animation
        position="relative"
        overflow="hidden"
        whiteSpace="nowrap"
        css={css`
          & > span {
            display: inline-block;
            overflow: hidden;
            whiteSpace: nowrap;
            animation: ${typewriterAnimation} 4s steps(44) 1s forwards,
                       ${blinkCursorAnimation} 0.75s step-end infinite;
            }
            `}
      >
        <Text as="span">{children}</Text>
      </Box>
    );
};
