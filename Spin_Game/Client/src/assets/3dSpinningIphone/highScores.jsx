import { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, List, ListItem, Text, VStack, Flex, useBreakpointValue, Checkbox, Link, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

function ScoresBoard({ speed, mph, phoneModel, setPhoneModel }) {
  const boxPosition = useBreakpointValue({ base: 'center', sm: 'center', md: 'right', lg: 'right' });
  const mountRef = useRef();
  const [email, setEmail] = useState('');
  const [highScoresMPH, setHighScoresMPH] = useState([]);
  const [highScoresRPM, setHighScoresRPM] = useState([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentScore, setCurrentScore] = useState({ mph: 0, rpm: 0 });
  const [mostRecentScore, setMostRecentScore] = useState({ mph: 0, rpm: 0 });
  const [isSpinning, setIsSpinning] = useState(false);  // keeps track of whether the spin is currently in progress.
  const angularSpeedRPM = speed * (60 / (2 * Math.PI));  // Convert rad/s to RPM
  const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//       const interval = setInterval(checkScores, 60 * 1000); // checks every 60 seconds
  
//       // Cleanup function to clear the interval when the component unmounts
//       return () => clearInterval(interval);
//     }, [angularSpeedRPM, mph]);

useEffect(() => {
    const spinThreshold = 0.001;
    
    console.log(`Current Speed: ${speed}, isSpinning: ${isSpinning}`);
    
    if (speed > spinThreshold && !isSpinning) {
      setIsSpinning(true);
      setCurrentScore({ mph: 0, rpm: 0 });
    }
  
    if (isSpinning) {
      setCurrentScore(prevScore => ({
        mph: Math.max(prevScore.mph, mph),
        rpm: Math.max(prevScore.rpm, angularSpeedRPM)
      }));
    }
  
    if (speed <= spinThreshold && isSpinning) {
      setIsSpinning(false);
      setIsModalOpen(true); // Open the modal instead of using confirm
    }
  }, [speed, mph, angularSpeedRPM, isSpinning]);
  // need to know when speed becomes 0 to update the most recent score and reset the current score.
      

  function checkScores() {
    // Check top MPH scores
    if (mph > highScoresMPH[highScoresMPH.length - 1]?.score) {
      const newScoreMPH = { email: 'Automatic', score: mph };
      setHighScoresMPH((scores) => [...scores, newScoreMPH]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10));  // only keep top 10 scores
    }

    // Check top RPM scores
    if (angularSpeedRPM > highScoresRPM[highScoresRPM.length - 1]?.score) {
      const newScoreRPM = { email: 'Automatic', score: angularSpeedRPM };
      setHighScoresRPM((scores) => [...scores, newScoreRPM]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10));  // only keep top 10 scores
    }
  }

    // placeholder for the actual IndexedDB operations
    function saveToIndexedDB(data) {
        // This should contain the actual operations to save to the IndexedDB
        // But for now, it just logs the data to the console
        console.log('Saving to IndexedDB:', data);
        // Placeholder for API call:
        fetch('endEndpointHere', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

  function submitScore() {
    if (!acceptTerms) {         // for terms an conditions to keep emails
      alert('You need to accept the terms and conditions');
      return;
    }
      // High scores for MPH
    if (highScoresMPH.length < 5 || currentScore.mph > highScoresMPH[highScoresMPH.length - 1].score) {
    const newScoreMPH = { email, score: currentScore.mph };
    setHighScoresMPH((scores) => [...scores, newScoreMPH] // set the score in the array of scores
      .sort((a, b) => b.score - a.score)                  // sort the list
      .slice(0, 5));                                      // only keep top 5 scores
    }
      // High scores for RPM
    if (highScoresRPM.length < 5 || currentScore.rpm > highScoresRPM[highScoresRPM.length - 1].score) {
    const newScoreRPM = { email, score: currentScore.rpm };
    setHighScoresRPM((scores) => [...scores, newScoreRPM]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5));  // only keep top 5 scores
    }

    //  function placeholder for the actual IndexedDB operation saveToIndexedDB()
    saveToIndexedDB({ highScoresMPH, highScoresRPM });

      // Reset current score
    setCurrentScore({ mph: null, rpm: null });
  }

  const handleModalClose = (confirm) => {
    setIsModalOpen(false);
    if (confirm) {
      setMostRecentScore(currentScore);
    }
  };
  
  return (  
    <>
    <Flex alignItems="center" justifyContent="center" flexDirection={{ base: 'column', md: 'row' }}>
      <Box as="main" height="100vh" width="100vw" ref={mountRef} />
      <VStack
          ml={{ base:"2rem", md: 0 }}
          mt={{ base: "1rem", md: 0 }}
          position="absolute"
          top={{ base: "auto", md: "10px" }}
          right={{ base: "auto", md:"10px" }}
          spacing={4}
          bg="gray.100" // Light background color
          p={4} // Padding
          borderRadius="lg" // Rounded corners
          boxShadow="xl" // Shadow effect
      >
        <Box border="1px" padding="1">
        <Text color="gray.700" fontWeight="bold" letterSpacing="wider" lineHeight="tall">{isSpinning ? "Spin in progress... Scores evaluated when object is stationary." : "Spin complete."}</Text>
          <Text>Realtime Spin Result:</Text>
          <Text>Rotation: {angularSpeedRPM.toFixed(2)} RPM</Text>
          <Text>Speed: {mph.toFixed(2)} mph</Text>
          <Text>This Turn:</Text>
            <Text>RPM: { currentScore.rpm ? currentScore.rpm.toFixed(2) : "N/A" }</Text>
            <Text>MPH: { currentScore.mph ? currentScore.mph.toFixed(2) : "N/A" }</Text>
            <Text>Last Turn:</Text>
            <Text>RPM: { mostRecentScore.rpm ? mostRecentScore.rpm.toFixed(2) : "N/A" }</Text>
            <Text>MPH: { mostRecentScore.mph ? mostRecentScore.mph.toFixed(2) : "N/A" }</Text>
        </Box>
        <Box>
          <Text>Select something to spin: <u>Then click 🖱️ & spin it..⏳</u></Text>
          <Select value={phoneModel} onChange={(e) => setPhoneModel(e.target.value)}>
            <option value="iPhone15_proMax">iPhone 15 proMax</option>
            <option value="SamsungS22_Ultra5G">Samsung S22 Ultra5G</option>
            <option value="Google_Pixel6">Google Pixle 6</option>
          </Select>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email..." />
          <Checkbox isChecked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}>
            I accept the <Link href="/terms">Terms & Conditions</Link>
          </Checkbox>
          {/* disable button condition to check if currentScore.mph and currentScore.rpm are null: */}
          <Button m={1} boxShadow="xl" borderRadius="lg" bg="blue.200" onClick={submitScore} disabled={isSpinning || currentScore.mph === 0 || currentScore.rpm === 0}>Submit Score</Button>
        </Box>
        <Box border="1px" padding="2">
          <Text>High Scores (MPH):</Text>
          <List>
            {highScoresMPH.map((score, i) => (
              <ListItem key={i}>{score.email}: {score.score.toFixed(2)} mph</ListItem>
            ))}
          </List>
          <Text>High Scores (RPM):</Text>
          <List>
            {highScoresRPM.map((score, i) => (
              <ListItem key={i}>{score.email}: {score.score.toFixed(2)} RPM</ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Flex>

    <Modal isOpen={isModalOpen} onClose={() => handleModalClose(false)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Confirm Score</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Do you want to keep this score?</Text>
        <Text fontSize="lg" mt={4}>
          Speed: {currentScore.mph.toFixed(2)} mph
        </Text>
        <Text fontSize="lg">
          Rotation: {currentScore.rpm.toFixed(2)} RPM
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => handleModalClose(true)}>
          Yes
        </Button>
        <Button variant="ghost" onClick={() => handleModalClose(false)}>
          No
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </>
  );
  
}

export default ScoresBoard;
