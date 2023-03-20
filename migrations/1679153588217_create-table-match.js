/* eslint-disable camelcase */

exports.up = (pgm) => {
	pgm.createTable('match', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        home_team: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        away_team: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        home_score: {
            type: 'INTEGER',
            notNull: true,
        },
        away_score: {
            type: 'INTEGER',
            notNull: true,
        }
    });

    pgm.addConstraint('match','fk_match.home_team_club.id','FOREIGN KEY(home_team) REFERENCES club(id) ON DELETE CASCADE');

    pgm.addConstraint('match','fk_match.away_team_club.id','FOREIGN KEY(away_team) REFERENCES club(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('match');
};