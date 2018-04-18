/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    searchByName(people);
    break;
    case 'no':
    getTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}
function getTraits(people) {
  let userSearchChoice = prompt("Search by the following: height, weight, eye color, gender, age, occupation.");
  let filteredPeople = searchByTraits(people,userSearchChoice);
  let userSelection = selectPeople2(filteredPeople);
  let validUserInput = validateInput(userSelection,filteredPeople);
  let foundPerson = filteredPeople[validUserInput - 1];
  mainMenu(foundPerson, people);
}
function selectPeople(peopleTrain){
  let output  = "Please select a person (by number): \n";
  for(let i = 0; i < peopleTrain.length; i++){
    output += i+1 + " " + peopleTrain[i].firstName + " " + peopleTrain[i].lastName + '\n';
  }
    let result = prompt(output);
    return result;
}
function selectPeople2(peopleTrain){
  let output = peopleTrain.map(function(person, idx){
    return idx + 1 + ": " + person.firstName + " " + person.lastName;
  }).join("\n");
  let result = prompt(output);
  return result;
}
function validateInput(input,dataArray){
    let num = parseInt(input);
    if(Number.isInteger(num) && num <= dataArray.length){
      return num;
    } else{
      selectPeople(dataArray);
    }
}
function numberToString(number){
    if (!isNaN(number)){
      let result = number.toString();
      return result;
    }
    else{
      return false;
    }
}
function splitByDelimiter(input){
  let arrayResult = input.split(" ");
  return arrayResult;
}
function getCurrentYear() {
  let today = new Date();
  return today.getFullYear();
}
function getUserDate(input){
    let bDay = new Date(input);
    return bDay.getFullYear();
}
function dateDiff(dateinput){
  let ageResult = getCurrentYear() - getUserDate(dateinput);
  return numberToString(ageResult);
}
function searchByTraits(people,input) {
  let inputValues = splitByDelimiter(input);
  let criteriaToMeet = inputValues.length;
  let conditionsMetCounter = 0;
  let newArray = people.filter(function (el) {
    if(inputValues.includes(numberToString(el.height))) {
      conditionsMetCounter++;
    }
    if(inputValues.includes(numberToString(el.weight)))  {
      conditionsMetCounter++;
    }
    if(inputValues.includes(el.eyeColor)) {
      conditionsMetCounter++;
    }
    if(inputValues.includes(el.gender)) {
      conditionsMetCounter++;
    }
    if(inputValues.includes(dateDiff(el.dob))) {
      conditionsMetCounter++;
    }
    if(inputValues.includes(el.occupation)) {
      conditionsMetCounter++;
    }

    if (conditionsMetCounter === criteriaToMeet){
      conditionsMetCounter = 0;
      return el;
    }
    conditionsMetCounter = 0;
  });
  return newArray;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayFamily(person, people);
    break;
    case "descendants":
    displayDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  let result = getName(stringSanitizer(firstName),stringSanitizer(lastName),people);
  let foundPerson = result[0];
  mainMenu(foundPerson,people);
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person, people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + dateDiff(person.dob) + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
  mainMenu(person, people);
}
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function stringSanitizer(input){
  let result = input.toString().toLowerCase();
  return result;
}
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Our Code v
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
function getName(value1,value2,dataArray){
  let nameResultArray = [];
  nameResultArray = dataArray.filter(function(el){
    if((stringSanitizer(el.firstName) === value1) && (stringSanitizer(el.lastName) === value2)){
      return true;
    }
    else{
      return false;
    }
  });
  return nameResultArray;
}
function getSpouse (person, dataArray) {
	let spouse = [];
	for(i = 0; i < dataArray.length; i++) {
		if(person.currentSpouse === dataArray[i].id) {
			spouse.push(dataArray[i]);
		}
	} return spouse;
}
function getSiblings(person, dataArray, familyTrain) {
	for(let i=0; i < dataArray.length; i++) {
		for(let j = 0; j < (dataArray[i].parents).length; j++) {
			if(person === dataArray[i]) {
				break;
			}
			if(person.parents[j] === dataArray[i].parents[j]) {
			    familyTrain.push(dataArray[i]);
				break;
			}
		}
	} return familyTrain;
}
function getChildren (person, dataArray, familyTrain) {
	for(let i = 0; i < dataArray.length; i++) {
		for(let j = 0; j < (dataArray[i].parents).length; j++) {
			if(person.id === dataArray[i].parents[j]) {
				familyTrain.push(dataArray[i]);
				break;
			}
		}
	} return familyTrain;		
}
function getParents (person, dataArray, familyTrain) {
	for(let i = 0; i < dataArray.length; i++) {
		for(let j = 0; j < (person.parents).length; j++) {
			if(dataArray[i].id === person.parents[j]) {
				familyTrain.push(dataArray[i]);
				break;
			}
		}
	} return familyTrain;		
}
function getFamily(person, dataArray) {
	let spouseArray = getSpouse(person, dataArray);
	let siblingAndSpouse = getSiblings(person, dataArray, spouseArray);
	let sibSpouseChildren =getChildren(person, dataArray, siblingAndSpouse);
	let familyArray = getParents(person, dataArray, sibSpouseChildren);
	return familyArray;
}
function displayFamily(person, dataArray) {
	let familyArray = getFamily(person, dataArray);
	displayPeople(familyArray);
	mainMenu(person, dataArray);
}
function getDescendants (person, dataArray, descendantTrain = [0]) {
	let counter = descendantTrain[0];
	descendantTrain.shift();
	if(counter > descendantTrain.length) {
		return descendantTrain;
	}
	for(let i = 0; i < dataArray.length; i++) {
		for(let j = 0; j < (dataArray[i].parents).length; j++) {
			if(person.id === dataArray[i].parents[j]) {
				descendantTrain.push(dataArray[i]);
				break;
			}
		}
	} 
	counter++;
	descendantTrain.unshift(counter);
	return getDescendants(descendantTrain[counter], dataArray, descendantTrain);
	return descendantTrain;
}
function displayDescendants (person, dataArray) {
	let descendantArray = getDescendants(person, dataArray);
	if(descendantArray.length === 0) {
		alert("This person has no descendants");
	} else {
	displayPeople(descendantArray);
	}
	mainMenu(person, dataArray);
}