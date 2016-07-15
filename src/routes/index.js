const LOCALHOST = [
  '::ffff:127.0.0.1',
  '::1'
];

let io = require('../io');

let code = require('../core/modifier/code');
let errorHandler = require('../core/errorHandler');
let compiler = require('../core/executer/compiler');
let ipAddress;

let sockets = {
  submit: function (receivedData) {
    let sourceCode = receivedData.sourceCode;
    let sessionId = receivedData.sessionId;

    require('../core/globals')(sessionId);

    sender.submitSuccess(sessionId);
    console.llog('Socket.IO: server: sourceCode has been successfully received!');

    let errorMessage = errorHandler.analyze(sourceCode, {ipAddress: ipAddress});
    if (errorMessage) {

      //TODO: Arman: put here mail logging system
      console.llog('Socket.IO: server: output text has been successfully send! (Hack attempt)');

      sender.evaluate(sessionId, errorMessage);

      return sender.sessionEnd(sessionId);
    }

    compiler.codeRun(sessionId, sourceCode, __language[sessionId].old);
  },

  disconnect: function () {
    console.llog('Socket.IO: server: One of connections closed.');
  },

  evaluated: function (receivedData) {
    let inputText = receivedData.inputText;
    let sessionId = receivedData.sessionId;
    console.llog('Socket.IO: server: \'' + inputText + '\' text successfully received!');

    compiler.listener(sessionId, inputText);
  },

  init: function (socket) {

    socket.on('submit', this.submit);

    socket.on('disconnect', this.disconnect);

    socket.on('evaluated', this.evaluated);

  }
};

let ipAddressResolver = function (ipAddress) {
  return LOCALHOST.indexOf(ipAddress) != -1 ? '\'localhost\'' : ipAddress
};

io.on('connection', function (socket) {

  ipAddress = ipAddressResolver(socket.handshake.address);
  console.llog('Socket.IO: server: New connection from ' + ipAddress);

  sockets.init(socket);

});

let formatter = require('../core/formatter');
let sender = require('../core/executer/sender');