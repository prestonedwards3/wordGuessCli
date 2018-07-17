var inquirer = require("inquirer");
var Word = require('./word.js')
var isLetter = require('is-letter');


let wins = 0;
let losses = 0;
let rando = "";
let compWord = "";
let guessesRemaining = 12;
let userGuess = ""; 
let lettersGuessed = "";
let lettersGuessedArr = [];
let slotsFilled = 0;
let guessedCorrectly = false;

function startGame(){
	//Reset number of guesses remainingm when user starts a new game.
	guessesRemaining = 12;
	//Pick random word from word list.
	generateWord();
	//When game is reset, empty out list of already guessed letters.
	lettersGuessed = "";
	lettersGuessedArr = [];
}


function generateWord() {
    var wordArray = ['football', 'computer', 'javascript', 'software', 'apple', 'towel', 'shirt', 'desk', 'suite', 'sticky', 'shoes', 'pencil'];
    rand = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase();
    compWord = new Word (rand); 
    compWord.splitWord()
    compWord.generateLetters(); 
    guessLetter(); 
    console.log(`Your word contains ${compWord.lettersArr.length} letters.`) 
}

var guessLetter = () => {
    if (slotsFilled < compWord.lettersArr.length || guessesRemaining > 0){
        inquirer.prompt([
            {
                name: 'letter',
                message: 'Guess a letter:',
                validate: function(value) {
                    if(isLetter(value)){
                        return true;
                    } else {
                        return false; 
                    }
                }
            }
        ]).then(function(guess){
            guess.letter.toLowerCase();
            if (lettersGuessedArr.indexOf(guess.letter.toLowerCase()) > -1) {
                console.log("You already guessed that letter guy! Try a new one...")
                guessLetter(); 
            } else if (lettersGuessedArr.indexOf(guess.letter.toLowerCase()) === -1) {
                lettersGuessed += ` ${guess.letter.toLowerCase()}`; 
                lettersGuessedArr.push(guess.letter.toLowerCase());
                console.log(`You have already guessed: ${lettersGuessed}`)
                for (i = 0; i < compWord.lettersArr.length; i++){
                    if (guess.letter.toLowerCase() === compWord.lettersArr[i].character && compWord.lettersArr[i].guessed === false){
                        compWord.lettersArr[i].guessed === true;
                        guessedCorrectly = true;
                        compWord.blanks[i] = guess.letter.toLowerCase();
                        slotsFilled++;
                    }
                }
                console.log("Word to guess:");
                compWord.splitWord();
                compWord.generateLetters;

                if(compWord.lettersArr.guessed){
                    console.log("Correct!");
                    checkIfUserWon();
                }
                else {
                    console.log("Incorrect!");
                    guessesRemaining--;
                    console.log(`You have ${guessesRemaining}!`)
                    checkIfUserWon();
                }
            }
        });
    }

}

function checkIfUserWon(){
    if (guessesRemaining === 0){
        console.log("You lost! Better luck next time guy!");
        console.log(`The correct word was ${rand}`); 
        losses++;
        console.log(`Wins: ${wins}`);
        console.log(`Losses: ${losses}`);
        playAgain();
    }
    else if (slotsFilled === compWord.lettersArr.length){
        console.log("You Win!");
        wins++;
        console.log(`Wins: ${wins}`);
        console.log(`Losses: ${losses}`);
        playAgain();
    }
    else {
        guessLetter("");
    }
}

function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];
    inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
            lettersGuessed = "";
            lettersGuessedArr = [];
            slotsFilled = 0;
            console.log("New Game");
            startGame();
        }
        else {
            console.log("See you later");
            return;
        }
    });
}


startGame();
//console.log(rand);
//console.log(compWord);
