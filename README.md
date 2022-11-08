# ManagementSystem
JavaScript project for university
Overview:
As “Project Java and Web Development” it is intended the development of a web application tool targeted to middle to big size companies for time and personnel management. 
The tool is expected to be used by middle to high management positions in companies with a wide variety of projects, time schedules, and interdisciplinary groups.
Users will benefit from this web application tool because it will improve time and personnel activities track, 
define priorities of the activities and update personnel schedules accordingl), and provide with an overview of the personnel workload capacity. 

For the frontend will be used HTML, CSS, and JavaScript, they will handle the behavior of the webpage as the user interacts with it; 
Vanilla Javascript will be used as web components framework for the project. In the backend will be used Node.JS for the handling of multiple users; 
likewise, a database is necessary to store information and will be managed through PostgreSQL.
Connection between back and frontend is through WebSockets

Development phase/Reflection phase:
The implementation of this project was as follows:
•	The web architecture was reviewed. Then, it was designed the user graphical interface. 
Once this was done, it was selected the color palette, the texts characteristics, and the desired behavior of the user interface on the different display configurations. 
The graphical user interface was done by using HTML and the styling of the HTML was achieved with CSS; interactive capabilities were given by JavaScript in the frontend. 
The web page consists in two forms: activities and members, and a table which shows how the personnel and activities are distributed and their relationship.

•	Once the graphical interface was done, it was created a list of classes and defined their different properties and methods. 
There were created three classes: Member class, Activity class and DateTable class. 
The member class handles all the information related to the members that are participants or the persons subject to activities; as well, it modifies the HTML document whether there is a modification of the number of members. 
The class activity is related to the activities that are assigned to the assignee, it contains properties as initial date, finish date, name, last name, priority of that activity, name of the activity; it is in charge, as well, to send information to the database and to modify the HTML wherever is necessary. 
Finally, the DataTable class It's mostly related to updating the table which contains the different activities and so on.

•	It was created a database management system that contains information of members and activities. Database management system selected for this project is Postgres. Programming in the back end, was done through JavaScript and node JS. 
Communication between the backend and the frontend was achieved by creating a WebSocket with port number 8080. The communication between the database management system and frontend uses as an intermediary JavaScript and node JS in the backend.

•	Buttons in the web page have event listeners attached which request information whenever is necessary or there is a change produced by pressing these buttons. 
There is a button in the form members which is used to add members and another button in the center form 2 delete members. 
There are two buttons in the form activities which are in church to add or delete activities. 
Finally, there are two buttons which are used to go forward or backward in the month of the year.

Usage
1. open the web application
2. Add a name, a last name, and a employee ID by pressing the button add from the Add and Delete Members form. When done, they will apper down in the selection box
3. If a mistake was done, go to the selection list, select the row with the wrong information and press delete.
4. in the form activities the process is the same as in add and delete members. For adding an activity, fill up the form and press add
5. for deleting an activity, select it in the selection list and press delete.
6. Addtional or deletion of activities will appear automatically in the visualization area.
7. Press back or forward to change months of the visualization overview.

installation
To deploy the web app the it is required to have installed Node.js and run the file websocket.js in the folder backend.
Modules required in Node.js are ws for WebSocketServer and pg for postgres
