# 📡 Peer Stream: Your Own Little Omegle (Backend) 💬

Hey there, internet wanderer! 👋 You've stumbled upon the backend for **Peer Stream**, a fun little project that lets you connect with random strangers for video chats, just like the good ol' days of Omegle!  Think of it as a digital campfire 🔥 where you can meet new people from the comfort of your keyboard.

This backend, built with the MERN stack (though focusing on the Node.js/Express side for this part), handles all the behind-the-scenes magic to get you connected. Let's dive into how it works! 🚀


## ✨ Features

Here's what makes this backend tick:

*   **Real-time Connection Power 💪:** Uses **Socket.IO** for lightning-fast, bidirectional communication, essential for those real-time video and audio streams.
*   **User Management 👤:** Keeps track of who's online and ready to mingle.
*   **Matching Magic ✨:** Implements a simple queue system to pair up lonely souls eager for a chat. No swiping required! 😉
*   **Room Creation & Handling 🚪:** Dynamically creates private "rooms" for paired users to have their conversations.
*   **WebRTC Signaling 🤝:** Facilitates the crucial signaling process (offer, answer, ICE candidates) needed to establish peer-to-peer connections for video and audio.
*   **Scalable Foundation 🏗️:** Built with Node.js and Express, providing a solid base for future expansion.
*   **CORS Enabled ✅:** Allows connections from any origin, making development and deployment a breeze.


## 🛠️ Tech Stack

This backend is powered by these cool technologies:

*   **Node.js:**  The JavaScript runtime that makes this server purr. ⚙️ ([https://nodejs.org/](https://nodejs.org/))
*   **Express.js:** A fast, minimalist web application framework for Node.js. 🚄 ([https://expressjs.com/](https://expressjs.com/))
*   **Socket.IO:** Enables real-time, bidirectional and event-based communication. 🌐 ([https://socket.io/](https://socket.io/))
*   **TypeScript:** Adds static typing to JavaScript, making our code more robust and easier to maintain. 🤓 ([https://www.typescriptlang.org/](https://www.typescriptlang.org/))
*   **Nodemon:**  Automatically restarts the server when file changes are detected during development. 🔄 ([https://nodemon.io/](https://nodemon.io/))



## 🚀 Getting Started

Want to get this backend up and running? Follow these simple steps:

### 🚦 Prerequisites

Make sure you have these installed on your machine:

*   **Node.js:**  (Version 10 or higher is recommended) ([https://nodejs.org/](https://nodejs.org/))
*   **npm** or **yarn:** (npm comes with Node.js) ([https://www.npmjs.com/](https://www.npmjs.com/) or [https://yarnpkg.com/](https://yarnpkg.com/))

### ⚙️ Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nasserml/peer-stream-omegle-clone-mearn-full-stack.git
    cd peer-stream-omegle-clone-mearn-full-stack-main/backend
    ```

2. **Install dependencies:**

    If you use **npm**:
    ```bash
    npm install
    ```

    If you use **yarn**:
    ```bash
    yarn install
    ```

### ▶️ Running the Server

There are two ways to run the server:

**For Development (with automatic restarts):**

```bash
npm run dev
```

This command first builds the TypeScript code into JavaScript and then starts the server using Nodemon. Any changes you make to the `.ts` files will automatically trigger a rebuild and server restart.

**For Production (after building):**

1. **Build the TypeScript code:**
    ```bash
    npm run build
    ```

2. **Start the server:**
    ```bash
    npm start
    ```

You should see the message `listening on *:3000 dev` (or similar) in your console, indicating the server is running on port 3000. 🎉


## 📂 Code Structure

Let's take a peek inside the `backend` directory:

```
backend/
├── dist/           # Compiled JavaScript code (output of TypeScript build)
│   ├── index.js
│   └── managers/
│       ├── RoomManager.js
│       └── UserManager.js
├── src/            # Source code (TypeScript)
│   ├── index.ts    # Main entry point of the backend application
│   └── managers/   # Contains logic for managing users and rooms
│       ├── RoomManager.ts
│       └── UserManager.ts
├── package-lock.json # Records the exact versions of dependencies used (npm)
├── package.json      # Contains project metadata and dependencies
└── tsconfig.json     # TypeScript compiler configuration
```

Key directories and files:

*   **`src/`:**  This is where the magic happens!  All the TypeScript source code lives here.
*   **`src/index.ts`:** The main entry point for your backend application. It sets up the Express server, Socket.IO, and initializes the user management.
*   **`src/managers/`:** Contains classes responsible for managing different aspects of the application's logic.
    *   **`UserManager.ts`:** Handles adding, removing, and queuing users for matching.
    *   **`RoomManager.ts`:**  Manages the creation and signaling within individual chat rooms.
*   **`dist/`:**  The compiled JavaScript code that Node.js actually runs. This is generated when you run `npm run build`.
*   **`package.json`:** Defines the project's dependencies, scripts, and other metadata.



## 🧠 Key Concepts Explained

Here's a breakdown of some important concepts in the code:

*   **`index.ts`:**
    *   Sets up an Express application to handle basic HTTP requests (though this backend primarily focuses on WebSockets).
    *   Initializes a Socket.IO server, attaching it to the HTTP server.
    *   Creates an instance of `UserManager` to handle user connections.
    *   Listens for new socket connections using `io.on("connection", ...)`.
    *   Logs when a user connects and disconnects.

*   **`UserManager.ts`:**
    *   Manages a list of connected `users` and a `queue` of users waiting to be matched.
    *   `addUser()`: Adds a new user to the `users` list and the `queue`. Emits a "lobby" event to the user's socket.
    *   `removeUser()`: Removes a user from both the `users` list and the `queue` when they disconnect.
    *   `clearQueue()`:  The heart of the matching system! If there are at least two users in the `queue`, it pairs them up by creating a room using the `RoomManager`.
    *   `initHandlers()`: Sets up event listeners on the user's socket to handle WebRTC signaling messages ("offer", "answer", "add-ice-candidate").

*   **`RoomManager.ts`:**
    *   Manages a `rooms` map, where each key is a unique room ID, and the value contains the two users in that room.
    *   `createRoom()`: Generates a unique room ID, creates a new entry in the `rooms` map, and emits a "send-offer" event to the first user's socket, initiating the WebRTC connection process.
    *   `onOffer()`, `onAnswer()`, `onIceCandidates()`: These methods handle the relaying of WebRTC signaling data between the two peers in a room. When one user sends an offer, answer, or ICE candidate, this backend forwards it to the other user in the same room.



## 🤝 Contributing

Got ideas for improvements or found a bug?  Contributions are welcome! 🎉  Feel free to open issues or submit pull requests. Please follow these general guidelines:

*   **Keep it clean:** Write clear, well-documented code.
*   **Test your changes:**  While there aren't explicit tests in this example, try to think through the impact of your changes.
*   **One feature per pull request:** Makes it easier to review and merge.



## 📜 License

This project is open-source and available under the **ISC License**. Feel free to use, modify, and distribute it as you see fit.



## 📧 Contact

Have questions or just want to chat about the project?  Feel free to reach out!  You can contact me at [your\_email@example.com](mailto:your_email@example.com) or find me on [your\_social\_media].

Happy connecting! 💬😊
