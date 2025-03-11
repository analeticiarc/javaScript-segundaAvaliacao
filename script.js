const redClass ="marked-red"
const blueClass="marked-blue"
const noPointerClass="no-pointer"

const buttons = document.querySelectorAll(".column")
const celulas = []

console.log({celulas})

let redTurn = true

//Lógica para cliar os botões
buttons.buttonsForEach(bnt => {
    bnt.addEventListener("click", ev => {
        bnt.classList.add(noPointerClass)

        if(redTurn){
            bnt.classList.add(redClass)
        }
        else{
            bnt.classList.add(blueClass)
        }

        checkGameWinner()
        redTurn = !redTurn
    })
})

//Lógica para checar o ganhador
function checkGameWinner(){
    if(redTurn){

    }
}