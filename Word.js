/* Contains a constructor, Word that depends on the Letter constructor. This is used to 
create an object representing the current word the user is attempting to guess. That means 
the constructor should define:

  * An array of `new` Letter objects representing the letters of the underlying word

  * A function that returns a string representing the word. This should call the function on each 
  letter object (the first function defined in `Letter.js`) that displays 
  the character or an underscore and concatenate those together.

  * A function that takes a character as an argument and calls the guess function 
  on each letter object (the second function defined in `Letter.js`)

  */
 var Letter = require('./letter.js');


  var Word = function(word) {
    this.word = word; //this should be an array of new letter objects
    this.lettersArr = [];
    this.blanks = [];
    this.splitWord = function(){
            this.lettersArr = this.word.split("");
            numBlanksNeeded = this.lettersArr.length;
            console.log(this.blanks.join(" "))

        }

    this.generateLetters = function(){
        for (var i = 0; i < this.lettersArr.length; i++){
            this.lettersArr[i] = new Letter(this.lettersArr[i]);
            
         }
    }
};

  
module.exports = Word;
  console.log("synced up");

