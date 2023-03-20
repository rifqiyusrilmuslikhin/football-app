exports.up = (pgm) => {
    pgm.createTable('club', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      nama_klub: {
        type: 'TEXT',
        notNull: true,
      },
      asal_kota: {
        type: 'TEXT',
        notNull: true,
      },
    });
  };
   
  exports.down = (pgm) => {
    pgm.dropTable('club');
  };
  