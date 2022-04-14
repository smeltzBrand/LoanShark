
//Step ONE - controller accept requests
function getMessage(){

    let msg = document.getElementById("txtMessage").value;

    displayMessage(msg);

}


//Final Step - view
function displayMessage(message) {
    
    //first get the ol element from the page
    element = document.getElementById("results");
    
    //next create a new li element
    let item = document.createElement("li");
    //add classes to the li element
    item.classList.add("list-group-item");
    //set the message for the li element
    item.innerHTML = message;

    //add the new item to the list
    element.appendChild(item);

}