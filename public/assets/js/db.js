var data_team = [];

var dbPromise = idb.open("e-footin", 2, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore("favorites", { keyPath: "id_favorite", autoIncrement: true });
      case 1:
        var favoriteStore = upgradeDb.transaction.objectStore('favorites');
        favoriteStore.createIndex("id_team", "id_team");
        favoriteStore.createIndex("created", "created");
    }
  });

// =======================================================

function insertFavorite(id_team) {
    dbPromise.then(function(db) {
            var tx = db.transaction('favorites', 'readwrite');
            var store = tx.objectStore('favorites');
            var item = {
                id_team: id_team,
                created: new Date().getTime()
            };
            store.add(item);
            return tx.complete;
        }).then(function() {
          console.log('Team Favorite berhasil disimpan.');
        }).catch(function() {
          console.log('Team Favorite gagal disimpan.');
        });
}

function toggleFavorite(id_team, env) {
  dbPromise.then(function(db) {
      var tx = db.transaction('favorites', 'readonly');
      var store = tx.objectStore('favorites');
      let team = store.index("id_team");

      return team.get(id_team);
      }).then(function(val) {
        if (env == "klasemen") {
          if ($.isEmptyObject(val)) {
            insertFavorite(id_team);
          } else {
            deleteFavorite(val.id_favorite);
          }
        } else {
          deleteFavorite(val.id_favorite);
        }
        getAllFavorites(env);
      });
}

function deleteFavorite(id) {
  dbPromise.then(function(db) {
      var tx = db.transaction('favorites', 'readwrite');
      var store = tx.objectStore('favorites');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Item deleted');
    });
}

// =======================================================

function getAllFavorites(env) {
  while(data_team.length > 0) {
    data_team.pop();
  }

  dbPromise.then(function(db) {
    var tx = db.transaction('favorites', 'readonly');
    var store = tx.objectStore('favorites');
    return store.openCursor();
  }).then(function ambilData(cursor) {
    if (!cursor) {
      return;
    }

    data_team.push(cursor.value['id_team']);

    return cursor.continue().then(ambilData);
  }).then(function() {
    if (env == 'klasemen') {
      getKlasemenLiga(2001);
    } else if(env == 'jadwal') {
      getJadwal();
    } else {
      getFavorite();
    }
  });
}

// =======================================================