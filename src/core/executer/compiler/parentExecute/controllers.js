let _ = require('lodash');

const constants = require('../../../../constants');
const TIMEOUT = constants.STATUS.TIMEOUT;
const SESSION_END = constants.STATUS.SESSION_END;

let controller = {
  manage: sessionId => {
    console.llog('compiler: controller', 'begin');
    console.llog(__store[sessionId].pathOfLocation);

    const exKey = controller.oscillation(sessionId);
    controller.directive(sessionId, exKey);

    console.llog(__store[sessionId].pathOfLocation);
    console.llog('compiler: controller', 'end');
  },
  oscillation: sessionId => {
    console.llog('compiler: oscillation');

    let management = require('../management');

    setter.indexIncrement(sessionId);

    if (checker.session.expired(sessionId)) {
      setter.output(sessionId, {
        id: TIMEOUT,
      });
      console.llog('compiler: trigger: timeout');
      throw new Error(TIMEOUT);
    }

    if (checker.array.ended(sessionId)) {
      setter.downgrade(sessionId);

      if (checker.session.pathOfLocationEnded(sessionId)) {
        console.llog('compiler: trigger: session ended');
        throw new Error(SESSION_END);
      }
    }

    return getter.nameOfProperty(sessionId);
  },


  directive: function (sessionId, exKey) {
    console.llog('compiler: directive', 'begin');

    let currentParentObject = getter.object(sessionId);
    let nameOfProperty = getter.nameOfProperty(sessionId);


    if (nameOfProperty == 'child' && exKey == 'child') {
      //child[N++]

      //execute after passing if-else
      if (currentParentObject.hasOwnProperty('parent')) {
        upgrade(sessionId, 'parent');
      }

      if (currentParentObject.hasOwnProperty('toCompile')) {
        upgrade(sessionId, 'toCompile');
      }

      if (getter.nameOfProperty(sessionId) != 'toCompile') {
        controller.manage(sessionId);
      }
    } else if (nameOfProperty == 'toCompile') {
      positions.toCompile(sessionId);
    }

    console.llog('compiler: directive', 'end');
  },

};

exports.controller = controller.manage;

exports.prepareToCompile = function (sessionId, inputValue) {
  let codeToCompile = _.cloneDeep(getter.operations(sessionId));
  let inputOperation = '';
  if (inputValue) {
    inputOperation = evaluate.inputOperation(sessionId, inputValue);
    codeToCompile.unshift(inputOperation);
  }
  return codeToCompile;
};

let evaluate = require('../evaluate');

let getter = require('../../getter');

let setter = require('../../setter');

let checker = require('../../checker');

let upgrade = exports.upgrade = require('./positions').upgrade;

const positions = require('./positions');