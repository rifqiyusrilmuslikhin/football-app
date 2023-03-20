const ClubsHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'clubs',
  version: '1.0.0',
  register: async (server, { clubsService, validator }) => {
    const clubsHandler = new ClubsHandler(clubsService, validator);
    server.route(routes(clubsHandler));
  },
};