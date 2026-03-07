module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgrers',
    password: 'postgres',
    database: 'devburger_postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },

  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgrers',
    password: 'postgres',
    database: 'devburger_postgres_test',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },

  production: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgrers',
    password: 'postgres',
    database: 'devburger_postgres_prod',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
