$(document).ready(function () {
  let searchParams = window.location.search;

  searchParams = searchParams.split('#').pop().split('=').pop();

  if (searchParams) {
    profile(searchParams);
  } else {
    profile("76561198003904647");
  }
});

$(document).on("click", "#button", function (event) {
  $('#form').submit()
});

$(document).on("click", "#egg", function (event) {
  egg();
});

function profile(user) {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/api.tracker.gg/api/v2/rocket-league/standard/profile/steam/${user}`,
    type: 'get',
    headers: {
      "TRN-Api-Key": '6a766f6c-a530-4018-b2fd-be4583c42765'
    },
    beforeSend: function () {
      $("#result").hide();
      $("#loading-image").show();
    },
    dataType: 'json',
    success: function (data) {
      //Avatar
      $('.avatar').css("background-image", `url(${data.data.platformInfo.avatarUrl})`)
      $('#avatar__img').attr("src", data.data.platformInfo.avatarUrl)
      //Username
      $('#avatar__username').text(data.data.platformInfo.platformUserHandle)
      //Reward
      $('.reward img').attr("src", data.data.segments[0].stats.seasonRewardLevel.metadata.iconUrl)
      $('.reward h2').text(data.data.segments[0].stats.seasonRewardLevel.metadata.rankName)
      //General stats
      $("#stats").append(chip("./assets/Wins.png", `Wins: ${data.data.segments[0].stats.wins.displayValue}`))
      $("#stats").append(chip("./assets/Mvps.png", `Mvps: ${data.data.segments[0].stats.mVPs.displayValue}`))
      $("#stats").append(chip("./assets/Goals.png", `Goals: ${data.data.segments[0].stats.goals.displayValue}`))
      $("#stats").append(chip("./assets/LongGoal.png", `Goal Shot Ratio: ${data.data.segments[0].stats.goalShotRatio.displayValue}`))
      $("#stats").append(chip("./assets/Shots.png", `Shots: ${data.data.segments[0].stats.shots.displayValue}`))
      $("#stats").append(chip("./assets/Assists.png", `Assists: ${data.data.segments[0].stats.assists.displayValue}`))
      $("#stats").append(chip("./assets/Saves.png", `Saves: ${data.data.segments[0].stats.saves.displayValue}`))
      //Profile url
      $('#profile').attr("href", `http://steamcommunity.com/profiles/${data.data.platformInfo.platformUserIdentifier}`)
      //Types
      for (let i = 1; i < 10; i++) {
        $("#types").append(type(data.data.segments[i]));
      }
      $("#loading-image").hide();
      $("#result").show();
      componentHandler.upgradeDom();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError);
      profile("76561198003904647");
    }
  });
}

function chip(img, data) {
  return `
        <span class="mdl-chip mdl-chip--contact">
            <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white" style="background: url('${img}') 100% / 100%;"></span>
            <span class="mdl-chip__text">${data}</span>
        </span>
    `;
}

function type(data) {
  let random = '_' + Math.random().toString(36).substr(2, 9);
  return `
    <div class="mdl-cell mdl-cell--3-col">
          <p class="type__title">${data.metadata.name}</p>
          <div class="type mdl-card mdl-shadow--2dp" style="background: url('${data.stats.tier.metadata.iconUrl}') center / cover !important;">
            <div class="mdl-card__title mdl-card--expand"></div>
            <div id="${random}" class="mdl-card__actions">
              <span class="type-card-image__filename">
                <span class="mdl-badge" data-badge="${data.stats.division.displayValue}" style="color: black; font-weight: bold;">${data.stats.tier.metadata.name}</span>
                <div class="mdl-tooltip mdl-tooltip--large" for="${random}">
                  ${check_delta(data)}
                  ${chip("./assets/Wins.png", "MMR: " + data.stats.rating.displayValue)}
                  ${chip("./assets/MatchesPlayed.png", "Matches Played: " + data.stats.matchesPlayed.displayValue)}
                  ${chip("./assets/WinStreak.png", "Win Streak: " + data.stats.winStreak.displayValue)}
                </div>
              </span>
            </div>
          </div>
        </div>`;
}

function check_delta(data) {
  if (data.stats.division.metadata.deltaUp) {
    if (data.stats.division.metadata.deltaDown) {
      return `<div class="material-icons mdl-badge mdl-badge--overlap" style="color: #00ff00;" data-badge="${data.stats.division.metadata.deltaUp}">arrow_upward</div><div class="material-icons mdl-badge mdl-badge--overlap" style="color: red;" data-badge="${data.stats.division.metadata.deltaDown}">arrow_downward</div>`
    } else {
      return `<div class="material-icons mdl-badge mdl-badge--overlap" style="display: table; margin-left: auto; margin-right: auto; color: #00ff00;" data-badge="${data.stats.division.metadata.deltaUp}">arrow_upward</div>`
    }
  } else if (data.stats.division.metadata.deltaDown) {
    return `<div class="material-icons mdl-badge mdl-badge--overlap" style="display: table; margin-left: auto; margin-right: auto; color: red;" data-badge="${data.stats.division.metadata.deltaDown}">arrow_downward</div>`
  } else {
    return ``;
  }
}

function egg() {
  let dialog = document.createElement("dialog");
  dialog.setAttribute("class", "mdl-dialog");
  let h4 = document.createElement("h4");
  h4.setAttribute("class", "mdl-dialog__title");
  h4.innerText = "Quick open the console (F12)";
  dialog.appendChild(h4);
  let div = document.createElement("div");
  div.setAttribute("class", "mdl-dialog__actions");
  dialog.appendChild(div);
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "mdl-button close");
  button.innerText = "Close";
  div.appendChild(button);
  dialog.appendChild(div);
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(dialog);
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.remove();
  });

  console.clear();
  const textStyle = [
    'color: red',
    'font-size: 30px',
  ].join(';');
  const imageStyle = [
    'background-image: url("https://media.giphy.com/media/sXOj0wtpyELdu/source.gif")',
    'background-size: cover',
    'padding: 150px 300px'
  ].join(';');
  console.log('%cYou have 6 seconds to count all the cats', textStyle);
  setTimeout(function () {
    console.log('%c ', imageStyle);
  }, 5000);
  setTimeout(function () {
    console.clear();
    dialog.remove();
    const style = [
      'background: #000',
      'color: #fff',
      'padding: 10px 20px',
      'line-height: 35px'
    ].join(';');
    console.log('%c Programmed by Kaiserdj ♥️', style);
    const kekw = [
      'background-image: url("https://i.imgur.com/JToTIAo.png")',
      'background-size: cover',
      'padding: 200px 200px'
    ].join(';');
    console.log('%c ', kekw);
  }, 11000);
}