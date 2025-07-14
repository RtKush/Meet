import { useEffect, useRef, useState } from "react";
import Room from "./Room";

const Landing = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);

      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([videoTrack]);
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
    }
  };

  useEffect(() => {
    getCam();
  }, []);

  if (!joined) {
    return (
      <div className="flex flex-col items-center gap-3">
        <video
          autoPlay
          ref={videoRef}
          className="w-80 h-60 rounded-xl border"
        />
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-xl border border-black"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded-xl"
            onClick={() => {
              setJoined(true);
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};

export default Landing;
