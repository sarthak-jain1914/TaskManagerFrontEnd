Create a SIMPLE React.js UI for a Task Management application.

IMPORTANT RULES (DO NOT VIOLATE):
1. I will provide cURL commands AFTER this prompt.
2. You MUST derive:
   - API endpoints
   - HTTP methods
   - Request fields
   - Response fields
   ONLY from the provided cURL commands.
3. DO NOT assume, invent, rename, or hardcode any API, field, or response.
4. DO NOT name APIs manually — use exactly what is present in the cURL.

Tech constraints:
- React.js with functional components
- useState, useEffect
- Fetch or Axios
- No Redux
- Minimal CSS
- Clean, readable UI
- No unnecessary libraries

Application Flow:
1. Registration Page
   - Build the form fields strictly based on the register cURL request body.
   - On successful response:
     - Show message: "Registration successful, please sign in"
     - Redirect user to Sign In page

2. Sign In Page
   - Build form fields strictly from the login cURL request body.
   - On successful response:
     - Store auth data (token or equivalent) exactly as returned by API
     - Redirect to Tasks page

3. Tasks Page (after login)
   - Fetch tasks using the task list cURL
   - Render tasks using fields present in API response only

4. Create Task
   - Form fields must come strictly from create-task cURL request body
   - After successful creation:
     - Refresh task list

5. Update Task
   - Editable form using fields from update-task cURL
   - Pre-fill values from task list response
   - Refresh task list after success

6. Delete Task
   - Use delete-task cURL
   - Refresh task list after success


1. Post Register user - curl --location 'localhost:8080/sign-up' \
--header 'Content-Type: application/json' \

--data-raw '{
    "name" : "sarthak-jain",
    "email": "arthakain9966@gmail.com",
    "password" : "pass",
    "role" : "admin"
}'

response - 
{
    "createdAt": "2026-01-11T13:13:45.137Z",
    "email": "pratikjain9966@gmail.com",
    "id": 202,
    "name": "pratik-jain",
    "password": "$2a$10$EiO8VNaWH4/24l713nB/VOo5VLEyLgeT2I4qZbJtYdzyG7o.nEje6",
    "role": "ADMIN",
    "status": "ACTIV",
    "updatedAt": "2026-01-11T13:13:45.137Z"
}




2. post login user - curl --location 'localhost:8080/login' \
--header 'Content-Type: application/json' \

--data '{
    "username" : "pratik-jain",
    "password" : "pass"
}'

response -

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOjI1Miwic3ViIjoiMjUyIiwiaWF0IjoxNzY4MTQ4NjAzLCJleHAiOjE3NjgxNTIyMDN9.0dEHXjDmBewksGkkuhl8xlFJMhHsGfT_FLkeeEzgqOY"
}






3. post create-task - curl --location 'localhost:8080/create-task' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6MTUyLCJzdWIiOiIxNTIiLCJpYXQiOjE3NjgxMjYzMjksImV4cCI6MTc2ODEyOTkyOX0.M8KTWKtVQGPNjz7MV35oMgHFqKYaiOOc52sEw99LYas' \

--data '{
    "name" : " playing football",
    "description" : "we have a plan for playing football with XYZ team",
    "timestamp" : {
        "time": "2026-01-11 10:30:00"
    }
}'

response - 

{
    "completed": false,
    "createdAt": "2026-01-11T16:50:42.354Z",
    "description": "we have a plan for playing football with XYZ team",
    "id": 202,
    "name": " playing football",
    "schedule": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T16:50:42.354Z"
}





4. Get All-Task - curl --location 'localhost:8080/All-Task' \
--header 'Authorization: Bearer JhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOjIwMiwic3ViIjoiMjAyIiwiaWF0IjoxNzY4MTQ2OTAzLCJleHAiOjE3NjgxNTA1MDN9.M-4kDxEja-31uhntn2cfjcsZgY_ToRiDSR8VlGFVBMY' \

Response - 

[
    {
        "completed": false,
        "createdAt": "2026-01-11T16:50:42.354Z",
        "description": "we have a plan for playing football with XYZ team",
        "id": 202,
        "name": " playing football",
        "schedule": "2026-01-11T10:30:00.000Z",
        "updatedAt": "2026-01-11T16:50:42.354Z"
    }
]







5. Get Task/{id} - curl --location 'localhost:8080/Task/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOjIwMiwic3ViIjoiMjAyIiwiaWF0IjoxNzY4MTQ1MzQzLCJleHAiOjE3NjgxNDg5NDN9.6gTs2Th4ZkxtkTKyCdL1TQLIs010VMwff1s2zqlML1w' \

--data ''

Response - 

{
    "completed": false,
    "createdAt": "2026-01-11T16:50:42.354Z",
    "description": "we have a plan for playing football with XYZ team",
    "id": 202,
    "name": " playing football",
    "schedule": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T16:50:42.354Z"
}






6. Patch update-task/{id} - curl --location --request PATCH 'localhost:8080/update-task/152' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "traveling",
    "description" : "going on tour"
}'

Response - 

{
    "completed": false,
    "createdAt": "2026-01-11T16:50:42.354Z",
    "description": "going on tour",
    "id": 202,
    "name": "traveling",
    "schedule": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T17:01:57.891Z"
}



7. delete delete-task - curl --location --request DELETE 'localhost:8080/delete-task/152'

Response - 

successfully deleted

