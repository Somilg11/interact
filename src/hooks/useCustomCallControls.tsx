import { useCall } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, CircleDot, StopCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CustomControls({ isMicOn: initialMicOn, isCameraOn: initialCameraOn }: { 
  isMicOn: boolean; 
  isCameraOn: boolean;
}) {
  const call = useCall();
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(initialMicOn);
  const [isCameraOn, setIsCameraOn] = useState(initialCameraOn);
  const [isRecording, setIsRecording] = useState(false);

  if (!call) return null;

  const toggleRecording = async () => {
    if (isRecording) {
      await call.stopRecording();
    } else {
      await call.startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex items-center gap-3 p-2 bg-gray-900 rounded-lg">
      {/* Mic Button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        onClick={() => {
          call.microphone.toggle();
          setIsMicOn((prev) => !prev);
        }}
      >
        {isMicOn ? <Mic className="size-5" /> : <MicOff className="size-5 text-red-500" />}
      </Button>

      {/* Camera Button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        onClick={() => {
          call.camera.toggle();
          setIsCameraOn((prev) => !prev);
        }}
      >
        {isCameraOn ? <Video className="size-5" /> : <VideoOff className="size-5 text-red-500" />}
      </Button>

      {/* Screen Share Button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        onClick={() => call.screenShare.toggle()}
      >
        <Monitor className="size-5" />
      </Button>

      {/* Recording Button */}
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        className="size-10"
        onClick={toggleRecording}
      >
        {isRecording ? <StopCircle className="size-5 text-red-500" /> : <CircleDot className="size-5 text-green-500" />}
      </Button>

      {/* End Call Button (Redirects to "/") */}
      <Button
        variant="destructive"
        size="icon"
        className="size-10 bg-red-600 hover:bg-red-700"
        onClick={() => {
          call.leave();
          router.push("/");
        }}
      >
        <PhoneOff className="size-5" />
      </Button>
    </div>
  );
}
