const MatchesHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'matches',
  version: '1.0.0',
  register: async (server, { matchesService, validator }) => {
    const matchesHandler = new MatchesHandler(matchesService, validator);
    server.route(routes(matchesHandler));
  },
};