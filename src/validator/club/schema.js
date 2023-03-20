const Joi = require('joi');

const ClubPayloadSchema = Joi.object({
  nama_klub: Joi.string().required(),
  asal_kota: Joi.string().required(),
});

module.exports = { ClubPayloadSchema };
