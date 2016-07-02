let tools = require('../../../../libs/tools');
let _ = require('lodash');

exports.repeatCondition = function (sessionId, countOfRepeats) {
  let conditionName = this.conditionNameInit(sessionId, 'repeat');
  let operation = conditionName + ' = typeof(' + conditionName + ') == "undefined" ? 0 : ' + conditionName + ' + 1';
  return '(' + operation + ')<' + countOfRepeats;
};

exports.doCondition = function (sessionId, condition) {
  let conditionName = this.conditionNameInit(sessionId, 'do');
  condition = conditionName + ' = typeof(' + conditionName + ') == "undefined" ? true : ' + condition;
  return condition;
};

exports.ifCondition = function (sessionId, condition) {
  let conditionName = this.conditionNameInit(sessionId, 'if');
  condition = conditionName + ' = typeof(' + conditionName + ') == "undefined" ? ' + condition + ' : false';
  return condition;
};

exports.mainCondition = function (sessionId) {
  let conditionName = this.conditionNameInit(sessionId, 'main');
  return conditionName + ' = typeof(' + conditionName + ') == "undefined" ? true : false';
};

exports.conditionNameInit = function (sessionId, conditionType) {
  let randomIndex = _.random(9999);
  let sessionName = sessionId + '.';
  let repeatVarWithIndex = conditionType + '_' + randomIndex;
  return sessionName + repeatVarWithIndex;
};

let commands = require('../../../../database/commands/variables');