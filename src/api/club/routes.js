const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/clubs',
    handler: handler.postClubHandler,
  },
  {
    method: 'GET',
    path: '/api/clubs',
    handler: handler.getClubsHandler,
  },
  {
    method: 'GET',
    path: '/api/clubs/{id}',
    handler: handler.getClubByIdHandler,
  }
];

module.exports = routes;