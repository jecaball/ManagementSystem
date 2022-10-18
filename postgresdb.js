//* this code was slighy modified from:
// https://dirask.com/posts/Node-js-PostgreSQL-Create-database-pOv9vD*//

// includes the postgreSQL dependency
const {Client} = require ('pg');

//creates a new instance of Client
const client =new Client({
    //establishes properties´ values
    host: "127.0.0.1",
    user: 'postgres',
    password: 'password',
    port:5432,
})

//creates the DBMS Management System for the different databases
const createDB = async ()=> {
    try {
        //gets the connection
        await client.connect();
        //sends a query to create the database
        await client.query ('CREATE DATABASE Management_System');
        return true
    } catch (error) {
        //logs error
        console.log(error.stack);
        return false;
    } finally {
        //closes connection
        await client.end();
    }
}

//executes queries that feed the database
const execute = async (query)=> {
  try {
    console.log("control point 3");//<<<<<<to delete
    await client.connect();
    await client.query(query);
    return true
  } catch (error) {
    console.log("control point 4");//<<<<<<to delete
    console.error(error.stack);
    return false
  } finally {
    await client.end().then(()=> console.log("Ciente has disconnected"));
  }
}

const insertMembers = async (memberName, memberLastName, memberemployeeID)=> {
  try {
    await client.connect();
    await client.query(`INSERT INTO "members" ("name", "lastname", "employeeID") VALUES ($1, $2, $3)`,[memberName,memberLastName,memberemployeeID]); //send queries 
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.end().then(()=> console.log("Cliente has disconnected"));
  }
}

//executes queries that call records of the database
const fetchMembers= async () => {
  try {
      await client.connect();                                       // gets connection
      const { rows } = await client.query('SELECT * FROM "members"'); // sends queries
      console.log(rows);
  } catch (error) {
      console.error(error.stack);
  } finally {
      await client.end().then(()=> console.log("Client has disconnected"));                                           // closes connection
  }
};

//deletes a member
const deleteMember = async () => {
  try {
      //await client.connect();  // gets connection
      await client.query('DELETE FROM "members" WHERE "id" > $1', [0]); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  } finally {
      //await client.end();  // closes connection
  }
};
