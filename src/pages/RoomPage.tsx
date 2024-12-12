import React from "react";
import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
    Chat
} from "@livekit/components-react";

import "@livekit/components-styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Track } from "livekit-client";

const serverUrl = "wss://haha-1b7hsnu1.livekit.cloud";

const RoomPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnLeave = () => {
        navigate(-1);
    };

    // Получаем токен и имя комнаты из state
    const { roomToken, roomName } = location.state || {};

    if (!roomToken || !roomName) {
        return (
            <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                <h1>Error: Missing room details</h1>
                <button onClick={() => navigate("/")}>Go back</button>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={false}
            audio={false}
            token={roomToken}
            serverUrl={serverUrl}
            data-lk-theme="default"
            style={{ height: "100vh", display: "flex", flexDirection: "row" }}
            onDisconnected={handleOnLeave}
        >
            <MyVideoConference />
            <RoomAudioRenderer />

            {/* Control Bar */}
            <ControlBar
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    zIndex: 2,
                }}
            />

            <Chat
                style={{
                    position: "absolute",
                    right: "0px",
                    bottom: "var(--lk-control-bar-height)",
                    width: "300px",
                    height: "calc(100vh - var(--lk-control-bar-height))", // Adjust height
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "8px",
                    zIndex: 1,
                }}
            />
        </LiveKitRoom>
    );
};

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: false },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    return (
        <GridLayout
            tracks={tracks}
            style={{
                height: "calc(100vh - var(--lk-control-bar-height))",
                width: "calc(100vw - 300px)", // Adjust for chat width
                marginRight: "300px", // To prevent overlap with chat
            }}
        >
            <ParticipantTile />
        </GridLayout>
    );
}


export default RoomPage;
