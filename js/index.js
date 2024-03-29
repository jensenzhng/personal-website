//http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=jensenzhng&limit=1&api_key=a2fc7e8497efae9583ecda43732a8d14&format=json
//found endpoint for spotify api

particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

let getSpotifyStatus = async () =>{

  let res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=jensenzhng&limit=1&api_key=a2fc7e8497efae9583ecda43732a8d14&format=json", {
    method: 'GET'
  }).catch(err => {
    document.getElementById("spotify-status").children[1].innerHTML = 'Not listening to anything';
  });
  let statusJSON = await res.json();
  
  console.log(statusJSON);
  if (statusJSON.recenttracks.track[0]['@attr'] && statusJSON.recenttracks.track[0]['@attr'].nowplaying) {
    let status = `Listening to ${statusJSON.recenttracks.track[0].name} by ${statusJSON.recenttracks.track[0].artist['#text']}`;
    document.getElementById("spotify-status").children[1].innerHTML = status;
  } else {
    document.getElementById("spotify-status").children[1].innerHTML = 'Not listening to anything';
  }
}

setInterval(getSpotifyStatus,5000)

getSpotifyStatus();

window.onload = async () => {
  if (localStorage.getItem("playedGame") !== null) {
    document.getElementById('secret').innerHTML = 'what, a secret link?'
  }
}
