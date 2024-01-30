/**
 * Author Guyycodes
 */
import { chakra } from '@chakra-ui/react';
export function CustomUnderline_left_to_right({ children }) {
    /**  Under the Hood:
    1. chakra.span Component
        chakra.span is a Chakra UI component that is essentially a styled <span> element. It allows you to apply CSS and Chakra UI style props directly to the element.
    2. Pseudo-element ::before
        The ::before pseudo-element is used to create content before the content of the element. In this case, it's being used to create an underline effect.
        content: '""' is required for the pseudo-element to work. It indicates that there is no actual content, but we will style this "empty" content to create our visual effect (the underline).
    3. Positioning
        position: "relative" on the chakra.span makes it a positioning context for absolutely positioned elements inside it.
        position: 'absolute' on the ::before pseudo-element positions it in relation to the nearest parent with a non-static position (the chakra.span in this case).
        bottom: 0, left: 0, and right: 0 position the pseudo-element at the bottom of the chakra.span, stretching it across the width.
    4. Initial State of the Underline
        height: '2px' sets the thickness of the underline.
        bg: '#F2994A' sets the background color of the underline, which essentially is the color of the underline.
        width: 0 initially, the underline has zero width, making it invisible.
    5. Hover Effect
        _hover is a prop provided by Chakra UI that applies styles on hover.
        width: "full" under _hover changes the width of the ::before pseudo-element to full (100% of its parent) when the chakra.span is hovered over. This change in width from 0 to full creates the animation of the underline appearing.
    6. Transition
        transition: 'width 0.5s ease-in-out' applies a smooth transition effect to the width change. It dictates that the change in the width property (from 0 to full) should happen over 0.5 seconds, following an 'ease-in-out' timing function, which makes the start and end of the animation slower than the middle.
        */
            return (
                <chakra.span
                    position="relative"
                    _hover={{
                        '::before': {
                            width: "full" // or specific value if you want to control the underline length
                        }
                    }}
                    sx={{
                        '::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '4px', // Thickness of the underline
                            bg: '#ff00ff', // Color of the underline
                            width: 0, // Initial width
                            transition: 'width 0.5s ease-in-out'
                        }
                    }}
                >
                    {children}
              </chakra.span>
            );
          }

    export function CustomUnderline_middle_to_Edges({ children }) {
    return (
        <chakra.span
            position="relative"
            _hover={{
                '::before': { width: "full", left: "0" }, // Animate the before pseudo-element from the left
                '::after': { width: "full", right: "0" },  // Animate the after pseudo-element from the right
            }}
            sx={{
                '::before': createUnderlineStyle("left"),
                '::after': createUnderlineStyle("right"),
            }}
        >
            {children}
        </chakra.span>
    );
}

export function createUnderlineStyle(direction) {
    return {
        content: '""',
        position: 'absolute',
        bottom: '0',
        [direction]: '50%', // Starting position
        height: '2px',
        bg: '#F2994A',
        width: 0,
        transition: 'all 0.5s ease-in-out'
    };
}