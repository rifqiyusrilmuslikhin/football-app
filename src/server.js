require('dotenv').config();

const Hapi = require('@hapi/hapi');

const ClientError = require('./exceptions/ClientError');

const clubs = require('./api/club');
const ClubsService = require('./services/postgres/ClubsService');
const ClubsValidator = require('./validator/club');

const standings = require('./api/standings');
const StandingsService = require('./services/postgres/StandingsService');
const StandingsValidator = require('./validator/standings');

const matches = require('./api/match');
const MatchesService = require('./services/postgres/MatchesService');
const MatchesValidator = require('./validator/match');

const init = async () => {
  const standingsService = new StandingsService();
  const clubsService = new ClubsService(standingsService);
  const matchesService = new MatchesService(clubsService, standingsService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: clubs,
      options: {
        clubsService,
        standingsService,
        validator: ClubsValidator,
      },
    },
    {
      plugin: standings,
      options: {
        standingsService,
        validator: StandingsValidator,
      },
    },
    {
      plugin: matches,
      options: {
        matchesService,
        clubsService,
        standingsService,
        validator: MatchesValidator,
      },
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError){
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
