import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
  socket: Socket;
  name: string;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }

  addUser(name: string, socket: Socket) {
    this.users.push({
      name,
      socket,
    });
    this.queue.push(socket.id);
    socket.emit("lobby");
    this.clearQueue();
    this.initHandlers(socket);
  }

  removeUser(socketId: string) {
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
    console.log(user1?.name, user2?.name);

    if (!user1 || !user2) {
      return;
    }

    console.log("creating room");

    const room = this.roomManager.createRoom(user1, user2);
    this.clearQueue();
  }

  initHandlers(socket: Socket) {
    console.log("init handler");
    console.log(socket.id);
    socket.on("offer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      console.log("room id", roomId);
      console.log("received offer");
      this.roomManager.onOffer(roomId, sdp, socket.id);
    });

    socket.on("answer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      console.log("room id", roomId);
      console.log("received answer");
      this.roomManager.onAnswer(roomId, sdp, socket.id);
    });

    socket.on("add-ice-candidate", ({ candidate, roomId , type}: any) => {
      console.log("room id", roomId);
      console.log("type", type);
 
      this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
    });
  }
}
