"use strict";

/*

This is the backend for voice channels in eaglercraft, it links with TeaVM EaglerAdapter at runtime

Copyright 2022 Calder Young. All rights reserved.

Based on code written by ayunami2000

*/

window.initializeVoiceClient = (() => {

	const READYSTATE_NONE = 0;
	const READYSTATE_ABORTED = -1;
	const READYSTATE_DEVICE_INITIALIZED = 1;

	const TASKSTATE_NONE = -1;
	const TASKSTATE_LOADING = 0;
	const TASKSTATE_COMPLETE = 1;
	const TASKSTATE_FAILED = 2;

	class EaglercraftVoicePeer {

		constructor(client, peerId, peerConnection) {
			this.client = client;
			this.peerId = peerId;
			this.peerConnection = peerConnection;
			
			const self = this;
			this.peerConnection.addEventListener("icecandidate", (evt) => {
				if(evt.candidate) {
					self.client.iceCandidateHandler(self.peerId, evt.candidate.sdpMLineIndex, evt.candidate.candidate.toJSON().stringify());
				}
			});
			
			this.peerConnection.addEventListener("track", (evt) => {
				self.client.peerTrackHandler(self.peerId, evt.streams[0]);
			});
			
			this.peerConnection.addStream(this.client.localMediaStream);
			this.peerConnection.createOffer((desc) => {
				const selfDesc = desc;
				self.peerConnection.setLocalDescription(selfDesc, () => {
					self.client.descriptionHandler(self.peerId, selfDesc.toJSON().stringify());
				}, (err) => {
					console.error("Failed to set local description for \"" + self.peerId + "\"! " + err);
					self.client.signalDisconnect(self.peerId);
				});
			}, (err) => {
				console.error("Failed to set create offer for \"" + self.peerId + "\"! " + err);
				self.client.signalDisconnect(self.peerId);
			});
			
			this.peerConnection.addEventListener("connectionstatechange", (evt) => {
				if(evt.connectionState === 'disconnected') {
					self.client.signalDisconnect(self.peerId);
				}
			});
			
		}
		
		disconnect() {
			this.peerConnection.close();
		}

		setRemoteDescription(descJSON) {
			const self = this;
			const remoteDesc = JSON.parse(descJSON);
			this.peerConnection.setRemoteDescription(remoteDesc, () => {
				if(remoteDesc.type == 'offer') {
					self.peerConnection.createAnswer((desc) => {
						const selfDesc = desc;
						self.peerConnection.setLocalDescription(selfDesc, () => {
							self.client.descriptionHandler(self.peerId, selfDesc.toJSON().stringify());
						}, (err) => {
							console.error("Failed to set local description for \"" + self.peerId + "\"! " + err);
							self.signalDisconnect(peerId);
						});
					}, (err) => {
						console.error("Failed to create answer for \"" + self.peerId + "\"! " + err);
						self.signalDisconnect(peerId);
					});
				}
			}, (err) => {
				console.error("Failed to set remote description for \"" + self.peerId + "\"! " + err);
				self.signalDisconnect(peerId);
			});
		}
		
		addICECandidate(candidate) {
			this.peerConnection.addICECandidate(new RTCIceCandidate(JSON.parse(candidate)));
		}

	}

	class EaglercraftVoiceClient {

		constructor() {
			this.ICEServers = [];
			this.hasInit = false;
			this.peerList = new Map();
			this.readyState = READYSTATE_NONE;
			this.taskState = TASKSTATE_NONE;
			this.iceCandidateHandler = null;
			this.descriptionHandler = null;
			this.peerTrackHandler = null;
			this.peerDisconnectHandler = null;
			this.microphoneVolumeAudioContext = new AudioContext();
		}

		voiceClientSupported() {
			return typeof window.RTCPeerConnection !== "undefined" && typeof navigator.mediaDevices !== "undefined" &&
				typeof navigator.mediaDevices.getUserMedia !== "undefined";
		}

		setICEServers(urls) {
			this.ICEServers.length = 0;
			for(var i = 0; i < urls.length; ++i) {
				this.ICEServers.push({ urls: urls[i] });
			}
		}
		
		setICECandidateHandler(cb) {
			this.iceCandidateHandler = cb;
		}
		
		setDescriptionHandler(cb) {
			this.descriptionHandler = cb;
		}
		
		setPeerTrackHandler(cb) {
			this.peerTrackHandler = cb;
		}
		
		setPeerDisconnectHandler(cb) {
			this.peerDisconnectHandler = cb;
		}

		activateVoice(tk) {
			this.localRawMediaStream.getAudioTracks()[0].enabled = tk;
		}
		
		intitializeDevices() {
			if(!this.hasInit) {
				this.taskState = TASKSTATE_LOADING;
				const self = this;
				navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
					self.localRawMediaStream = stream;
					self.localRawMediaStream.getAudioTracks()[0].enabled = false;
					self.localMediaStream = self.microphoneVolumeAudioContext.createMediaStreamDestination();
					self.localMediaStreamGain = self.microphoneVolumeAudioContext.createGain();
					var localStreamIn = self.microphoneVolumeAudioContext.createMediaStreamSource(stream);
					localStreamIn.connect(self.localMediaStreamGain);
					self.localMediaStreamGain.connect(self.localMediaStream);
					self.localMediaStreamGain.gain = 1.0;
					self.readyState = READYSTATE_DEVICE_INITIALIZED;
					self.taskState = TASKSTATE_COMPLETE;
					this.hasInit = true;
				}).catch(() => {
					self.readyState = READYSTATE_ABORTED;
					self.taskState = TASKSTATE_FAILED;
				});
			}else {
				self.readyState = READYSTATE_DEVICE_INITIALIZED;
				self.taskState = TASKSTATE_COMPLETE;
			}
		}
		
		setMicVolume(val) {
			if(val > 0.5) val = 0.5 + (val - 0.5) * 2.0;
			if(val > 1.5) val = 1.5;
			if(val < 0.0) val = 0.0;
			self.localMediaStreamGain.gain = val * 2.0;
		}

		getTaskState() {
			return this.taskState;
		}

		getReadyState() {
			return this.readyState;
		}

		signalConnect(peerId) {
			const peerConnection = new RTCPeerConnection({ iceServers: this.ICEServers, optional: [ { DtlsSrtpKeyAgreement: true } ] });
			const peerInstance = new EaglercraftVoicePeer(this, peerId, peerConnection);
			this.peerList.set(peerId, peerInstance);
		}
		
		signalDescription(peerId, descJSON) {
			var thePeer = this.peerList.get(peerId);
			if((typeof thePeer !== "undefined") && thePeer !== null) {
				thePeer.setRemoteDescription(descJSON);
			}
		}

		signalDisconnect(peerId) {
			var thePeer = this.peerList.get(peerId);
			if((typeof thePeer !== "undefined") && thePeer !== null) {
				this.peerList.delete(thePeer);
				try {
					thePeer.disconnect();
				}catch(e) {}
				this.peerDisconnectHandler(peerId);
			}
		}
		
		signalICECandidate(peerId, candidate) {
			var thePeer = this.peerList.get(peerId);
			if((typeof thePeer !== "undefined") && thePeer !== null) {
				thePeer.addICECandidate(candidate);
			}
		}
		
	}

	window.constructVoiceClient = () => new EaglercraftVoiceClient();
});

window.startVoiceClient = () => {
	if(typeof window.constructVoiceClient !== "function") {
		window.initializeVoiceClient();
	}
	return window.constructVoiceClient();
};