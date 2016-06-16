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

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

// #1-This section identifies each part of each album, and prepares them to be accessed.
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

// This following section instructs each specific value of each album to change as albums in the array are cycled.
var setCurrentAlbum = function(album) {
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
     // #3

    //This resets the song-list to be blank, so that the 'for' loop can then repropagate the songs of the next album (in the array).
     albumSongList.innerHTML = '';
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

//Does this function belong here?
var getSongItem = function(element){
};

//
var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement); 
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;


//The following code first tells that when the load pages, the current album should be Picasso. 
//Next, the variable findParentByClassName is set with a function and a conditional 'if' statement.
//Two arguments are taken for this function: element & targetClass
//The conditional statement states that if an element is passed, the element should be passed as the parentElement.
//While that the className of that currentParent is not equal to the targetClass, and the className of the currentParent is null, the setCurrentAlbum function should then return currentParent (which should be the next album in the album array.) 
window.onload = function() {
  setCurrentAlbum(albumPicasso);
  var findParentByClassName = function(element, targetClass) {
    if (element) {
      var currentParent = element.parentElement;
      while (currentParent.className != targetClass && currentParent.className !== null) {
        currentParent = currentParent.parentElement;
      }
    return currentParent;
    }
  }; 
    
  // This is an event listener within the songListContainer. When the mouse is over this section, the 'mouseover' event then issue a conditional statmement: if the parentElement.className is equal to the album-view-song-item, then the parentElement's '.song-item-numer' will changed (via .innerHTML) to be the 'playButtonTemplate.'
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
    event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
    
  //If the event target is the parentElement with className of 'album-view-song-item', then the 'songitem-number' should by changed, via .innterHTML, to pauseButtonTemplate.
  songListContainer.addEventListener('click', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
    event.target.parentElement.querySelector('.songitem-number').innerHTML = pauseButtonTemplate;
    }
  });
    
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
    if (songItemNumber !== currentlyPlayingSong) {
      songItem.innerHTML = songItemNumber;
    }
  });
  
  songRows[i].addEventListener('click', function(event) {
    clickHandler(event.target);
    });
  }

    var albums = [albumPicasso, albumMarconi, albumColdplay];
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        //debugger;
        setCurrentAlbum(albums[index]);
        index++;
    if (index == albums.length) {
        index = 0;
    }
    });
};