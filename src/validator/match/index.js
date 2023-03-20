const InvariantError = require('../../exceptions/InvariantError');
const { AddMatchPayload } = require('./schema');
 
const MatchesValidator = {
  validateMatchesPayload: (payload) => {
    const validationResult = AddMatchPayload.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = MatchesValidator;