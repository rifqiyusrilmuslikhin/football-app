const StandingsHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'standings',
  version: '1.0.0',
  register: async (server, { standingsService, validator }) => {
    const standingsHandler = new StandingsHandler(standingsService, validator);
    server.route(routes(standingsHandler));
  },
};