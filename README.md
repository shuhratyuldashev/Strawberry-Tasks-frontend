# 🍓 Strawberry Tasks — Frontend

This is the client-side application for Strawberry Tasks, built with Vue 3 and TypeScript. It features a sleek, modern UI with a focus on task management efficiency.

## 🔗 Backend Repository

The backend for this project is available here:

👉 https://github.com/shuhratyuldashev/Strawberry-Tasks-backend

### 🛠 Tech Stack

* Framework: Vue 3 (Composition API)
* Build Tool: Vite
* State Management: Pinia
* Styling: Tailwind CSS
* HTTP Client: Axios
* Icons: Heroicons / Custom SVG

### ✨ Key Features

* Authentication: Full Login/Register flow with JWT (Access/Refresh tokens).
* Task Management: Create, Update, Delete, and Toggle tasks.
* Real-time UI: Reactive filtering by status (All, Active, Completed) and priority.
* Composables: Clean architecture using custom logic hooks (e.g., useAuth, useTaskActions).
* Responsive Design: Fully optimized for mobile and desktop.

### 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/shuhratyuldashev/Strawberry-Tasks-frontend.git
cd Strawberry-Tasks-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment:

Create a `.env` file in the root and add your backend URL:

```env
VITE_API_URL=http://localhost:8000/api
```

4. Run Development Server:

```bash
npm run dev
```
