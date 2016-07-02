let constants = require('../constants').constants;
let commands = require('../commands/variables');

module.exports = function (sessionId, isCondition) {
  isCondition = isCondition || false;
  let _then = commands.then;
  let notThen = '';
  for (let i = 0; i < _then.length; i++) {
    notThen += '[^\\' + _then[i] + ']';
  }

  let toReplace = [{
    command: '(' + commands.not + ')\\s*\\(',
    definition: '!('
  }, {
    command: commands.true,
    definition: 'true'
  }, {
    command: commands.false,
    definition: 'false'
  }, {
    command: commands.or,
    definition: '||'
  }, {
    command: commands.and1,
    definition: '&&'
  }, {
    command: commands.and2,
    definition: '&&'
  }, {
    command: commands.output + '\\s+([^\\n\\r\\;]*)\\s*;',
    definition: sessionId + '._output += ($1) + \'\\n\';'
  }, {
    command: commands.if + '\\s+([^\\r\\n]*[^\\' + commands.then + '])( ' + commands.then + ')*',
    definition: 'if ($1)'
  }, {
    command: commands.while + '\\s+(.*)\\s*',
    definition: 'while ($1)'
  }, {
    command: commands.else,
    definition: 'else'
  }, {
    command: commands.break,
    definition: 'break'
  }, {
    command: commands.continue,
    definition: 'continue'
  }, {
    command: commands.function + ' \\s*\\(([^\\n\\r\\;])\\)\\s*',
    definition: 'function ($1)'
  }, {
    command: '#',
    definition: '//'
  }
    /*{
     command: 'Math.pi',
     definition: 'Math.PI'
     }, {
     command: 'Math.e',
     definition: 'Math.E'
     },*/
  ];

  if (!isCondition) {
    toReplace.push({
      command: '^([\\s\\S]*)$',
      definition: 'function _compile() {\
            ' + sessionId + '._output = \'\';\
            $1\n\
            return ' + sessionId + '._output;\
            }\
            _compile();'
    })
  }

  return {
    initialize: 'global.' + sessionId + ' = {}',
    unInitialize: sessionId + ' = {};',
    replace: toReplace
  }
};
