/* Create Playlist Array */
var playlist = [];

/* Add songs to playlist */
playlist[0] = new Audio("songs/bonita.mp3");
playlist[1] = new Audio("songs/cissy.mp3");
playlist[2] = new Audio("songs/proceed.mp3");
playlist[3] = new Audio("songs/heartbeats.mp3");
playlist[4] = new Audio("songs/cooler.MP3");
playlist[5] = new Audio("songs/lovetrain.mp3");

/* Randomize song to be played */
var i = Math.round(Math.random()*(playlist.length-1));

/* Lowers volume of music */
function lowerVolume(){
    if(playlist[i].volume > 0){
        playlist[i].volume -= .2;
    };
}

/* Raises volume of music */
function raiseVolume(){
    if(playlist[i].volume < 1){
        playlist[i].volume += .2;
    };
}

/* Skips to next track in playlist */
function skipSong(){
    playlist[i].pause();
    playlist[i].currentTime = 0;
    i = Math.round(Math.random()*(playlist.length-1));
    playlist[i].play();
}