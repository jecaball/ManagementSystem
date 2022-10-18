//imports webSocket to make a connection with the back end
import webSocket from "./webSocket.js";
//creates the class Activity
class Activity {
    constructor(
        project,
        assignee,
        start,
        finish,
        priority,
        hours,
        description,
    ){
        this.project=project;
        this.assignee=assignee;
        this.start=start;
        this.finish=finish;
        this.priority=priority;
        this.hours=hours;
        this.description=description;
    }

    setProject(project){
        this.project=project;
    }
    getProject(){
        return this.project;
    }

    setAssignee(assignee){
        this.assignee=assignee;
    }
    getAssignee(){
        return this.assignee;
    }

    setStart(start){
        this.start=start;
    }
    getStart(){
        return this.start;
    }

    setFinish(finish){
        this.finish=finish;
    }
    getFinish(){
        return this.finish;
    }

    setPriority(priority){
        this.priority=priority;
    }
    getPriority(){
        return this.priority;
    }

    setHours(hours){
        this.hours=hours;
    }
    getHours(){
        return this.hours;
    }

    setDescription(description){
        this.description=description;
    }
    getDescription(){
        return this.description;
    }

    //it adds activities to the table
    addActivityTable (days,month, year){
        //adds entries to the database activities 
        this.addEntriesMySQL(); 
        
        //loads the database into the table
        this.loadDataActivity(days,month, year);
    }

    //adds entries to database activities
    addEntriesMySQL(){
        // creates the local variable toSend and defines it as string with the information to be sent in the database-backend
        let toSend=`INSERT INTO "activities", ${this.getProject()}, ${this.getAssignee()}, ${this.getStart()}, ${this.getFinish()}, ${this.getPriority()}, ${this.getHours()}, ${this.getDescription()}`;
        //sends the instruction to add an entry to the database
        webSocket.send(toSend);
    }

    //deletes entries of the database
    deleteEntriesMySQL(ID){
        // creates the local variable toSend and defines it as string with the information to be sent in the database-backend
        let toSend=`DELETE FROM "activities" WHERE ID= ${ID} )`;
        //sends the instruction to add an entry to the database
        webSocket.send(toSend);
    }

    //load the existing data from the database into the table for a general overview
    loadDataActivity(days,month, year){
        //calls the database activities to get all the data from it
        webSocket.send('SELECT * FROM "activities"');

        ///adds an event listener for when the information reaches the front end

        webSocket.addEventListener("message", function(event){
            let callActivities= JSON.parse(event.data);
            
            //selects the table tag of the document
            let tableElements=document.querySelectorAll("table.table")[0];

            //deletes all the nodes children from selectCombo in order to fill up the table again with the updated version of the database
            while (tableElements.childElementCount>1) {
                
                //removes the last child
                tableElements.lastChild.remove(); 
            }
                
            //iterates through every element of the database
            callActivities.forEach(element => {
                //calls the query table of the document
                let act = document.querySelectorAll('table.table').item(0);
                
                //creates a new row
                let newTr= document.createElement('tr');

                //gets dates for finish, start, and the actual date in the appropiate format
                const start=new Date(element.start);
                const finish=new Date(element.finish);
                const actualDate = new Date (year,month,1);

                let i=1;
                //creates cells of the rows
                let newTd=document.createElement('td');

                // adds name and project<<<<<<<<<to be improved
                newTd.textContent=`${element.assignee}-${element.project}`; 
                newTd.id="names-table";
                newTr.appendChild(newTd);

                // creates a new element "div"
                let newDiv= document.createElement("div"); 
                
                let widthCells= document.querySelectorAll(".days-numbers")[0].clientWidth;

                //fills the cells of the row with the required format
                while (actualDate.getMonth()===month) {
                    
                    //creates as new td element
                    let newTd=document.createElement('td');

                    if (actualDate>= start && actualDate<=finish) {
                        newTd.style.backgroundColor='rgb(0, 159, 156)';     //background color for days (td-element) of the activity
                        newTd.setAttribute('id',"assignee" );               //sets the id attribute as assignee
                        newTd.setAttribute('class','days-numbers');         //sets class attribute as day-numbers for formatting purposes
                        newTd.style.width=`${widthCells}px`;      //sets width
                    } else {
                        newTd.style.backgroundColor='rgb(200, 159, 156)';   //background color for days (td-element) without activity 
                        newTd.setAttribute('id',"assignee" );               //sets the id attribute as assignee
                        newTd.setAttribute('class','days-numbers');         //sets class attribute as day-numbers for formatting purposes
                        newTd.style.width=`${widthCells}px`;      //sets width
                    }

                    newDiv.appendChild(newTd);
                    i++
                    actualDate.setDate(i); 
                }
                
                newTr.appendChild(newDiv);
                newTr.setAttribute('class','days');
                act.appendChild(newTr);

                //selects the list to populate it with options. Every option is an activity
                let optionsActivity = document.querySelectorAll("select#activitieslist.activities").item(0);

                //creates a tag option
                let optionCreate = document.createElement("option");
                console.log(element);//to be deleted
                //add attributes to the tag option
                optionCreate.innerHTML=`${element.id} - ${element.project}  - ${element.assignee} - ${element.hours}`;
                optionCreate.id=element.id;
                optionCreate.textContent=`${element.id} - ${element.project}  - ${element.assignee} - ${element.hours}`;

                //appends option to list in activities form
                optionsActivity.appendChild(optionCreate);
            });

        })
    }

    //removes selected activity from the database and the list from the activities form
    deleteActivityTable (){
        //selects selection list of the form activities
        let selectActivities = document.querySelectorAll("select#activitieslist.activities").item(0);
        
        //goes through every element and deletes the selected one 
        selectActivities.childNodes.forEach(element => {
            if (element.selected===true){
                //deletes activity from the database
                this.deleteEntriesMySQL(element.id);

                //deletes element (activity) from the list
                element.remove();
            }
    
        });

        
    }
}

export default Activity;