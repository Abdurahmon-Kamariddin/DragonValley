//I aim to make an array of objects (users) where it will go in descending order of the users' scores
const userArray = [];

for (let i = 0; i < localStorage.length; i++) {
    const username = localStorage.key(i);
    const usrObj = JSON.parse(localStorage.getItem(username));
    if (usrObj && usrObj.score !== undefined) {
        //Check if usrObj is defined and contains a score
        const user = {
            username: username,
            score: usrObj.score
        };
        userArray.push(user); //We add that user and their score into our array
    }
}
//Sort the array based on scores
userArray.sort((a, b) => b.score - a.score); //Here we use the user objects scores to sort from their scores and not their names in descending order

//we can go about storing them in each row in our table by making an array comprised of each row
let number = [
  {
    name: document.getElementById('name1'),
    score: document.getElementById('score1')
 },
  {
    name: document.getElementById('name2'),
    score: document.getElementById('score2')
 },
  {
    name: document.getElementById('name3'),
    score: document.getElementById('score3')
 },
  {
    name: document.getElementById('name4'),
    score: document.getElementById('score4')
 },
  {
    name: document.getElementById('name5'),
    score: document.getElementById('score5')
 },
  {
    name: document.getElementById('name6'),
    score: document.getElementById('score6')
 },
  {
    name: document.getElementById('name7'),
    score: document.getElementById('score7')
 },
  {
    name: document.getElementById('name8'),
    score: document.getElementById('score8')
 },
  {
    name: document.getElementById('name9'),
    score: document.getElementById('score9')
 },
  {
    name: document.getElementById('name10'),
    score: document.getElementById('score10')
 }
]
let table = document.getElementById("resultstable");
//iterates through our table and updates the rankings with all the users scores in descending order
if (userArray >= 10) {
  for (let i = 0; i < 10; i++) {
    number[i].name.innerText = userArray[i].username;
    number[i].score.innerText = userArray[i].score;
}} else {
  for (let i = 0; i < userArray.length; i++) {
    number[i].name.innerText = userArray[i].username;
    number[i].score.innerText = userArray[i].score;
  }
 }


//Displays the person in first place
document.getElementById('topdragon').innerHTML = userArray[0].username;