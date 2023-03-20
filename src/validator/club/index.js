const InvariantError = require('../../exceptions/InvariantError');
const { ClubPayloadSchema } = require('./schema');

const ClubsValidator = {
  validateClubPayload: (payload) => {
    const validationResult = ClubPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ClubsValidator;