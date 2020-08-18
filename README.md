# Hospital-API
 Designed an API using Node.js and MongoDB for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

## Theme
1. There can be 2 types of Users
    - Doctors
    - Patients
2. Doctors can log in
3. Each time a patient visits, the doctor will follow 2 steps
    - Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
    - After the checkup, create a Report
4. Patient Report will have the following fields
    - Created by doctor
    - Status (You can use enums if you want to):
    - Can be either of: [Negative, Travelled-Quarantine,Symptoms-Quarantine, Positive-Admit]
    - Date

## Routes
1)`/doctors/register` → Registers a new Doctor to the hospital Database takes in madatory `username` and `password`  
2) `/doctors/login` → Doctor Login with username and password, if Authenticated, Returns the JSON Web token, takes in madatory `username` and `password`  
3) `/patients/register` → API to register a new Patient, This is a protected route only authorized doctor can create a new Patient. Takes in madatory patients id, whichis the phone number as `phone`  
4) `/patients/:id/create_report` → API to create a report for the Patient with ID `id` . Takes in a mandatory field `Status` in it  
5) `/patients/:id/all_reports` → To Show all the reports of a particular Patient with id `id`. unprotected Route.  
6) `/reports/:status`  → To Show all the reports in the database with a particular `status` lets say Positive or Negative Or Quarantined etc.  


## Folder Structure
1) Entry point : index.js. 
2) `config` : Contains configuration files of Mongoose and Passport Authentication Strategies. 
        a. `mongoose.js`
        b. `passport-jwt-strategy.js`
3) `controllers\api\v1` : Controllers for various APIs.
        a.`doctors_api.js`
        b. `patients_api.js`
        c. `reports_api.js`
4) `models` : Schema for the Doctors, Patients and reports.
        a. `doctor.js`
        b. `patient.js`
        c. `report.js`
5) `routes` : Different routes.
        a. `api`
            - `v1`
                - `doctors.js`
                - `patients.js`
                - `reports.js`
                - `index.js` : manages above routes.
            - `index.js` : manages different versions of api
        b. `index.js` : root entry point for all the routes.
        