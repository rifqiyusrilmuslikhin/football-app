const Joi = require('joi');

const AddMatchPayload = Joi.object({
    home_team: Joi.string().required(),
    away_team: Joi.string().required(),
    home_score: Joi.number().integer(),
    away_score: Joi.number().integer(),
});

module.exports = { AddMatchPayload };
