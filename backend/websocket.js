//imports new instance of Client
const {Client} = require ('pg');

//creates a new instance of Client
const client =new Client({
    //establishes properties´ values
    host: "127.0.0.1",
    user: 'postgres',
    password: 'password',
    port:5432,
})

//connects to the database
client.connect() 



//creates a table if it does not exit
const createMembers = async ()=> {
  try {
    //sends the query to create the table
    await client.query(`CREATE TABLE IF NOT EXISTS "members" (
      "id" SERIAL, 
      "name" VARCHAR (100), 
      "lastname" VARCHAR(100), 
      "employeeID" INTEGER, 
      "nameTable" VARCHAR(50) NOT NULL,
      PRIMARY KEY ("id"))`);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false
  } finally {
    //await client.end();
  }
}

//creates a table if it does not exit
const createActivity = async ()=> {
  try {
    //sends the query to create the table
    await client.query(`CREATE TABLE IF NOT EXISTS "activities" (
      "id" SERIAL,
      "project" VARCHAR (100), 
      "assignee" VARCHAR (200), 
      "start" DATE NOT NULL, 
      "finish" DATE NOT NULL, 
      "priority" VARCHAR (50), 
      "hours" INTEGER, 
      "description" VARCHAR (500),
      "nameTable" VARCHAR(50) NOT NULL,
      PRIMARY KEY ("id"))`);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false
  } finally {
    //await client.end();
  }
}

//creates tables members and activities if they do not exist
createMembers();
createActivity();

// function to insert members in the database for members
const insertMembers = async (memberName, memberLastName, memberemployeeID)=> {
  try {
    //await client.connect();
    await client.query(`INSERT INTO "members" ("name", "lastname", "employeeID") VALUES ($1, $2, $3)`,[memberName,memberLastName,memberemployeeID]); //send queries 
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    //await client.end().then(()=> console.log("Cliente has disconnected"));
  }
}

//function to insert activities in the database of activities
const insertActivities = async (actProject, actAssignee, actStart, actFinish , actPriority ,actHours , actDescription)=> {
  try {
    //await client.connect();
    await client.query(`INSERT INTO "activities" ("project","assignee","start","finish","priority","hours","description") VALUES ($1, $2, $3, $4, $5, $6, $7)`,[actProject, actAssignee, actStart, actFinish , actPriority ,actHours , actDescription]); //send queries 
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    //await client.end().then(()=> console.log("Cliente has disconnected"));
  }
}

//executes queries that call records of the database
const fetchMembers= async () => {
  try {
      //await client.connect();                                       // gets connection
      let { rows } = await client.query('SELECT * FROM "members"'); // sends queries
      return rows
  } catch (error) {
      console.error(error.stack);
  } finally {
      //await client.end().then(()=> console.log("Client has disconnected"));                                           // closes connection
  }
};

//executes queries that call records of the database
const fetchActivities= async () => {
  try {
      //await client.connect();                                       // gets connection
      let { rows } = await client.query('SELECT * FROM "activities"'); // sends queries
      return rows
  } catch (error) {
      console.error(error.stack);
  } finally {
      //await client.end().then(()=> console.log("Client has disconnected"));                                           // closes connection
  }
};


//deletes a member from  the database
const deleteMember = async (id) => {
  try {
      //await client.connect();  // gets connection
      await client.query('DELETE FROM "members" WHERE id = $1', [id]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } finally { 
      //await client.end();  // closes connection
  }
};

// deletes an activity from the activities database
const deleteActivity = async (id) => {
  try {
      //await client.connect();  // gets connection
      await client.query('DELETE FROM "activities" WHERE id = $1', [id]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } finally { 
      //await client.end();  // closes connection
  }
};

//imports the required module
const WebSocketServer = require('ws');

//creates a new webSocket server
const wss = new WebSocketServer.Server({port: 8080});

//creates the connection with the websocket
wss.on ("connection", ws=> {
  //indicates that the connection was established
  console.log("connection established");

  ws.on("message", data => {
    //reports in backend that data has arrived
    console.log(`Client has sent us: ${data}`);

    //decodes the Arraybuffer to string
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(data);
    data=enc.decode(arr);
    
    //checks the intruction sent from frontend to database in backend
    if (data.includes("INSERT INTO")==true) { //checks if a new record is to be added

      
      if (data.includes("members")==true){
        //splits the data into a array of text
        data=data.split(",");
        //calls function execute to execute the query
        insertMembers(data[1],data[2],data[3]).then(result => {
          if (result){
            console.log("row added");
          }
          else{
            console.log("record already exits?");
          }
        });
      }else if (data.includes("activities")==true){
        //splits the data into a array of text
        data=data.split(",");
        //calls function execute to execute the query
        insertActivities(data[1],data[2],data[3],data[4],data[5],data[6],data[7]).then(result => {
          
          if (result){
            console.log("row added");
          }
          else{
            console.log("record already exits?");
          }
        });
      }
    }

    if (data.includes("DELETE FROM")==true) { // checks if a record is to be deleted
          
      if (data.includes("members")==true) {
        //calls function deletemember to delete the member from the database
        deleteMember(data.replace(/[^0-9]/g,'')).then(result => {
          if (result){
            console.log("row deleted");
          }
          else{
            console.log("record does not exit");
          }
      });
      } else if (data.includes("activities")==true) {
        //calls the function deleteActivity to delete the activity with the ID of the activity
        deleteActivity(data.replace(/[^0-9]/g,'')).then(result => {
          if (result){
            console.log("row deleted");
          }
          else{
            console.log("record does not exit");
          }
        });
      }

    }

    if (data.includes("SELECT * FROM")==true){
      
      if (data.includes("members")==true) {
        //creates the local variable fetchData and get the promise of the fetchMembers function
        let fetchData=fetchMembers(); 
        console.log("selecto from Members")
        //gets the result of the promise
        fetchData.then(function(result){ 
          //sends the database back to the front end to fill up where it is required but first the object is converted in string to be sent
          ws.send(JSON.stringify(result));
        })

      } else if (data.includes("activities")==true){
        //creates the local variable fetchData and get the promise of the fetchActvities function
        let fetchData=fetchActivities(); 
        console.log("Select from Activities");
        //gets the result of the promise
        fetchData.then(function(result){ 

          //sends the database back to the front end to fill up where it is required but first the object is converted in string to be sent
          ws.send(JSON.stringify(result));
        }) 
      }
      
    }
  });

  //handling what to do when clients disconnect from server
  ws.on("close",()=>{
    console.log("the client has been disconnected");
  });

  //handles client connection error
  ws.onerror= function(){
    console.log("Some error occurred");
  }
});

console.log("The WebSocket server is runnign on port 8080");