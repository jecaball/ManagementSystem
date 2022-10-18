/* Initialization of the date object 
It will be used for the creation of the
table where all the information is displayed*/


import DateTable from "./DateTable.js";
//gets the actual date for construct the table
const actualDate= new Date();

//create a new DateTable-oject for the construction of the table
const newTable =new DateTable(actualDate.getFullYear(),actualDate.getMonth());

//modifies the days in the table. The idea is to get the days of the actual month
newTable.modifyTableDays();

//modifies the month in the table. The idea is to get the actual month
newTable.modifyTableMonth();

//searches for the buttons back and forward in order to add them an event listener
var back = document.querySelectorAll("input.button").item(4);
var forward=document.querySelectorAll("input.button").item(5);

//creates an event listener for the back button
back.addEventListener("click",()=> {
    newTable.setMonth(newTable.getMonth()-1);
    newTable.modifyTableDays();
    newTable.modifyTableMonth();
    newTable.callDataBaseInformation();
},false);

//creates an event listener for the forward button
forward.addEventListener("click",()=> {
    newTable.setMonth(newTable.getMonth()+1);
    newTable.modifyTableDays();
    newTable.modifyTableMonth();
    newTable.callDataBaseInformation();
},false);

/*----------------------change of topic -----------------------*/
//imports the class Members for the handling of the participants
import Members from "./Members.js";

//searches for the buttons add and delete. They are used to add and delete members
var add= document.querySelectorAll("input.button").item(0);
var delet= document.querySelectorAll("input.button").item(1);


//creates an instance of the class Members
const newMember = new Members();

//adds an event listener for clicking on the button add
add.addEventListener("click",() =>{

    
    //set the lastname, name, and ID of the employee
    newMember.setLastName();
    newMember.setName();
    newMember.setId();
    
    newMember.mySQLCallEntries();
    //adds a new entry in the database
    newMember.mySQLAddEntries();
    
    console.log(newMember.data);
    //adds a new member to the select list of the members form
    newMember.modifyAddForm();
    
    //adds assignees to the selection list in activities form
    newMember.modifyAddAssignees();
},false).then()


//adds an event listener for clicking on the button delete
delet.addEventListener("click", () =>{

    //creates an instance of the class Members
    const newMember = new Members();

    //deletes a member from the selection list located in the Add & Delete members
    newMember.modifyDeleteForm()

    //updates the member in the asignee list of the form activities
    newMember.modifyAddAssignees();

    delete window.newMember
},false)

/*---------------------change of topic---------------------*/
//imports Activity.js
import Activity from "./Activity.js";

//selects all the input types in the activities form
var act= document.querySelectorAll('input.activities, select.activities');

//selects button add (activities) in order to add an event listener
var addActivities= document.querySelectorAll('input.button').item(2);

//creates an instance of the class activity


//event listener for the button add(activities)
addActivities.addEventListener("click", () =>{
    const Activities = new Activity();
    //fills up the information for the object Activities
    Activities.setProject(act.item(0).value);
    Activities.setAssignee(act.item(1).value);
    Activities.setStart(act.item(2).value);
    Activities.setFinish(act.item(3).value);
    Activities.setPriority(act.item(4).value);
    Activities.setHours(act.item(5).value);
    Activities.setDescription(act.item(6).value);
    
    Activities.addActivityTable(newTable.getDays(),newTable.getMonth(),newTable.getYear());
}, false)

//selects the button delete from activitities
var deleteActivities = document.querySelectorAll("input.button").item(3);

// adds an event listener for the click event in order to delete the selected option        
deleteActivities.addEventListener("click", ()=> {

    //calls the function deleteActivityTable to delete the selected option from the database and from the option list
    Activities.deleteActivityTable();
    
}, false)


