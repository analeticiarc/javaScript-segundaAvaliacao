//declarando as constantes das classes com CSS
const pinkClass = "marked-pink"; //cor do jogador rosa
const cianoClass= "marked-ciano"; //cor do jogador ciano
const noPointerClass="no-pointer"; //impede que o mesmo botão seja clicado mais de uma vez

const buttons = document.querySelectorAll(".column");
const statusText = document.querySelector("p");


//montando a matriz (usando for)
const celulas = [];

for (let i = 0; i < 7; i++) {
    celulas.push([]);
    for (let j = 0; j < 7; j++) {
      celulas[i].push(buttons[i * 7 + j]);
    }
  }

//controle da vez do jogador
let pinkTurn = true;

//Lógica para clicar os botões
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains(noPointerClass)) return;
  
      btn.classList.add(noPointerClass);
  
      if (pinkTurn) {
        btn.classList.add(pinkClass);
      } else {
        btn.classList.add(cianoClass);
      }
  
      if (checkGameWinner && checkGameWinner()) {
        setTimeout(() => {
          alert(`${pinkTurn ? "Rosa" : "Ciano"} venceu!`);
          resetGame(); 
        }, 10);
        return;
      }
  
      pinkTurn = !pinkTurn;
      statusText.textContent = pinkTurn ? "Vez do Jogador Rosa" : "Vez do Jogador Ciano";
  
      statusText.classList.remove("marked-pink", "marked-ciano");
      statusText.classList.add(pinkTurn ? "marked-pink" : "marked-ciano");


      if ([...buttons].every(button => button.classList.contains(noPointerClass))) {
        setTimeout(() => {
            alert("O jogo terminou em empate!");
            resetGame();
        }, 10);
        return;
    }
    });
  });

//Lógica para checar o ganhador
function checkGameWinner() {
    const checkDirection = (x, y, dx, dy, color) => {
      let count = 0;
      for (let i = 0; i < 4; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7 && celulas[nx][ny].classList.contains(color)) {
          count++;
        } else {
          break;
        }
      }
      return count === 4;
    };
  
    const color = pinkTurn ? pinkClass : cianoClass;
  
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          checkDirection(i, j, 1, 0, color) ||
          checkDirection(i, j, 0, 1, color) ||
          checkDirection(i, j, 1, 1, color) ||
          checkDirection(i, j, 1, -1, color)  
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //resetar o jogo quando um jogador ganhar
  function resetGame() {
    buttons.forEach(btn => {
      btn.classList.remove(pinkClass, cianoClass, noPointerClass);
    });
  
    pinkTurn = true;
  
    statusText.textContent = "Vez do Jogador Rosa";
    statusText.classList.remove("marked-ciano");
    statusText.classList.add("marked-pink");
  }