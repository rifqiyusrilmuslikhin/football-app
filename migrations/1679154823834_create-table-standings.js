/* eslint-disable camelcase */

exports.up = (pgm) => {
	pgm.createTable('standings', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        club_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        played: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        win: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        draw: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        lost: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        goals_for: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        goals_against: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
        points: {
            type: 'INTEGER',
            notNull: true,
            default: 0,
        },
    });

    pgm.addConstraint('standings','fk_match.club_id_club.id','FOREIGN KEY(club_id) REFERENCES club(id) ON DELETE CASCADE');

};

exports.down = (pgm) => {
    pgm.dropTable('standings');
};