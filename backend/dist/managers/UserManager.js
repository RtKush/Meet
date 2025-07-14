"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    addUser(name, socket) {
        this.users.push({
            name,
            socket,
        });
        this.queue.push(socket.id);
        socket.emit("lobby");
        this.clearQueue();
        this.initHandlers(socket);
    }
    removeUser(socketId) {
        this.users = this.users.filter((x) => x.socket.id === socketId);
        this.queue = this.queue.filter((x) => x === socketId);
    }
    clearQueue() {
        console.log("Inside clear queue");
        console.log(this.queue.length);
        if (this.queue.length < 2) {
            return;
        }
        // console.log(this.users);
        console.log(this.queue);
        const id1 = this.queue.pop();
        const id2 = this.queue.pop();
        console.log("ids is", id1 + " __" + id2);
        const user1 = this.users.find((x) => x.socket.id === id1);
        const user2 = this.users.find((x) => x.socket.id === id2);
        console.log(user1 === null || user1 === void 0 ? void 0 : user1.name, user2 === null || user2 === void 0 ? void 0 : user2.name);
        if (!user1 || !user2) {
            return;
        }
        console.log("creating room");
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        console.log("init handler");
        console.log(socket.id);
        socket.on("offer", ({ sdp, roomId }) => {
            console.log("room id", roomId);
            console.log("received offer");
            this.roomManager.onOffer(roomId, sdp, socket.id);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            console.log("room id", roomId);
            console.log("received answer");
            this.roomManager.onAnswer(roomId, sdp, socket.id);
        });
        socket.on("add-ice-candidate", ({ candidate, roomId, type }) => {
            console.log("room id", roomId);
            console.log("type", type);
            this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
        });
    }
}
exports.UserManager = UserManager;
