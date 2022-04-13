## Superb Challenge

<h2>Considerations:</h2>
<p>I did not have experience in creating APIs with NodeJS + EspressJs + MongoDB.</p>
<p>All the code i wrote included study and breaking many walls.</p>


<h3>How to install</h3>
<p>The only requirement is Docker.</p>
<p>You can install docker from [Get Docker] (https://docs.docker.com/get-docker/)</p>

How to run the system:
<ol>
    <li>Clone the repository from [Github Repo] (https://github.com/stefanomisuraca/superb_challenge)</li>
    <li>Open a terminal instance and move into the repository folder</li>
    <li>use the command `docker-compose build && docker-compose up`</li>
    <li>Wait for the system to start</li>
</ol>

<p>You'll know when the system is ready when you see the log line `api Connected succesfully`</p>


<h3>Design process</h3>

<p>The system is based on two main components: The API and the Database</p>
<p>Each one of these components is built inside a docker container.</p>
<p>Then, they are working together using docker-compose</p>
</br>
<p>The API is based on NodeJS and ExpressJs</p>

<p>I've choosen to go with API #1 from the pdf test</p>
<p>The database is based on MongoDB and Mongoose library is used as handler</p>
<p>The are 4 main schemas that define the application's structure</p>

<ul>
    <li>Restaurants</li>
    <li>Shifts</li>
    <li>Tables</li>
    <li>Reservations</li>
</ul>
</br>

<h4>Restaurants</h4>
<p>Restaurants are the pshysical place where customer go and eat their meals, they are identified by a name and owned by an owner.</p>

<h4>Shifts</h4>
<p>Shifts are the working hours for each restaurant. They let the user define in which days and time the restaurant open and close. Some restaurants for example, have more than one shift per day. They are linked directly to a restaurant</p>

<h4>Tables</h4>
<p>Tables are placed inside the restaurant and they have at least one seat.
</br>They are linked directly to a shift, because different shifts may need a different tables composition.
</p>
<h4>Reservations</h4>
<p>Reservations happen when a customer is booking a specific table for a specific time (shift)
</br> In that case the user can save that specific reservation into the system.
They are linked to a shift and to a table.
</p>
</br>

<h3>API specifications</h3>
<p>
The api is located at [localhost] http://localhost:8080</p>

</p>
Restaurants enpoint is /restaurants </br>
`GET /restaurants` returns all restaurants </br>
`GET /restaurants/:name` returns a specific restaurant by name </br>
`POST /restaurants` create a new restaurant </br>
POST payload is: </br>
```{   
    "name": "name",
    "owner": "ownerName"
}```
</p>
<p>
Shifts enpoint is /shifts </br>
`GET /shifts` returns all shifts</br>
`GET /shifts/:id` returns a specific shift by id</br>
`GET /shifts/restaurants/:id` return all shifts for a specific restaurant</br>
`POST /shifts` create a new shift</br>
POST payload is:</br>
```{
    "restaurant": "62568f14a397656fe6bd8cac",
    "start": "2022-05-12 10:00",
    "end": "2022-05-12 16:00"
}```
</p>
<p>
Tables enpoint is /tables </br>
`GET /tables` returns all tables </br>
`GET /tables/:id` returns a specific table by id</br>
`GET /tables/restaurants/:id` return all tables for a specific restaurant</br>
`DELETE` /tables/:id delete a specific table</br>
`POST /tables` create a new table</br>
POST payload is:</br>
```{
    "seats": 10,
    "restaurant": "62568f14a397656fe6bd8cac"
}```
</br>
PATCH payload is:
```{
    "seats": 8,
    "restaurant": "62568f14a397656fe6bd8cac"
}```
</p>
<p>
Reservations enpoint is /reservations </br>
`GET /reservations` returns all reservations</br>
`GET /reservations/:id` returns a specific reservation by id</br>
`GET /reservations/shifts/:id` return all reservations for a specific shift</br>
`POST /reservations` create a new reservations</br>
`DELETE /reservations/:id` delete a specific reservation</br>
</br>
POST payload is:
```{
    "shift": "62568f68a397656fe6bd8cbb",
    "table": "62568f9ea397656fe6bd8ccd",
    "customers": 6,
    "reservedFrom": "2022-05-12 13:30",
    "reservedTo": "2022-05-12 14:30"
}```
PATCH payload is:
```{
    "shift": "62568f68a397656fe6bd8cbb",
    "table": "62568f9ea397656fe6bd8ccd",
    "customers": 8,
    "reservedFrom": "2022-05-12 12:30",
    "reservedTo": "2022-05-12 13:30"
}```
</p>

<h3>Validation</h3>

<p>Restaurants do not have a particulat validation, they only contain a name,they are used to identify the working place.</p>
<p>Shifts have a small validation. To keep things simple, they can last as much as the user want. Two shifts cannot overlaps in time. The starting time of the shift cannot be bigger than the ending.</p>
<p>Tables' validation is also simple. The minium requirment is to have 1 seat but they can be as big as the user want (still to keep things simple)</p>
<p>Reservations have the most complex validation.
Reservations must have a starting time, ending time and this range must be exactly one hour.
Also this range must be within a specific shift time.
As they are linked to a table, the number of customer must be less or equal the number of seats fo the table.
It is not possible to make a reservation for the same table if this is already reserved.
</p>


<h3>Endpoint actions</h3>
<p>
It's possible to create Restaurants, Shifts, Tables and Reservations.
It's possible to edit Reservations and Tables
It is possible to delete Reservations and Tables
It is also possible to get all of the above data
</p>


<h3>What's missing</h3>
<p>To keep things simple and due to time limit some behaviours are not implemented.</p>
<p>Some delete actions do not cascade to other references, like tables for example</p>
<p>Validation could be more precise and more detailed</p>
<p>Many test cases are missing, also test environment is missing a better DB handling</p>

<h3>Considerations and conclusions</h3>
<p>There are definetly many things that could be improved.</p>
<p>The hard part was mostly to study many key components of this project like Espress and Mongoose, tools which I have never used before. I hope I made a good use of those.</p>
<p>During the development Mongoose was definately the most difficult part, as I had no knowledge of how it worked, the update feature for example, was a nightmare to implement</p>

