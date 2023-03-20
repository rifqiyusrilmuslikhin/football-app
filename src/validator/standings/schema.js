const Joi = require('joi');

const AddClubToStanding = Joi.object({
    club_id: Joi.string().required(),
    played: Joi.number().integer(),
    win: Joi.number().integer(),
    draw: Joi.number().integer(),
    lost: Joi.number().integer(),
    goals_for: Joi.number().integer(),
    goals_against: Joi.number().integer(),
    points: Joi.number().integer()
});

module.exports = { AddClubToStanding };
