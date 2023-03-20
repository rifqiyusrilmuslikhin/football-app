class StandingsHandler {
    constructor(standingsService, validator) {
      this._standingsService = standingsService;
      this._validator = validator;
  
      this.getStandingsHandler = this.getStandingsHandler.bind(this);
    }
  
    async getStandingsHandler() {
      const standings = await this._standingsService.getStanding();
      return {
        status: 'success',
        data: {
          standings,
        },
      };
    }

  }
  
  module.exports = StandingsHandler;