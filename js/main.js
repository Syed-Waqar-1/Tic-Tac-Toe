const selectPlayer = document.querySelector('#select_player');
const cross = document.querySelector('.cross');
const circle = document.querySelector('.circle');
const result = document.querySelector('#res');
const gameBody = document.querySelector('#game_body');
const restart = document.querySelector('#restart');
const check_combination =[
    // check rows side
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // check columns side
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // check diagonal side
    [0,4,8],
    [2,4,6]

]

let sPlayer;
selectPlayer.addEventListener('click',sp);

function sp(e){
    if(e.target.matches('i')){
        const key = e.target;

        sPlayer = key.textContent === 'X' ? true : false;
        selectedPlayer(sPlayer)  
        selectPlayer.removeEventListener('click',sp);      
}
}


gameBody.addEventListener('click',e=>{
     if(e.target.matches('button')){
        const key = e.target;

    // return if box having value    
     if(key.textContent !== '') return;
    //  return if player is not selected
     if(sPlayer == undefined) return;
    //  if result is shown player not turn moves 
     if(result.textContent !== '') return;
        
        const cp = sPlayer ? 'X' : "O";
        key.textContent = cp; 

        if(checkWin(cp)){ 
            if(cp === "X"){
              result.textContent = 'X is a Winner';
            }else {
                result.textContent = 'O is a Winner';                
            }
         }
        else if(isDraw()){
            result.textContent = 'Draw';
         }
        swapTurn();
}
});

restart.addEventListener('click',restartGame);

function selectedPlayer(sPlayer){
    if(sPlayer === true){
        cross.style.color = 'rgba(0, 0, 255, 0.7)'
    }else if(sPlayer === false){
        circle.style.color = 'rgba(255, 0, 55, 0.7)'
    }else{
        cross.style.color = 'white';
        circle.style.color = 'white';
    }
}
function checkWin(cp){
    return check_combination.some(combination => {
        return combination.every(index => gameBody.children[index].textContent === cp)
    }) 
}
function isDraw(){
    return [...gameBody.children].every(e => e.textContent != '')
}
function swapTurn(){
    sPlayer = !sPlayer;
}
function restartGame(){
    sPlayer = undefined;
    selectedPlayer(sPlayer);
    selectPlayer.addEventListener('click',sp);
    result.textContent = '';
    return [...gameBody.children].map(e => e.textContent = '')

}