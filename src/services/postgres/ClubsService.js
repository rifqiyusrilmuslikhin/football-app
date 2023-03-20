const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToClubModel } = require('../../utils');

class ClubsService {
  constructor(standingsService) {
    this._pool = new Pool();   
    this._standingsService = standingsService;
  }

  async addClub({ nama_klub, asal_kota }) {
    await this.verifyNewClub(nama_klub);
    const id = `club-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO club VALUES($1, $2, $3) RETURNING id',
      values: [id, nama_klub, asal_kota],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Klub gagal ditambahkan');
    }

    const club = result.rows[0].id;

    await this._standingsService.addClubToStanding(club);

    return club;

  }

  async getClubs() {
    const result = await this._pool.query('SELECT * FROM club');
    return result.rows;
  }

  async getClubById(id) {
    const query = {
      text: 'SELECT * FROM club WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Klub tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyNewClub(nama_klub) {
    const query = {
      text: 'SELECT nama_klub FROM club WHERE nama_klub = $1',
      values: [nama_klub],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan klub. Klub sudah digunakan.');
    }
  }

}

module.exports = ClubsService;
