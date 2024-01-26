export default function MatrixRain() {
    
    function makeItRain(timeDelayToStart = (10 * 1000), timeDelayReveal = (10*100), clearDoc = false) {
      const characters = `日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789Z"'=:.+<>|_ç`;
      const length = 60;
  
      function makeLine() {
          const snippet = document.createElement('div');
          snippet.className = 'rain-drop';
          snippet.style.left = `${Math.round(Math.random() * 99)}%`;
          document.querySelector('#code').appendChild(snippet);
          let counter = 0;
          var i = setInterval(() => {
              snippet.innerHTML += characters[Math.round(Math.random() * (characters.length - 1))];
              counter++;
              if (counter > (length * .90)) { //starts the fade when 1 second is left
                  snippet.classList.add('fade-out');
              }
              if (counter > length) {
                  clearInterval(i);
                  snippet.remove();
              }
          }, 100);
      }
    
      function startRain() {
          makeLine();
          makeLine();
          makeLine();
          makeLine();
          makeLine();
    
          setInterval(() => {
              makeLine();
          }, 250);
    
          setTimeout(() => {
              document.querySelector('#message').style.display = 'inherit';
          }, timeDelayReveal);
      }
    
      if (clearDoc) setTimeout(() => {clearAndResetDoc(message)}, timeDelayToStart);
      setTimeout(startRain, timeDelayToStart + 100);
    }
    
    //makeItRain(0, 10 * 1000); // Delete this line to use all the code in the console
    
    makeItRain(10 * 1000, 10 * 1000, true); // Uncomment and use this when pasting all the code in the console
    
  
  
  const clearAndResetDoc = () => {
  
      return(
          document.body.innerHTML = `
          <style>
          body {
          background: black;
          overflow: hidden;
          }
  
          #code {
          font-family: 'ubuntu mono', monospace;
          background: black;
          height: 100vh;
          width: 100vw;
          }
  
          .rain-drop {
          position: absolute;
          top: 0;
          width: 1rem;
          writing-mode: vertical-lr;
          text-orientation: upright;
          white-space: nowrap;
          background: linear-gradient(transparent 10%, #008F11 50%, #00FF41 96%, white 3rem);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(1px 1px 1px #008F11);
          font-weight: bold;
          opacity: 1;
          transition: 1s ease-out;
          }
  
          .fade-out {
          opacity: 0;
          }
          </style>
          <div id="code"></div>`
      )
  
  }
  
  }