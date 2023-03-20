const InvariantError = require('../../exceptions/InvariantError');
const { AddClubToStanding } = require('./schema');
 
const StandingsValidator = {
  validateStandingPayload: (payload) => {
    const validationResult = AddClubToStanding.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
  
};

module.exports = StandingsValidator;