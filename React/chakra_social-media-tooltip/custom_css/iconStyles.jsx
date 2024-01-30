export const IconStyle = {
    position: "relative",
    bg: "white",
    borderRadius: "50%",
    p: "15px",
    m: "10px",
    w: "50px",
    h: "50px",
    fontSize: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.4)",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    _hover: {
        '& .tooltip': {
            top: "-45px",
            opacity: 1,
            visibility: "visible",
            pointerEvents: "auto",
        },
        '& span': {
            textShadow: "0px -1px 0px rgba(0, 0, 0, 0.1)",
        },
        '&.instagram': {
            bg: "#E4405F",
            color: "white",
            '& .tooltip, & .tooltip::before': {
                bg: "#E4405F",
                color: "white",
            },
        },
        '&.github': {
            bg: "#333333",
            color: "white",
            '& .tooltip, & .tooltip::before': {
                bg: "#333333",
                color: "white",
            },
        },
    }
  };