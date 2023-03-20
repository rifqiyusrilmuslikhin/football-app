const routes = (handler) => [
    {
      method: 'GET',
      path: '/api/standings',
      handler: handler.getStandingsHandler,
    }
  ];
  
  module.exports = routes;