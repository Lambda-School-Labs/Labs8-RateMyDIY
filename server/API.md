# API Documentation

### User Routes
Title | Scenario
--- | ---
**URL** | `/signin`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`none`
**Success Response** | **Code:**  200 <br> **Content:** `Auth0 sign in / sign up`
**Error Response** | **Code:**  500 <br> **Content:**`Auth0 error`
**Notes** | *redirects to: /callback to perform final stage of authentication then redirects to previously requested URL or /test,* <br> *Needs additional setup*

Title | Scenario
--- | ---
**URL** | `/signout`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`none`
**Success Response** | **Code:**  200 <br> **Content:** `Auth0 sign out`
**Error Response** | **Code:**  500 <br> **Content:**`Auth0 error`
**Notes** |


Title | Scenario
--- | ---
**URL** | `/test`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`none`
**Success Response** | **Code:**  200 <br> **Content:** `<user>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Stores user information in local database, possibly needs redirect afterwards*

### Project Routes
Title | Scenario
--- | ---
**URL** | `/api/projects/:id`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`id=[integer]`
**Success Response** | **Code:**  200 <br> **Content:** `<project>`
**Error Response** | **Code:**  404 <br> **Content:**`{"error": "Could not get project."}`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** |

Title | Scenario
--- | ---
**URL** | `/api/projects/user/:id`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`id=[integer]`
**Success Response** | **Code:**  200 <br> **Content:** `<user projects>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs additional setup*

Title | Scenario
--- | ---
**URL** | `/api/projects/add`
**Method** | **POST**
**URL Parameters** | **Required:** <br>`body=[project]`
**Success Response** | **Code:**  201 <br> **Content:** `<response>`
**Error Response** | **Code:**  400 <br> **Content:**`{"error": "Please provide more information."}`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs to be authenticated,* <br> *may or may not include add*

Title | Scenario
--- | ---
**URL** | `/api/projects/edit/:id`
**Method** | **PUT**
**URL Parameters** | **Required:** <br>`id=[integer]` <br>`body=[changes]`
**Success Response** | **Code:**  200 <br> **Content:** `<response>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/projects/remove/:id`
**Method** | **DELETE**
**URL Parameters** | **Required:** <br>`id=[integer]`
**Success Response** | **Code:**  200 <br> **Content:** `<response>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

### Review Routes
Title | Scenario
--- | ---
**URL** | `/api/review/:id`
**Method** | **GET**
**URL Parameters** | **Required:** <br>`id=[integer]`
**Success Response** | **Code:**  200 <br> **Content:** `<review>`
**Error Response** | **Code:**  404 <br> **Content:**`{"error": "Review does not exist."}`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | 

Title | Scenario
--- | ---
**URL** | `/api/review/:id`
**Method** | **PUT**
**URL Parameters** | **Required:** <br>`id=[integer]` <br>`body=[changes]`
**Success Response** | **Code:**  200 <br> **Content:** `<response>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs to be authenticated.*

Title | Scenario
--- | ---
**URL** | `/api/review/:id`
**Method** | **DELETE**
**URL Parameters** | **Required:** <br>`id=[integer]`
**Success Response** | **Code:**  200 <br> **Content:** `<response>`
**Error Response** | **Code:**  500 <br> **Content:**`<error>`
**Notes** | *Needs to be authenticated.*