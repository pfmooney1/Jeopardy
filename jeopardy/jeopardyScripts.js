/*eslint-env es6*/
/*eslint-env browser*/
var arrayOfQAPairs = [];
const errorMessage = document.getElementById("errorAlert");
const mainScreen = document.getElementById("mainScreen");
const questionScreen = document.getElementById("questionScreen");
const settingsScreen = document.getElementById("settingsScreen");
const userInputScreen = document.getElementById("userInputScreen");
const category1 = document.getElementById("cat1");
const category2 = document.getElementById("cat2");
const category3 = document.getElementById("cat3");
const category4 = document.getElementById("cat4");
const category5 = document.getElementById("cat5");
const category6 = document.getElementById("cat6");


function writeCategories(param){
    if (param === "reset") {
        category1.innerHTML = "A";
        category2.innerHTML = "B";
        category3.innerHTML = "C";
        category4.innerHTML = "D";
        category5.innerHTML = "E";
        category6.innerHTML = "F";
    }
    else if (param === "testRun") {
        category1.innerHTML = "History";
        category2.innerHTML = "Science";
        category3.innerHTML = "Foreign Lang.";
        category4.innerHTML = "Math";
        category5.innerHTML = "Geography";
        category6.innerHTML = "English";
    }
}

displayScreen(userInputScreen);

function categoryChange(id){
    document.getElementById(id).innerHTML = prompt("Chose a new category name:", "Vocab");
}
function displayScreen(target) {
    mainScreen.style.display ="none";
    settingsScreen.style.display ="none";
    questionScreen.style.display ="none";
    userInputScreen.style.display ="none";
    target.style.display = "block";
}
function hideAnswer(){
    document.getElementById("answerSpot").style.display = "none";
    document.getElementById("answerHider").style.display = "block";
    document.getElementById("seeAnswer").style.display = "inline-block";
}
function inputTheQuestions(){
    arrayOfQuestions = [];
    var questions = document.getElementById("userQuestions").value;
    questions = questions.trim();
    if (questions.length < 1) {
        errorMessage.style.display = "inline-block";
    }
    else {
        var arrayOfQuestions = questions.split(/\n/);
        arrayOfQuestions = arrayOfQuestions.filter(hasContent);
        function hasContent(value){
            return value.length > 0;
        }
        function NewQAPair(x) {
            let divideSpot = x.indexOf("?");
            this.question = x.slice(0, divideSpot + 1).trim();
            this.answer = x.slice(divideSpot + 1).trim();
        }  
        while (arrayOfQAPairs.length < 30) {
            for (let i = 0; i < arrayOfQuestions.length; i++) {
                const newQuestion = new NewQAPair(arrayOfQuestions[i]);
                arrayOfQAPairs.push(newQuestion);
            }; 
        }
        displayScreen(mainScreen);
        errorMessage.style.display = "none";
    }
}
function resetGame() {
    let text;
    if (confirm("Are you sure?") == true) {
        writeCategories("reset");
        arrayOfQAPairs = [];
        var allGameSquares = document.getElementsByClassName("questionLabel");
        for (let i = 0; i < allGameSquares.length; i++) {
            allGameSquares[i].style.visibility = "visible";
        }
    document.getElementById("userQuestions").value = 
`How do you add questions? Copy-paste Q/A pairs like this:
Founding of America? 1776
Battle of Hastings? 1066
How do you change category names? Click on them.`
        displayScreen(userInputScreen);
    }

}
function seeAnswer() {
    document.getElementById("answerSpot").style.display = "block";
    document.getElementById("answerHider").style.display = "none";
    document.getElementById("seeAnswer").style.display = "none";
}
function selectIt(id) {
    document.getElementById(id).style.visibility = "hidden";
    writeQandA(id);
    displayScreen(questionScreen);
}
function testRun(){
    resetGame();
    let questions = 
`When was America founded? 1776
Who was the first president? George Washington
AD is short for? Anno Domini
When was the Battle of Hastings? 1066
Who was the second president? John Adams

Who created the periodic table? Dmitri Mendeleev
What is a molecule? a group atoms held together by chemical forces.
True or false: protons are positive? True 
What are the 3 parts of an atom? Proton, neutron and electron 
Do elements on the periodic table increase by atomic mass? Yes

What is "comer" in Spanish? To eat
What does "novus" mean in Latin? New
Translate this Spanish word "beber" in English? To drink
What does ‘phonos’ mean in Greek? Sound 
What is “sleep” in German? schlafen 

5 + 5? 10
5 X 5? 25
5 / 1? 5
5 X 55? 275
5 X 555? 2,775

Is the United States in the northern hemisphere or the southern? Northern
Which is the largest US state? Alaska 
On which continent is the country Zimbabwe found? Africa 
Which country’s capital is Paris? France 
Which country is home to the Taj Mahal? India 

Which is the verb: run or racetrack? Run
What do we do to the first letter of a proper noun? Capitalize it 
What are all the articles in English language? The, a, an 
What is a noun? A person place, or thing
What is the adverb in this sentence- The girls quickly ran to the store.? Quickly`;
    document.getElementById("userQuestions").value = questions;
    writeCategories("testRun");
}

function writeQandA(chosenID, arrayOfQuestions) {
    hideAnswer();
    let questionToUse = chosenID.slice(chosenID.indexOf("n") + 1);
    questionToUse = parseInt(questionToUse);
    let chosenQuestion = arrayOfQAPairs[questionToUse].question;
    let chosenAnswer = arrayOfQAPairs[questionToUse].answer;
    console.log(chosenQuestion);
    console.log(chosenAnswer);
    document.getElementById("questionSpot").innerHTML = chosenQuestion;
    document.getElementById("answerSpot").innerHTML = chosenAnswer;
    document.getElementById("questionValue").innerHTML = document.getElementById(chosenID).innerHTML;
}