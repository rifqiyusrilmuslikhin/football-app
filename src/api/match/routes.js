const routes = (handler) => [
    {
      method: 'POST',
      path: '/api/matches',
      handler: handler.postMatchHandler,
    }
  ];
  
  module.exports = routes;