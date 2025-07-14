# PeerStream: Real-Time Peer-to-Peer Streaming Application Omegle Clone 🌐🎬

Welcome to **PeerStream**, an exciting real-time peer-to-peer streaming application inspired by Omegle, built using the MERN (MongoDB, Express, React, Node.js) full-stack framework. This project allows users to connect with each other instantly, enabling real-time audio and video communication.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Roadmap](#roadmap)

## Features 🚀

- **Real-Time Communication:** Instantly connect with other users for real-time audio and video streaming.
- **Lobby System:** Users are placed in a lobby and matched with another user when available.
- **Room Management:** Dynamically create and manage rooms for peer-to-peer connections.
- **Scalable Architecture:** Built with scalability in mind, using Socket.io for real-time communication.

## Project Structure 🛠️

The project is divided into two main parts:

- **Backend:** Located in the `backend` directory, built with Node.js, Express, and Socket.io.
- **Frontend:** Located in the `frontend` directory, built with React, TypeScript, and Vite.

## Getting Started 🚀

### Prerequisites 📋

- **Node.js** installed on your machine (https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

### Installation 🔧

#### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nasserml/peer-stream-omegle-clone-mearn-full-stack.git
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd peer-stream-omegle-clone-mearn-full-stack/backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

#### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application 🏁

1. **Start the backend server:**

   ```bash
   cd ../backend
   npm run dev
   ```

2. **Start the frontend development server:**

   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Open your browser and navigate to:** `http://localhost:3000`

## Usage 📱

- **Landing Page:** Enter your name and click "Join" to enter the lobby.
- **Lobby:** Wait to be matched with another user. Once matched, you will be redirected to the room.
- **Room:** Start communicating with the other user through audio and video streams.

## Contributing 🤝

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature/YourFeature`
3. **Make your changes and commit them:** `git commit -m 'Add YourFeature'`
4. **Push to the branch:** `git push origin feature/YourFeature`
5. **Open a pull request**

## License 📄

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🎉

- **Socket.io:** For real-time, bidirectional and event-based communication.
- **React:** For building the user interface.
- **Express:** For creating the backend API.
- **Vite:** For fast frontend development build.

## Roadmap 🗺️

- **Enhancements:** Improve user interface and experience.
- **Features:** Implement chat functionality alongside video and audio streams.
- **Scalability:** Optimize for handling a large number of concurrent connections.
- **Security:** Implement end-to-end encryption for streams.

