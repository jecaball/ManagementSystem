/**
 * Creating class DateTable
 * 
 * Class expression const Name= Class{}
 */


//imports class activity
import Activity from "./Activity.js";

//Creates class DataTable
class DateTable {
    constructor (
        //Defines paramters
        year,
        month
    ){
        //Defines properties
        this.year=year
        this.month=month
    }

    //sets the year
    setYear (year) {
        this.year=year;
    }
    //gets year
    getYear (){
        return this.year;
    }

    //sets month
    setMonth (month) {
        this.month= new Date(this.year,month).getMonth();
        this.year= new Date(this.year,month).getFullYear();
    }
    //gets month
    getMonth () {
        return this.month
    }
    //gets month in text form
    getMonthText (){
        let months_text=["January", "February", "March", "April", "May", 
        "Juny", "July", "August", "September", "October", "November", "December"];
        return months_text[this.month];
    }

    //gets the number of days of the month
    getDays () {
        let days=new Date(this.year,this.month+1,0).getDate();
        return  days
    }
    
    //modifies the number of days in the table
    modifyTableDays (){
        let i;
        
        //defines veriables and sets attribute
        let newTr = this.addTableNames();
        newTr.setAttribute ("class", "days");
        let numberDays=this.getDays();
        
        //creates an th element as many times, days there are in a month
        for (i=1; i<= numberDays; i++) {
            var newTh = document.createElement("th");
            newTh.textContent=i.toLocaleString("en-US",{ //the values come like 01
                minimumIntegerDigits:2,
                useGrouping:false
            });
            newTh.setAttribute ("class", "days-numbers");
            newTr.appendChild(newTh);
          
        }

        /*Look for the tag table in order to add data related to dates*/
        let Table=document.querySelector("table");

        //removes the old version of the days of the months
        let child= Table.lastElementChild;
        while (child) {
            Table.removeChild(child)
            child=Table.lastElementChild
        }
        
        //appends new child with the new version of the days of the month
        Table.appendChild(newTr);
    }

    //modifies the month and year in the table
    modifyTableMonth () {
        let modifyTitle=document.querySelectorAll("span").item(1);
        modifyTitle.textContent= `${this.getMonthText()} - ${this.getYear()}`;
    }

    //adds the one section of the header of the table
    addTableNames() {

        //establishes variables for elements in the DOM and sets attributes
        let newTr = document.createElement ("tr");
        newTr.setAttribute ("class", "days");

        //establishes variables for elements in the DOM and sets attributes
        let nameTh = document.createElement("th");
        nameTh.setAttribute('class','names-table');
 
        nameTh.textContent='Name-Project-Priority-Hours';

        //appends to row
        newTr.appendChild(nameTh);
        return newTr;
    }

    //to fill up the table with stored information in the database-backend
    callDataBaseInformation (){
        
        //creates a new instance of activity
        const newActivity = new Activity();

        //populates the new instace of activity with the required dates
        newActivity.loadDataActivity(this.getDays(),this.getMonth(),this.getYear());
    }
}

//defines export default
export default DateTable