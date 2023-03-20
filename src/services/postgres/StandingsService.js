const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class StandingsService {
  constructor() {
    this._pool = new Pool();
  }

  async addClubToStanding(club_id) {
    const id = `standings-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO standings VALUES($1, $2) RETURNING id',
      values: [id, club_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Club gagal ditambahkan ke standings');
    }
  }

  async getStanding() {
    const result = await this._pool.query('SELECT club.nama_klub, played, win, draw, lost, goals_for, goals_against, points FROM standings JOIN club ON club.id = standings.club_id ORDER BY points DESC');
    return result.rows;
  }

  async getClubById(id) {
    const query = {
      text: 'SELECT * FROM standings WHERE club_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Klub tidak ditemukan');
    }

    return result.rows[0];
  }

  async updateTeamStatistic(club, goalsFor, goalsAgainst, result) {

    const played = club.played + 1;
    const win = club.win + (result === 'win' ? 1 : 0);
    const draw = club.draw + (result === 'draw' ? 1 : 0);
    const lost = club.lost + (result === 'lost' ? 1 : 0);
    const goalsForTotal = club.goals_for + goalsFor;
    const goalsAgainstTotal = club.goals_against + goalsAgainst;
    const points = win * 3 + draw;

    const query = {
      text: 'UPDATE standings SET played = $1, win = $2, draw = $3, lost = $4, goals_for = $5, goals_against = $6, points = $7 WHERE club_id = $8',
      values: [ played, win, draw, lost, goalsForTotal, goalsAgainstTotal, points, club.club_id ]
    }

    const res = await this._pool.query(query);
    return res.rows;
    
  }

  async updateTeamStanding(homeTeamId, awayTeamId, homeScore, awayScore) {
    const home_team = await this.getClubById(homeTeamId);
    const away_team = await this.getClubById(awayTeamId);

    await this.updateTeamStatistic(
      home_team,
      homeScore,
      awayScore,
      homeScore > awayScore ? 'win' : homeScore === awayScore ? 'draw' : 'lost'
    );

    await this.updateTeamStatistic(
      away_team,
      awayScore,
      homeScore,
      awayScore > homeScore ? 'win' : awayScore === homeScore ? 'draw' : 'lost'
    );

  }

}

module.exports = StandingsService;