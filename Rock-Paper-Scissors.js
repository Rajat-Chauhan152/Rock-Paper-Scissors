let score=JSON.parse(localStorage.getItem('score'));

if(!score){
    score={ 
        wins:0,
        loses:0,
        ties:0
    };
}
updateScoreElement();

let isAutoPlaying=false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(function(){
            const playerMove=f1();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}

document.body.addEventListener('keydown', (event) =>{
    if(event.key==='r'){
        playGame('Rock');
    }else if(event.key==='s'){
        playGame('Scissors');
    }else if(event.key==='p'){
        playGame('Paper');
    }
});

function playGame(playerMove){
    const computer=f1();
    let result='';

    if (playerMove==='Scissors'){
        if(computer==='Rock')
            result='You lose.';
        else if(computer==='Paper')
            result='You win.';
        else if(computer==='Scissors')
            result='Tie.';
    }

    else if(playerMove==='Paper'){
        if(computer==='Rock')
            result='You win.';
        else if(computer==='Paper')
            result='Tie.';
        else if(computer==='Scissors')
            result='You lose.';
    }
    
    else if(playerMove==='Rock'){
        if(computer==='Rock')
            result='Tie.';
        else if(computer==='Paper')
            result='You lose.';
        else if(computer==='Scissors')
            result='You win.';
    }

    if(result==='You win.') 
        score.wins++;
    else if(result==='You lose.')
        score.loses++;
    else if(result==='Tie.')
        score.ties++;

localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML=result;

document.querySelector('.js-moves').innerHTML
= `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computer}-emoji.png" class="move-icon">
Computer`;
    
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function f1(){
    const random = Math.random();
    let computer = '';
    if (random>=0 && random<1/3)
        computer = 'Rock';
    else if(random>=1/3 && random<2/3)
        computer = 'Paper';
    else if(random>=2/3 && random<1)
        computer = 'Scissors';

    return computer;
}