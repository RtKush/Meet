// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// declare global {
//   interface Window {
//     pcr: RTCPeerConnection;
//   }
// }
// const arrse = [];
// // const URL = "http://localhost:3000";
// const URL = import.meta.env.VITE_SOCKET_URL;

// const Room = ({
//   name,
//   localAudioTrack,
//   localVideoTrack,
// }: {
//   name: string;
//   localAudioTrack: MediaStreamTrack | null;
//   localVideoTrack: MediaStreamTrack | null;
// }) => {
//   const [socket, setSocket] = useState<null | Socket>(null);
//   const [lobby, setLobby] = useState<boolean>(true);
//   const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
//   const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(
//     null
//   );
//   const [remoteVideoTrack, setRemoteVideoTrack] =
//     useState<MediaStreamTrack | null>(null);

//   const [remoteAudioTrack, setRemoteAudioTrack] =
//     useState<MediaStreamTrack | null>(null);
//   const [remoteMediaStream, setRemoteMediaStream] =
//     useState<MediaStream | null>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);

//   arrse.push(
//     socket,
//     sendingPc,
//     receivingPc,
//     remoteVideoTrack,
//     setRemoteVideoTrack,
//     remoteAudioTrack,
//     setRemoteAudioTrack,
//     remoteMediaStream
//   );

//   useEffect(() => {
//     console.log("Socket on connect");
//     const socket = io(URL);
//     socket.on("send-offer", async ({ roomId }) => {
//       setLobby(false);
//       const pc = new RTCPeerConnection();
//       setSendingPc(pc);
//       if (localVideoTrack) {
//         pc.addTrack(localVideoTrack);
//       }
//       if (localAudioTrack) {
//         pc.addTrack(localAudioTrack);
//       }

//       pc.onicecandidate = async (e) => {
//         console.log("Receiving ice candidate locally");
//         if (e.candidate) {
//           socket.emit("add-ice-candidate", {
//             candidate: e.candidate,
//             roomId: roomId,
//             type: "sender",
//           });
//         }
//       };

//       pc.onnegotiationneeded = async () => {
//         console.log("On Negotiation needed");

//         const sdp = await pc.createOffer();
//         await pc.setLocalDescription(sdp);
//         socket.emit("offer", { sdp, roomId });
//       };
//     });

//     socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
//       // socket.emit("answer", { sdp: "", roomId });
//       setLobby(false);
//       console.log("remote sdp========================= offer", remoteSdp);
//       console.log("Receiving offer");

//       const pc = new RTCPeerConnection();
     
      
//       // pc.ontrack = (e) => {
//       //   const { track, type } = e;
//       //   console.log(track);
//       //   console.log("type====================", type);
//       //   // if (track.kind == "audio") {
//       //   //   setRemoteAudioTrack(track);
//       //   //   (remoteVideoRef.current?.srcObject as MediaStream)?.addTrack(track);
//       //   // } else {
//       //   //   setRemoteVideoTrack(track);
//       //   //   (remoteVideoRef.current?.srcObject as MediaStream)?.addTrack(track);
//       //   // }

//       //   // stream.addTrack(track);
//       //   // remoteVideoRef.current?.play();
//       // };
      
//       pc.setRemoteDescription(remoteSdp);
//       const sdp = await pc.createAnswer();
//       pc.setLocalDescription(sdp);
//       const stream = new MediaStream();
      
      

//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = stream;
//       }
//       setRemoteMediaStream(stream);
//       setReceivingPc(pc);
//       window.pcr  = pc;
      

//       // trickle Ice
      
//       pc.onicecandidate = async (e) => {
//         if(!e.candidate) {
//           return;
//         }


//         if (e.candidate) {
//           socket.emit("add-ice-candidate", {
//             candidate: e.candidate,
//             roomId: roomId,
//             type: "receiver",
//           });
//         }
//       };


//       // pc.ontrack = (e) => {
//       //   const { track, type } = e;
//       //   console.log(track);
//       //   console.log("type====================", type);
//       //   if (track.kind == "audio") {
//       //     setRemoteAudioTrack(track);
//       //     (remoteVideoRef.current?.srcObject as MediaStream)?.addTrack(track);
//       //   } else {
//       //     setRemoteVideoTrack(track);
//       //     (remoteVideoRef.current?.srcObject as MediaStream)?.addTrack(track);
//       //   }

//       //   stream.addTrack(track);
//       //   remoteVideoRef.current?.play();
//       // };



//       console.log("-----=====dsff", pc.ontrack);

//       socket.emit("answer", {
//         roomId,
//         sdp,
//       });

//       setTimeout(()=> {
//         const track1 = pc.getTransceivers()[0].receiver.track;
//         const track2 = pc.getTransceivers()[1].receiver.track;
//         console.log(track1);

//         if(track1.kind === "video" ) {
//           setRemoteAudioTrack(track2);
//           setRemoteVideoTrack(track1);
//         } else {
//           setRemoteAudioTrack(track1);
//           setRemoteVideoTrack(track2);
//         }

//         (remoteVideoRef?.current?.srcObject as MediaStream)?.addTrack(track1)  ;
//         (remoteVideoRef?.current?.srcObject as MediaStream)?.addTrack(track2)  ;
//         remoteVideoRef.current?.play();


//       },5000)
//     });

//     socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
//       console.log(roomId);
//       setLobby(false);
//       console.log("remote sdp========================= answer", remoteSdp);
//       setSendingPc((pc) => {
//         if (remoteSdp) {
//           console.log("setting remote sdp");
//           pc?.setRemoteDescription(remoteSdp as RTCSessionDescription);
//         }
//         return pc;
//       });
//       console.log("loop closed");
//     });

//     socket.on("lobby", () => {
//       setLobby(false);
//     });

//     socket.on("add-ice-candidate", async ({ candidate, type }) => {
//       console.log("adding ice candate from remote");

//       console.log(type, candidate);

//       if (type === "sender") {
//         setReceivingPc((pc) => {
//           pc?.addIceCandidate(candidate);
//           return pc;
//         });
//       } else {
//         setSendingPc((pc) => {
//           pc?.addIceCandidate(candidate);
//           return pc;
//         });
//       }
//     });
//     setSocket(socket);
//   }, [name]);

//   useEffect(() => {
//     if (localVideoRef.current) {
//       if (localVideoTrack) {
//         localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
//       }
//       localVideoRef.current.play();
//     }
//   }, [localVideoRef]);

//   return (
//     <div>
//       hi {name}
      
//       <video autoPlay width={400} height={400} ref={localVideoRef} />
//       {lobby ? <p>Waiting to connect to you some one</p> : null}
//       <video autoPlay width={400} height={400} ref={remoteVideoRef}  className="border m-4 "/>
//     </div>
//   );
// };

// export default Room;


import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type RoomProps = {
  name?: string;
  localAudioTrack?: MediaStreamTrack | null;
  localVideoTrack?: MediaStreamTrack | null;
};

const Room: React.FC<RoomProps> = ({ name, localAudioTrack, localVideoTrack }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const s = io("https://meet-server-eyyx.onrender.com/"); // your backend Socket.IO server
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to signaling server");
      s.emit("join-room", { name });
    });

    s.on("offer", async ({ offer }) => {
      if (!peerConnection.current) createPeerConnection(s);

      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer!);
      s.emit("answer", { answer });
    });

    s.on("answer", async ({ answer }) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
    });

    s.on("ice-candidate", ({ candidate }) => {
      peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      const stream = new MediaStream([localVideoTrack]);
      localVideoRef.current.srcObject = stream;
    }

    if (peerConnection.current && localVideoTrack && localAudioTrack) {
      peerConnection.current.addTrack(localVideoTrack);
      peerConnection.current.addTrack(localAudioTrack);
    }
  }, [localVideoTrack, localAudioTrack]);

  const createPeerConnection = (s: Socket) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        s.emit("ice-candidate", { candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        const [stream] = event.streams;
        remoteVideoRef.current.srcObject = stream;
      }
    };

    peerConnection.current = pc;
    return pc;
  };

  const startCall = async () => {
    if (!socket) return;
    const pc = createPeerConnection(socket);

    if (localVideoTrack && localAudioTrack) {
      pc.addTrack(localVideoTrack);
      pc.addTrack(localAudioTrack);
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("offer", { offer });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl">Welcome to the Room</h1>
      <p>{name ? `Name: ${name}` : "No name provided"}</p>

      <video ref={localVideoRef} autoPlay muted className="w-1/2 border" />
      <video ref={remoteVideoRef} autoPlay className="w-1/2 border" />

      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={startCall}
      >
        Start Call
      </button>
    </div>
  );
};

export default Room;
