# **Workflow**

## **1. Overview**

The application is designed to facilitate the management of medical consultations and therapy sessions in a hospital setting. Users are categorized into three types: **Supervisors**, **Therapists**, and **Patients**. Each user type has specific roles, permissions, and access to different sections of the application.

[IMAGE](../blob/WORKFLOW.png)

## **2. User Roles and Access**

### **2.1 Patient**

- **Registration**: Patients can self-register on the platform using their email (e.g., `user@example.com`).
- **Access & Permissions**: Once logged in, patients can access their personal information, including:
  - **Upcoming Sessions**: View details about upcoming therapy sessions.
  - **Ongoing Consultations**: Monitor progress and details of their current treatment courses.
  - **Session History**: Track past sessions and any relevant notes from therapists.

### **2.2 Therapist**

- **Registration & Login**: Therapists are assigned credentials by the Supervisor in their hospital. The login ID is typically formatted as `therapist1@hospital1`, where "therapist1" is the unique identifier, and "hospital1" is the hospital domain.
- **Access & Permissions**: Therapists can view:
  - **Assigned Patients**: Access a list of patients assigned to them, along with patient details.
  - **Session Scheduling**: Schedule new therapy sessions for their patients.
  - **Upcoming Sessions**: View details about future sessions, both scheduled and ongoing.
  - **Consultations**: Track the entire treatment course of their assigned patients, consisting of multiple sessions.

### **2.3 Supervisor**

- **Registration & Login**: Supervisors are typically one per hospital and are responsible for managing and overseeing the therapists. The login ID is formatted as `supervisor@hospital1`, where "supervisor" is the identifier and "hospital1" is the hospital domain.
- **Access & Permissions**: Supervisors have comprehensive access to the following:
  - **Therapist Management**: View and manage therapists in their hospital, including assigning therapists to patients.
  - **Patient Management**: View all patients within the hospital and their respective consultation status.
  - **Consultations & Sessions**: Supervisors can oversee consultations, monitor the schedule of sessions, and ensure that all therapy sessions are booked and tracked properly.
  - **Reports & Analytics**: Access to performance reports, patient progress, and therapist schedules for effective hospital management.

## **3. Definitions**

### **3.1 Consultation**

A **consultation** is a comprehensive treatment plan that spans multiple sessions. It involves a series of therapy appointments designed to address specific medical needs of a patient over time. Each consultation may involve multiple **sessions**, and therapists are responsible for tracking and updating the progress of each consultation.

### **3.2 Session**

A **session** is an individual therapy appointment within the course of a consultation. Each session has a defined start and end time and is a discrete event in the patient’s treatment journey. Sessions are scheduled by therapists and can be viewed by patients and supervisors.

---

## **4. Workflow Details**

### **4.1 Patient Registration & Access**

1. **Self-Registration**:
   - Patients self-register using their email address.
   - The registration process includes providing personal information and creating a password.
2. **Login**:
   - After successful registration, patients can log in with their email and password.
3. **Accessing Personal Info**:
   - After login, patients can:
     - View upcoming sessions and consult with therapists.
     - Track the progress of their ongoing consultations.
     - Review the history of past sessions.

### **4.2 Therapist Registration & Access**

1. **Assigned by Supervisor**:
   - Therapists receive login credentials from their supervisor in the hospital.
   - The login ID is in the format `therapistID@hospitalDomain.com`.
2. **Login**:
   - Therapists use the assigned login credentials to access their accounts.
3. **Accessing Patient Data**:
   - Once logged in, therapists can:
     - View a list of patients assigned to them.
     - View details of ongoing and upcoming sessions.
     - Schedule new sessions under each patient’s profile.
     - Track consultations and treatment progress for each patient.

### **4.3 Supervisor Registration & Access**

1. **Assigned by Hospital**:
   - Each hospital has one Supervisor responsible for managing the therapists and overseeing patient treatment.
   - The login ID is in the format `supervisor@hospitalDomain.com`.
2. **Login**:
   - Supervisors log in using their credentials.
3. **Managing Therapists and Patients**:
   - Supervisors can:
     - Add or remove therapists and assign them to specific patients.
     - Monitor patient consultations and sessions.
     - View the complete schedules for all therapists under their hospital.
     - Review reports and patient treatment progress.

---

## **5. Key Features**

### **5.1 Session Scheduling**

- Therapists can create new sessions for their patients, specifying the time, date, and any special instructions.
- Supervisors can view and approve session schedules to ensure proper management.

### **5.2 Consultation Tracking**

- **For Therapists**: Therapists will update the progress of a patient’s consultation, tracking session dates, treatment adjustments, and goals.
- **For Supervisors**: Supervisors can monitor the status of all consultations and ensure that the sessions are proceeding according to plan.

### **5.3 Notifications**

- Users receive notifications about upcoming sessions, any changes to schedules, or updates regarding consultations.
  - **Patients**: Receive reminders for upcoming sessions.
  - **Therapists**: Receive alerts about upcoming appointments and tasks.
  - **Supervisors**: Get alerts about session completions, patient updates, and therapist performance.

---

## **6. Future Enhancements**

### **6.1 Telemedicine Integration**

In the future, the platform will support telemedicine, allowing patients and therapists to conduct sessions remotely, further enhancing the flexibility and accessibility of care.

### **6.2 Performance Analytics**

Supervisors will have access to detailed performance analytics for each therapist and patient, allowing data-driven decisions to improve hospital management and patient care.

---

This workflow is designed to ensure a smooth, structured experience for all user types while enabling effective management of therapy sessions and consultations in a hospital setting.
