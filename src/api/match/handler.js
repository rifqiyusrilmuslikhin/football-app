class MatchesHandler {
    constructor(matchesService, validator) {
      this._matchesService = matchesService;
    //   this._clubsService = clubsService;
      this._validator = validator;
  
      this.postMatchHandler = this.postMatchHandler.bind(this);
    //   this.getClubsHandler = this.getClubsHandler.bind(this);
    //   this.getClubByIdHandler = this.getClubByIdHandler.bind(this);
    }
  
    async postMatchHandler(request, h) {
      this._validator.validateMatchesPayload(request.payload);
      const { home_team, away_team, home_score, away_score } = request.payload;
  
      const matchId = await this._matchesService.addMatch({ home_team, away_team, home_score, away_score });
  
      const response = h.response({
        status: 'success',
        message: 'match berhasil ditambahkan',
        data: {
          matchId,
        },
      });
      response.code(201);
      return response;
    }

  }
  
  module.exports = MatchesHandler;