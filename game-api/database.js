module.exports = function(context) {
  const Client = context('pgClient');
  const configConstructor = context('config');
  const config = configConstructor(context);
  console.log(config);

  function getClient() {
    return new Client({
      host: config.pgHost,
      user: config.pgUser,
      password: config.pgPassword,
      database: config.pgDatabase,
    });
  }

  const client = getClient();
  setTimeout(() =>
    client.connect((err) => {
      if (err) {
        console.log('failed to connect to postgres!');
      } else {
        console.log('successfully connected to postgres!');
        client.query('CREATE TABLE IF NOT EXISTS GameResult ' +
        '(ID SERIAL PRIMARY KEY, Won BOOL NOT NULL, Score INT NOT NULL, Total INT NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
          if (err) {
            console.log('error creating game result table!');
          } else {
            console.log('successfully created game result table!');
          }
          client.end();
        });
      }
    }), 2000);

  return {
    insertResult: (won, score, total, onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'INSERT INTO GameResult(Won, Score, Total, InsertedDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
            values: [won, score, total],
          };
          client.query(query, (err) => {
            if (err) {
              onError();
            } else {
              onSuccess();
            }
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOfGames: (onSuccess, onError) => {
      return executeDBQuery('SELECT COUNT(*) FROM GameResult', onError, onSuccess);
    },
    // Should call onSuccess with integer.
    getTotalNumberOfWins: (onSuccess, onError) => {
      return executeDBQuery('SELECT COUNT(*) FROM GameResult WHERE Won = true', onError, onSuccess);
    },
    // Should call onSuccess with integer.
    getTotalNumberOf21: (onSuccess, onError) => {
      onSuccess(0);
      return executeDBQuery('SELECT COUNT(*) FROM GameResult WHERE Score = 21', onError, onSuccess);
    },
  };
};
function executeDBQuery(query, onError, onSuccess) {
  const client = getClient();
  client.connect((err) => {
    if (err) {
      onError(err);
      client.end();
    } else {
      client.query(query, (err) => {
        if (err) {
          onError();
        } else {
          onSuccess();
        }
        client.end();
      });
    }
  });
  return;
}

