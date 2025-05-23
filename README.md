Assignment Submission on Train Booking Platform
Base URL:http://localhost:5000/api;


Register User
POST 
http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "xxxxxxx",
  "email": "xxxxxx@email.com",
  "password": "123456",
  "role": "admin" // optional, defaults to "user"
}


 Login User
POST 
http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "xxxxx@email.com",
  "password": "123456"
}

Train APIs (Admin-only, protected by API key)
Add a New Train
x-api-key: YOUR_ADMIN_API_KEY
POST 
http://localhost:5000/trains/add

Body (JSON):
{
  "name": "All India Express",
  "source": "Mangalore",
  "destination": "Mumbai",
  "total_seats": 250
}





Get Train Availability
GET 

http://localhost:5000/trains/availability?source=mangalore&destination=Delhi

Authorization: Bearer <JWT_TOKEN>



Book a Seat
Authorization: Bearer <JWT_TOKEN>
POST 
http://localhost:5000/bookings/book
Body (JSON):
{
  "train_id": 1
}


Get Specific Booking Details
GET 
http://localhost:5000/bookings/:id

Get Specific Booking Details
GET /booking/:id
Example:
GET /booking/2



Admin APIs	x-api-key: <ADMIN_API_KEY>
User Auth APIs	No auth needed
Booking + Availability	Authorization: Bearer <JWT_TOKEN>
