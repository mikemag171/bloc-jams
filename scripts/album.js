var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

//???? Is the above set of titles/duration an object containing an array? To confirm, an object can contain an array?
//

var albumColdplay = {
     title: 'Mylo Xyloto',
     artist: 'Coldplay',
     label: 'Atlantic',
     year: '2009',
     albumArtUrl: 'assets/images/album_covers/mylo_xyloto.jpg',
     songs: [
         { title: 'Hurts Like Heaven', duration: '4:02' },
         { title: 'Paradise', duration: '4:38' },
         { title: 'Every Teardrop is a Waterfall', duration: '4:01'},
         { title: 'A Hopeful Transmission', duration: '0:33' },
         { title: 'Up With The Birds', duration: '3:48'}
     ]
 };

//createSongRom is a variable that contains the html template through which the album objects' info can be passed.
var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
    
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
     };

var clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
};
    
    //The following are three event listeners that will replace JS coded event listeners.
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
};

     // #1-This section identifies each elemental part of each album as variables, and prepares them to be accessed as DOM objects.
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

//albumSongList is the object of a table <table class='albumSongList'>
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     // #3

    //This resets the song-list to be blank, so that the 'for' loop can then repropagate the songs of the next album (in the array).
     $albumSongList.empty();
    for (var i = 0; i < album.songs.length; i++) {
     // #4
     var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);

    

var albums = [albumPicasso, albumMarconi, albumColdplay];
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        
        setCurrentAlbum(albums[index]);
        index++;
    if (index == albums.length) {
        index = 0;
    }
    });

/*
var albums = [albumPicasso, albumMarconi, albumColdplay];
    var index = 1;
    $($albumImage ("click", function(event) {
        
        setCurrentAlbum(albums[index]);
        index++;
    if (index == albums.length) {
        index = 0;
    }
    });
    
    */