# Notes App Project

This is a full-stack project that allows users to manage their notes, with features to create, edit, delete, and view notes. It also includes the ability to record and attach audio to notes for a richer experience. The project is built using **Django** for the backend and **React** for the frontend.

---

## **Project Structure**

```
project/
├── Backend/          # Django project for the backend (API and authentication)
│   ├── manage.py     # Django management commands
│   ├── app/          # Django app(s) for handling models and views
│   ├── db.sqlite3    # SQLite database (removed before pushing to GitHub)
│   ├── .env          # Environment variables for backend (for sensitive data)
│   ├── .gitignore    # Git ignore file to exclude unnecessary files
│   ├── requirements.txt  # Backend dependencies
│   └── settings.py   # Django settings configuration
│
├── Frontend/         # React project for the frontend (user interface)
│   ├── public/       # Static files for the frontend
│   ├── src/          # Source files for React components
│   ├── .env          # Environment variables for frontend (API URL)
│   ├── .gitignore    # Git ignore file for frontend
│   ├── package.json  # Frontend dependencies
└── docker-compose.yml  # Docker configuration (optional)
```

---

## **Features**

### **1. User Authentication**
- Users can register, log in, and log out securely.
- Authentication is managed using **JWT (JSON Web Tokens)**.
- Protected routes ensure that only authenticated users can access their notes.

### **2. Notes Management**
- Create, edit, delete, and view notes.
- Each note includes:
  - **Title**
  - **Description**
  - Optional **Audio Recording**

### **3. Audio Recording**
- Users can record audio directly within the app.
- Recorded audio can be previewed and attached to notes.

### **4. Profile Management**
- Users can update their profile information (username and email).
- Password changes are supported.

### **5. Responsive Design**
- Built with **Bootstrap** for a responsive and user-friendly design.

---

## **Tech Stack**

- **Backend:**
  - **Django** with **Django REST Framework**
  - **SQLite** (default database, can be replaced with PostgreSQL or MySQL)
  - **JWT Authentication**

- **Frontend:**
  - **React** with **React Router**
  - **Axios** for API requests
  - **Bootstrap** for styling

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Abdulrahman-Albarghouth/Notes_App.git
cd Notes_App
```

### **2. Backend Setup (Django)**

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```

2. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/macOS
   venv\Scripts\activate     # For Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following content:
   ```env
   SECRET_KEY=your_secret_key
   DEBUG=True
   ```

5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

6. Run the server:
   ```bash
   python manage.py runserver
   ```

### **3. Frontend Setup (React)**

1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```env
   REACT_APP_API=http://127.0.0.1:8000/api
   ```

4. Run the React app:
   ```bash
   npm start
   ```

---

## **Environment Variables**

### **Backend (.env):**
- `SECRET_KEY`: Your Django secret key.
- `DEBUG`: Set to `True` during development, `False` for production.

### **Frontend (.env):**
- `REACT_APP_API`: URL to the backend API.

---

## **Testing**

- Backend tests are written using Django's testing framework.
- To run backend tests:
  ```bash
  python manage.py test
  ```
- Frontend tests are written using **Jest** and **React Testing Library**.
- To run frontend tests:
  ```bash
  npm test
  ```

---

## **Docker (Optional)**

1. Install Docker and Docker Compose.
2. Build and start containers:
   ```bash
   docker-compose up --build
   ```

---

## **Troubleshooting**

- **CORS Errors:** Ensure `django-cors-headers` is properly configured in the backend.
- **Frontend API Issues:** Verify the `REACT_APP_API` variable in the `.env` file.
- **Microphone Access:** Grant permission to access the microphone in your browser.

---
