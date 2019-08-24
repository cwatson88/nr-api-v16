import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://darwin-dist-44ae45.nationalrail.co.uk:",
  connectHeaders: {
    login: "DARWIN36173385-d7f3-4aa6-aa7a-76666f70dfcd",
    passcode: "db02daae-f229-4793-9a9a-012cac0e02e8"
  },
  debug: function(str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000
});

client.onConnect = function(frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};

client.onStompError = function(frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

client.activate();
