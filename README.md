# Vite + Three.js Project

This is a simple project template for setting up a 3D scene using Three.js with Vite as the build tool. 

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system. You can download Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/vite-threejs-project.git
    cd vite-threejs-project
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Project

1. **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start a development server and open your default browser to `http://localhost:5137`.

2. **Build for production:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory with the production build of your project.

3. **Preview the production build:**

    ```bash
    npm run preview
    ```

    This will start a local server to preview the production build.

### Project Structure

```plaintext
vite-threejs-project/
├── node_modules/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── assets/
│   │   └── ...
│   └── components/
│       └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
