module.exports = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'userdb',
    },
    migrations: {
      directory: './migrations',
    },
  };