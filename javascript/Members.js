/**class member */
//imports webSocket to make a connection with the back end
import webSocket from "./webSocket.js";

//creates a class

class Members {
    //constructor of the class Members
    constructor(
        name,
        lastname,
        id
    ){
        //defines parameters
        this.name=name;
        this.lastname=lastname;
        this.id=id;
        this.data=[];
    }
    
    //returns the name of the employee
    getName(){
        return this.name;
    }
    //sets the name of the employee by searching on the webpage
    setName(){
        [this.name ,]=this.contentText(0);
    }

    //returns the lastname of the employee
    getLastName(){
        return this.lastname;
    }
    //sets the lastname of the employee
    setLastName(){
       [this.lastname, ]=this.contentText(1);
    }

    //returns the ID of the employee
    getId(){
        return this.id;
    }
    //sets the ID of the employee
    setId(){
        [this.id, ] =this.contentText(2);
    }    

    //searches and defines the object of modification
    contentText(i){
        //selects all the input fields of the add and delete member form
        let classAdd= document.querySelectorAll("input.add");
        try {
            classAdd.forEach(element =>{
                if (element.value== ""){
                    throw console.error();;
                }
            });
            return [classAdd.item(i).value , classAdd];
        } catch (error) {
            alert("fill up all the fields")
        }
    }

    //adds entries to database
    mySQLAddEntries(){
        // creates the local variable toSend and defines it as string with the information to be sent in the database-backend
        let toSend=`INSERT INTO "members",${this.getName()},${this.getLastName()},${this.getId()}`;
        //sends the instruction to add an entry to the database
        webSocket.send(toSend);
    }

    //deletes entries of the database
    mySQLDeleteEntries(ID){
        // creates the local variable toSend and defines it as string with the information to be sent in the database-backend
        let toSend=`DELETE FROM "members" WHERE id = ${ID})`;
        //sends the instruction to add an entry to the database
        webSocket.send(toSend);
    }

    //modifies the add form according to the name, last name, and ID of the employee
    modifyAddForm() {      
        let [,classAdd] = this.contentText();

        //loads the existing data
        this.loadData();

        //clears the used form (members)
        classAdd.forEach(element => {
            element.value="";     
        });

    }
    
    modifyDeleteForm(){
        //selects the select list in the form Add & Delete Members
        let selectCombo=document.querySelectorAll("select.delete").item(0);

        //checks every option and selects the active one
        selectCombo.childNodes.forEach( element => {
            if (element.selected===true) {
                //deletes member from the database
                this.mySQLDeleteEntries(element.id);
                element.remove();
            }
        })
    }
    
    //loads the existing information of the database into the select list of add and delete members
    loadData(){
        
        //calls the database´s table member to get the all the member availables in the databse
        webSocket.send('SELECT * FROM "members"');

        //adds an event listener for when the information reaches the front end
        webSocket.addEventListener("message", function(event){
            
            let callMembers= JSON.parse(event.data);
            if (callMembers[0].nameTable.includes("member")) {

                let selectCombo=document.querySelectorAll("select.delete").item(0);
                
                //deletes all the nodes children from selectCombo in order to fill up the select list again with the updated version of the database
                while (selectCombo.childElementCount) {
                    selectCombo.lastChild.remove(); //removes the last child  
                }

                //iterates through every element of the database and update the selection list with it
                callMembers.forEach(element => {

                    //creates tags "option" for the select box
                    let option =document.createElement("option");
                    option.id=`${element.id}` 
                    option.innerHTML=`${element.name} ${element.lastname} ${element.employeeID} `;
                    option.text= `${element.name} ${element.lastname} ${element.employeeID}`;
                    selectCombo.appendChild(option);

                });
            }
        });

    }

    //modifies assignees from the selection box of activities
    modifyAddAssignees (){
        //calls the database´s table member to get the all the member availables in the databse
        webSocket.send('SELECT * FROM "members"');

        //adds an event listener for when the information reaches the front end
        webSocket.addEventListener("message", function(event){
            let callMembers= JSON.parse(event.data);

            if (callMembers[0].nameTable.includes("member")){
                 //generates a assignee variable with the assignee select box
                let assignee = document.querySelectorAll('select.activities').item(0);
                
                //deletes all the nodes children from selectCombo in order to fill up the select list again with the updated version of the database
                while (assignee.childElementCount) {
                assignee.lastChild.remove(); //removes the last child  
                }

                //iterates through every element of the database and update the selection list with it
                callMembers.forEach(element => {

                    //creates tags "option" for the select box
                    let option =document.createElement("option");

                    //changes characteristics of the element option
                    option.id=`${element.id}` ;
                    option.innerHTML=`${element.name} ${element.lastname}`;
                    option.text= `${element.name} ${element.lastname}`;
                    
                    //appens child to assignee
                    assignee.appendChild(option);

                });
            }


        },)

    }
}

//defines export default
export default Members