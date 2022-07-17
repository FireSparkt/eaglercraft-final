package net.lax1dude.eaglercraft.adapter.teavm;

import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.webaudio.MediaStreamAudioSourceNode;

public interface EaglercraftVoiceClient extends JSObject {
	
	int READYSTATE_NONE = 0;
	int READYSTATE_ABORTED = -1;
	int READYSTATE_DEVICE_INITIALIZED = 1;

	int TASKSTATE_NONE = -1;
	int TASKSTATE_LOADING = 0;
	int TASKSTATE_COMPLETE = 1;
	int TASKSTATE_FAILED = 2;

	boolean voiceClientSupported();
	
	void initializeDevices();

	// to ayunami - allow the server to tell the client what to put here
	void setICEServers(String[] urls);
	
	// to ayunami - this is the equivalent of your "EAG|VoiceIce" callback
	void setICECandidateHandler(ICECandidateHandler callback);

	// to ayunami - this is the equivalent of your "EAG|VoiceDesc" callback
	void setDescriptionHandler(DescriptionHandler callback);
	
	// to ayunami - this returns a "MediaStreamAudioSourceNode" for new peers
	void setPeerTrackHandler(PeerTrackHandler callback);
	
	// to ayunami - this is called when a peer disconnects (so you can remove their MediaStreamAudioSourceNode and stuff)
	void setPeerDisconnectHandler(PeerDisconnectHandler callback);
	
	void activateVoice(boolean active);
	
	void setMicVolume(float volume);
	
	int getTaskState();
	
	int getReadyState();
	
	int signalConnect(String peerId);
	
	int signalDescription(String peerId, String description);
	
	int signalDisconnect(String peerId);
	
	int signalICECandidate(String peerId, String candidate);
	
	@JSFunctor
	public static interface ICECandidateHandler extends JSObject {
		void call(String peerId, String sdpMLineIndex, String candidate);
	}
	
	@JSFunctor
	public static interface DescriptionHandler extends JSObject {
		void call(String peerId, String candidate);
	}
	
	@JSFunctor
	public static interface PeerTrackHandler extends JSObject {
		void call(String peerId, MediaStreamAudioSourceNode candidate);
	}
	
	@JSFunctor
	public static interface PeerDisconnectHandler extends JSObject {
		void call(String peerId);
	}

}
