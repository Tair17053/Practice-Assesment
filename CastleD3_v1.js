// JavaScript Document
alert("JS is attached!");
 
//function outputs the room and price details to the room information table
function updateRoom() {
	alert("Update Room function is working!");
	var room = this.dataset.name;
	alert("You have chosen to reside within the " + room); //test alerts
	var price = 0;
	price = this.dataset.price;
	alert("The cost of this room per night is: $" + price); //test alerts
	
	roomOutput.innerHTML = room; //output to the divs in html
	priceOutput.innerHTML = price; 
	
}

//function outputs the dates to the room information table
//also calls checkInputs function to output length of stay to information table
function dateNight() {
	alert("The dateNight function is now working!"); //test alert
	var date = document.getElementById("datein").value;
	alert("Your selected check in date is: " + date); //test alerts
	
	//messages to the user whether their date is valid or not
	if ( document.getElementById("datein").validity.valueMissing) {
	alert ("Please enter a valid check in date! You haven't entered anything.");
	return; 
	}
	else {
	alert ("I have checked your date and it is valid!");
	}	
	
	checkInputs(); //calls checkInputs function 
	
	datesOutput.innerHTML = date;
}

//function ensures the number of nights entered is valid
function checkInputs(){ 
	alert("The checkInputs function is now running!");
	var nights = document.getElementById("numberNights").value;
	alert("The number of nights you have decided to stay is: " + nights); //test alerts
	if (nights == ""){ //if the user entered nothing
		alert("You need to enter a valid number of nights (up to ten).");
		alert("Remember you cannot enter letters or symbols!");
		stay.style.backgroundColor = 'pink'; //makes the box red to signal to the user an error
		return; //stops the function from running - put an inline message output div in
	}
	else if (document.getElementById('numberNights').validity.rangeOverflow || document.getElementById('numberNights').validity.rangeUnderflow){
		//if value entered is above or below parameters
		alert("You need to enter a valid number of nights (up to ten).");
		alert("Remember you cannot enter letters or symbols!");
		stay.style.backgroundColor = 'pink';
		return;	 
	}
	else {
		alert("Thank you, your stay will be appreaciated!"); //test alert
		nightsOutput.innerHTML = nights; //only outputs the nights when the input is valid
		stay.style.backgroundColor = 'lightGreen';
		return;
	}
}

//function calculates the cost of extras
function extraCalc() {
	alert("The extraCalc function is now working!"); //test alert
	//calculates total cost of extra items
	var addItems = document.getElementsByClassName('addCheck');
	var checkedAddItems = [];
	var addCost = 0;
	for ( var i = 0; i < addItems.length; i++ ){
		if ( addItems[ i ] .checked ){
			checkedAddItems.push( ' ' + addItems[ i ].value );
			addCost += Number(addItems[ i ].dataset.price );
			alert(addCost); //test prints the total prices that are added
		}
	}
	
	outputDIV.innerHTML = checkedAddItems + "		Total cost: $" + addCost;  //adds the total cost of the extras to its own div	
	extrasOutput.innerHTML = addCost;
	
	totalCost(addCost);
}
 
//function calculates the total cost of everything as well
//also calculates the cost of nights * room
//outputs both costs to the room information table
function totalCost(addCost) {
	alert("The totalCost function is now working!"); //test alert
	var price = document.getElementById('priceOutput').innerHTML;
	var nights = document.getElementById('nightsOutput').innerHTML;
	
	var nightsCost = price * nights;
	alert("nightsCost value is: $" + nightsCost);//test alert
	var everyCost = nightsCost + addCost;
	alert("everyCost value is: $" + everyCost);//test alert
	
	nightCostOutput.innerHTML = nightsCost;
	totalOutput.innerHTML = everyCost;
}



//function validates names
function validateName(){
	alert("validateName function is running!");
    var regName = /^[a-zA-Z0-9]+$/;
    var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
    if (fname==null || fname=="" || lname==null || lname==""){
		alert("Error: names can't be blank!");
    }else if (!regName.test(lname && fname)){
		alert('Valid names given!');
		fnameOutput.innerHTML = fname;
		lnameOutput.innerHTML = lname;
		return;
    }else {
		alert('Please enter your names correctly! (first & last name) \nDo not use symbols or numbers!');
	}
}

//function validates cellphone numbers
function phonenumber(){
  alert("phonenumber function is running");	
  var phoneno = /^\d{10}$/;
  var inputnum = document.getElementById('fnumba').value;	
  if(inputnum.match(phoneno)){
	  alert("Valid phone number!");
	  cellOutput.innerHTML = inputnum;
      return;
   }else{
       alert("Invalid phone number! \nPlease do not use letters or symbols! \nAlso ensure that you have entered ten digits, no more, no less.");
     }
}

//function validates email
function ValidateEmail(){
	alert("ValidateEmail function is running");
	var validmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = document.getElementById('mail').value;
	if (email.match(validmail)){
		alert("Valid email!");
		mailOutput.innerHTML = email;
		return;
	}else{
		alert("The email you have entered is invalid!")
	}
}




//event listener that activates when a confirm button is clicked
var extraInputs = document.getElementsByClassName('submitButton');
for (i = 0; i < extraInputs.length; i++) {
	extraInputs[i].addEventListener('click', dateNight);
	extraInputs[i].addEventListener('click', extraCalc);
}

var nameInputs = document.getElementsByClassName('Button');
for (i = 0; i < extraInputs.length; i++) {
	nameInputs[i].addEventListener('click', validateName);
	nameInputs[i].addEventListener('click', phonenumber);
	nameInputs[i].addEventListener('click', ValidateEmail);
}


//event listener that will call the update room function if a card is clicked
var roomInputs = document.getElementsByClassName('Overlay');
for (i = 0; i < roomInputs.length; i++) {
	roomInputs[i].addEventListener('click', updateRoom);
}



//creating variables to check the date select is only a present date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
	dd = '0' + dd;
}

if (mm < 10) {
	mm = '0' + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("datein").setAttribute("min", today);

