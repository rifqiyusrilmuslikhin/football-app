const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MatchesService {
  constructor(clubsService, standingsService) {
    this._pool = new Pool();   
    this._clubsService = clubsService;
    this._standingsService = standingsService;
  }

  async addMatch({ home_team, away_team, home_score, away_score }) {
    await this._clubsService.getClubById(home_team);
    await this._clubsService.getClubById(away_team);

    const id = `match-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO match VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, home_team, away_team, home_score, away_score],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id || home_team === away_team) {
        throw new InvariantError('Match gagal ditambahkan');
    }

    const match = result.rows[0].id;

    await this._standingsService.updateTeamStanding(home_team, away_team, home_score, away_score);

    return match;

  }

}

module.exports = MatchesService;
