This server is the backend database to the corresponding client, "Plant-Pal", which can be accessed within my respositories. The initial build out of this server is a part of the final requirements for Eleven Fifty Academy's Web Development Course upon graduation in Fall 2020. 

The server utilizes postgresql, javascript, and node.js to initialize full crud capabilities for the Plant-Pal web application, which can be accessed within my respositories. 
Information on the intent of this application can be found within the client repo. This server establishes three table models; user, location, and plant. All of which allow full CRUD capabilities. Database associations are established between users and both the location and plant tables. Additionally, the location model is associated with the plant model as a one to many.   
This will allow for users on the client end to add plants to specific locations in their homes.
