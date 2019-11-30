$(document).ready(function() {
    $('.modal').modal();

    $(document).on('click', '.modal-trigger', function() {
      var id_team = $(this).attr('data-id');

      $('#crestUrl-Modal').attr('src', '');
      $('#name-Modal').html('');
      $('#shortName-Modal').html('');
      $('#founded-Modal').html('');
      $('#address-Modal').html('');
      $('#email-Modal').html('');
      $('#website-Modal').html('');

      var url = 'https://api.football-data.org/v2/teams/' + id_team;
      if ('caches' in window) {
        caches.match(url).then(function(data) {
          if (data) {
            data.json().then(function (response) {
              $('#crestUrl-Modal').attr('src', response.crestUrl);
              $('#name-Modal').html(response.name);
              $('#shortName-Modal').html(response.shortName);
              $('#founded-Modal').html(response.founded);
              $('#address-Modal').html(response.address);
              $('#email-Modal').html(response.email);
              $('#website-Modal').html(response.website);
            })
          }
        })
      }
      
      caches.match(url).then(function(data) {
        if (!data) {
          $.ajax({
            headers: { 'X-Auth-Token': '1aeedd5c8974464c847d714286b35d25' },
            url: url,
            dataType: 'json',
            type: 'GET',
            async: true,
            beforeSend:function() {
                $('.loader-modal').removeClass('hide');
                $('.content-modal').addClass('hide');
            },
            complete:function() {
                $('.loader-modal').addClass('hide');
                $('.content-modal').removeClass('hide');
            },
            success:function(data) {
              $('#crestUrl-Modal').attr('src', data.crestUrl);
              $('#name-Modal').html(data.name);
              $('#shortName-Modal').html(data.shortName);
              $('#founded-Modal').html(data.founded);
              $('#address-Modal').html(data.address);
              $('#email-Modal').html(data.email);
              $('#website-Modal').html(data.website);
            }
          });
        }
      });
  });
});

function dateFormat(userDate) {
  var date_string = moment(userDate, "YYYY-MM-DD").format("dddd, DD MMMM YYYY");
  return date_string;
}

function getKlasemenLiga(liga) {
  var url, group = null;
  url = 'https://api.football-data.org/v2/competitions/' + liga + '/standings?standingType=TOTAL';
  if ('caches' in window) {
    caches.match(url).then(function(data) {
      if (data) {
        data.json().then(function (response) {
          $('#dataKlasemen').html('');
          response.standings.forEach(standings => {
            var no = 1;
            group = standings.group;
            $('#dataKlasemen').append(`
              <div class="row">
                <div class="col s12">
                  <h6 style="font-weight: bold;">${standings.group.replace("_", " ")}</h6>
                </div>
                <div class="col s12">
                  <table class="highlight responsive-table">
                    <thead>
                      <tr>
                        <td></td>
                        <td class="center">Club</td>
                        <td></td>
                        <td class="center">MP</td>
                        <td class="center">W</td>
                        <td class="center">D</td>
                        <td class="center">L</td>
                        <td class="center">GF</td>
                        <td class="center">GA</td>
                        <td class="center">GD</td>
                        <td class="center">Pts</td>
                        <td class="center">Action</td>
                      </tr>
                    </thead>
                    <tbody id="${group}"></tbody>
                  </table>
                </div>
              </div>
            `);

            standings.table.forEach(teams => {
              var id_team = teams.team.id;
              $('#' + group).append(`
                <tr>
                  <td>${no++}</td>
                  <td width="120vw" class="center"><img src="${teams.team.crestUrl}" style="width:100%;" alt="Logo ${teams.team.name}"></td>
                  <td width="180vw">${teams.team.name}</td>
                  <td class="center">${teams.playedGames}</td>
                  <td class="center">${teams.won}</td>
                  <td class="center">${teams.draw}</td>
                  <td class="center">${teams.lost}</td>
                  <td class="center">${teams.goalsFor}</td>
                  <td class="center">${teams.goalsAgainst}</td>
                  <td class="center">${teams.goalDifference}</td>
                  <td class="center">${teams.points}</td>
                  <td width="120vw" class="center">
                    <button data-target="informasiModal" data-id="${teams.team.id}" class="btn btn-small waves-effect waves-light modal-trigger"><i class="far fa-eye"></i></button>
                    <a class="waves-effect waves-light btn-small" onclick="toggleFavorite(${teams.team.id}, 'klasemen');"><i class="far fa-heart" id="btn-${teams.team.id}"></i></a>
                  </td>
                </tr>
              `);

              if(data_team.includes(id_team) == true) {
                $('#btn-' + id_team).removeClass('far');
                $('#btn-' + id_team).addClass('fas');
              } else {
                $('#btn-' + id_team).addClass('far');
                $('#btn-' + id_team).removeClass('fas');
              }
            })
            
          });

          $('#lastUpdate').html(dateFormat(response.competition.lastUpdated));
          $('#areaKlasemen').html(response.competition.area.name);
          $('#currentMatchday').html(response.season.currentMatchday);

          $('#startDate').html(dateFormat(response.season.startDate));
          $('#endDate').html(dateFormat(response.season.endDate));

          if (response.season.winner == null) {
            $('#winner').html("Belum Ada");
          } else {
            $('#winner').html(response.season.winner);
          }
        })
      }
    })
  }

  caches.match(url).then(function(data) {
    if (!data) {
      $.ajax({
        headers: { 'X-Auth-Token': '1aeedd5c8974464c847d714286b35d25' },
        url: url,
        dataType: 'json',
        type: 'GET',
        async: true,
        beforeSend:function() {
          $('#dataKlasemen').html(`
          <div class="row center-align">
            <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </div>
          `);
        }
      }).done(function(response) {
        $('#dataKlasemen').html('');
        response.standings.forEach(standings => {
          var no = 1;
          group = standings.group;
          $('#dataKlasemen').append(`
            <div class="row">
              <div class="col s12">
                <h6 style="font-weight: bold;">${standings.group.replace("_", " ")}</h6>
              </div>
              <div class="col s12">
                <table class="highlight responsive-table">
                  <thead>
                    <tr>
                      <td></td>
                      <td class="center">Club</td>
                      <td></td>
                      <td class="center">MP</td>
                      <td class="center">W</td>
                      <td class="center">D</td>
                      <td class="center">L</td>
                      <td class="center">GF</td>
                      <td class="center">GA</td>
                      <td class="center">GD</td>
                      <td class="center">Pts</td>
                      <td class="center">Action</td>
                    </tr>
                  </thead>
                  <tbody id="${group}"></tbody>
                </table>
              </div>
            </div>
          `);

          standings.table.forEach(teams => {
            var id_team = teams.team.id;
            
            $('#' + group).append(`
              <tr>
                <td>${no++}</td>
                <td width="120vw" class="center"><img src="${teams.team.crestUrl}" style="width:100%;"></td>
                <td width="180vw">${teams.team.name}</td>
                <td class="center">${teams.playedGames}</td>
                <td class="center">${teams.won}</td>
                <td class="center">${teams.draw}</td>
                <td class="center">${teams.lost}</td>
                <td class="center">${teams.goalsFor}</td>
                <td class="center">${teams.goalsAgainst}</td>
                <td class="center">${teams.goalDifference}</td>
                <td class="center">${teams.points}</td>
                <td width="120vw" class="center">
                  <button data-target="informasiModal" data-id="${teams.team.id}" class="btn btn-small waves-effect waves-light modal-trigger"><i class="far fa-eye"></i></button>
                  <a class="waves-effect waves-light btn-small" onclick="toggleFavorite(${teams.team.id}, 'klasemen');"><i class="far fa-heart" id="btn-${teams.team.id}"></i></a>
                </td>
              </tr>
            `);
            if(data_team.includes(id_team) == true) {
              $('#btn-' + id_team).removeClass('far');
              $('#btn-' + id_team).addClass('fas');
            } else {
              $('#btn-' + id_team).addClass('far');
              $('#btn-' + id_team).removeClass('fas');
            }
          })
          
        });

        $('#lastUpdate').html(dateFormat(response.competition.lastUpdated));
        $('#areaKlasemen').html(response.competition.area.name);
        $('#currentMatchday').html(response.season.currentMatchday);

        $('#startDate').html(dateFormat(response.season.startDate));
        $('#endDate').html(dateFormat(response.season.endDate));

        if (response.season.winner == null) {
          $('#winner').html("Belum Ada");
        } else {
          $('#winner').html(response.season.winner);
        }
      });
    }
  });
}

function getJadwal() {
  var url;
  url = 'https://api.football-data.org/v2/competitions/2001/matches?status=SCHEDULED';
  
  if ('caches' in window) {
    caches.match(url).then(function(data) {
      if (data) {
        data.json().then(function (response) {
          $('#dataJadwal').html('');
          var innerHtml = '<div class="row">';
          response.matches.forEach(match => {
            var favHome = "", favAway = "";
            if(data_team.includes(match.homeTeam.id)) { 
              favHome = '<i class="fas fa-heart"></i>';
            }
            if (data_team.includes(match.awayTeam.id)) {
              favAway = '<i class="fas fa-heart"></i>';
            }

            innerHtml += `
              <div class="col s12 m4 l3">
                <div class="card">
                  <div class="card-content center-align">
                    <p>
                      <b>${match.homeTeam.name}</b> ${favHome} <br> vs <br> <b>${match.awayTeam.name}</b> ${favAway} </br>
                    </p>
                  </div>
                  <div class="card-action center-align">
                    ${dateFormat(match.utcDate)}
                  </div>
                </div>
              </div>
            `;
          });
          innerHtml += '</div>';
          $('#dataJadwal').append(innerHtml);
        })
      }
    })
  }

  caches.match(url).then(function(data) {
    if (!data) {
      $.ajax({
        headers: { 'X-Auth-Token': '1aeedd5c8974464c847d714286b35d25' },
        url: url,
        dataType: 'json',
        type: 'GET',
        async: true,
        beforeSend:function() {
          $('#dataJadwal').html(`
          <div class="row center-align">
            <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </div>
          `);
        }
      }).done(function(response) {
        $('#dataJadwal').html('');
        var innerHtml = '<div class="row">';
        response.matches.forEach(match => {
          var favHome = "", favAway = "";
          if(data_team.includes(match.homeTeam.id)) { 
            favHome = '<i class="fas fa-heart"></i>';
          }
          if (data_team.includes(match.awayTeam.id)) {
            favAway = '<i class="fas fa-heart"></i>';
          }

          innerHtml += `
            <div class="col s12 m4 l3">
              <div class="card">
                <div class="card-content center-align">
                  <p>
                    <b>${match.homeTeam.name}</b> ${favHome} <br> vs <br> <b>${match.awayTeam.name}</b> ${favAway} </br>
                  </p>
                </div>
                <div class="card-action center-align">
                  ${dateFormat(match.utcDate)}
                </div>
              </div>
            </div>
          `;
        });
        innerHtml += '</div>';
        $('#dataJadwal').append(innerHtml);
      });
    }
  });
}

function getFavorite() {
  if (data_team.length > 0) {
    
    $('#dataFav').html('');
    data_team.forEach(team => {
      var url = 'https://api.football-data.org/v2/teams/' + team;
      
      if ('caches' in window) {
        caches.match(url).then(function(data) {
          if (data) {
            data.json().then(function (response) {
              var innerHtml = '';

              innerHtml += `
                <div class="col s12 m4 l3">
                  <div class="card">
                    <div class="card-content center-align">
                      <label>Nama Tim</label>
                      <p>${response.name}</p><br>
                    </div>
                    <div class="card-action right-align">
                    <a class="waves-effect waves-light btn-small" onclick="toggleFavorite(${response.id}, 'fav');"><i class="fas fa-heart"></i></a>
                    </div>
                  </div>
                </div>
              `;

              $('#dataFav').append(innerHtml);
            })
          }
        })
      }
      
      caches.match(url).then(function(data) {
        if (!data) {
          $.ajax({
            headers: { 'X-Auth-Token': '1aeedd5c8974464c847d714286b35d25' },
            url: url,
            dataType: 'json',
            type: 'GET',
            async: true,
            beforeSend:function() {
              $('.loader-fav').removeClass('hide');
              $('.content-fav').addClass('hide');
            },
            complete:function() {
                $('.loader-fav').addClass('hide');
                $('.content-fav').removeClass('hide');
            },
            success:function(data) {
              var innerHtml = '';

              innerHtml += `
                <div class="col s12 m4 l3">
                  <div class="card">
                    <div class="card-content center-align">
                      <label>Nama Tim</label>
                      <p>${data.name}</p><br>
                    </div>
                    <div class="card-action right-align">
                    <a class="waves-effect waves-light btn-small" onclick="toggleFavorite(${data.id}, 'fav');"><i class="fas fa-heart"></i></a>
                    </div>
                  </div>
                </div>
              `;

              $('#dataFav').append(innerHtml);
            }
          });
        }
      });
    });
  } else {
    $('#dataFav').html('');
    $('#dataFav').addClass('center-align').append('<h2>Tidak ada Favorite</h2>');
  }
}