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
    
    
 
     return $(template);
 };

// #1-This section identifies each elemental part of each album as variables, and prepares them to be accessed as DOM objects.
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

//albumSongList is the object of a table <table class='albumSongList'>
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

// This following section instructs each specific value of each album to change as albums in the array are cycled. 
//???? When the firstChild is accessed, the nodeValue returns the what???? What is the difference between firstChild itself and the nodeValue?
//

//???? Are nodes the same as elements? If not, what is the difference.
//
//???? How is 'firstChild.nodeValue' different from 'inner.HTML'?
//  >>  <td><textnoode>album.title</textnode></td> (text node isn't actually tagged, but is a kind of container in the cell or  
//      in any element.)
var setCurrentAlbum = function(album) {
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     // #3

    //This resets the song-list to be blank, so that the 'for' loop can then repropagate the songs of the next album (in the array).
     $albumSongList.empty();
     // #4
     var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

//The following is a switch, which is used in the clickHandler function below. It returns the className of an element it is selected as an eventTarget.????
//???? What exactly is the switch needed for, if the clickHandler function is also routing some of the click functions?
//This returns the cell that contains the song number, or the button (the left most cell of the row.)
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

//****This variable contains a function whose argument is the targetElement, and then uses an 'if' conditional to determine if the currentlyPlayingSong is null. In that case, the songItem is set to pauseButtonTemplate AND the currentlyPlayingSong's class is set to 'data-song-number'?????????
//???? What exactly is the targetElement and targetClass? Wouldn't these just be included in the 'element'? (A button click?)
//This handles a click event, and updates the cell... 
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
 
//Creates a variable of the DOM of the list of songs.
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//Creates a variable of specific song elements.
var songRows = document.getElementsByClassName('album-view-song-item');
//Creates a variable of the play-button icon.
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//Creates a variable of the pause-button icon.
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//???? Creates a variable of*************
var currentlyPlayingSong = null;


//The following code executes upon window.onload, the current album should be Picasso. 
//Next, the variable findParentByClassName is set with a function and a conditional 'if' statement.
//Two arguments are taken for this function: element & targetClass
//The conditional statement states that if an element is passed, the element should be passed as the parentElement.
//While that the className of that currentParent is not equal to the targetClass, and the className of the currentParent is null, the setCurrentAlbum function should then return currentParent (which should be the next album in the album array.) 
window.onload = function() {
  //Sets first album to albumPicasso.
  setCurrentAlbum(albumPicasso);
  
  //****This function takes two arguments: the element and the targetClass, and determines if the currentParent.className is NOT equal to the targetClass. 
  //?????? How is the targetClass different from the element itself? Shouldn't the class name be in the element's name?
  //
  /*
  var findParentByClassName = function(element, targetClass) {
    if (element) {
      var currentParent = element.parentElement;
      while (currentParent.className != targetClass && currentParent.className !== null) {
        currentParent = currentParent.parentElement;
    }
    */
        
    
    var findParentByClassName = function (element, targetClass) {
        debugger;
      var parent = null;
        
      if (element) {
          parent = element.parentElement;
          if (parent === null) {
              alert("No parent found.");
          } else {
              while (parent && parent.className !== targetClass) {
                  parent = parent.parentElement;
              }         
          }          
      }
        
        if (parent === null) {
            alert("No parent found with that class name.");
        }
        return parent;
    };
    /*
  
  var findParentByClassName = function(element, targetClass) {
    if (element) {  
      var currentParent = element.parentElement;
      } while (currentParent.targetClass != targetClass) {
        alert("No parent found.");
      } while (currentParent.className !== null) {
        alert("No parent found with that class name.");
      }

    return currentParent;
     
  }; */
    
  // This is an event listener within the songListContainer. When the mouse is over this section, the 'mouseover' event then issue a conditional statmement: if the parentElement.className is equal to the album-view-song-item, then the parentElement's '.song-item-numer' will changed (via .innerHTML) to be the 'playButtonTemplate.'
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
    event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });
 
  //If the event target is the parentElement with className of 'album-view-song-item', then the 'songitem-number' should by changed, via .innterHTML, to pauseButtonTemplate.
  songListContainer.addEventListener('click', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
    event.target.parentElement.querySelector('.songitem-number').innerHTML = pauseButtonTemplate;
    }
  });
  
  //This 'for' loop cycles through the song list, listening for when the mouse leaves each row. 
  //And when the mouse does leave, it executes the function with "event" as an argument. 
  //The variable songItem then houses the getSongItem function (a switch conditional that calls the element's className), which finds the event.target (the particular song line that the mouse was leaving).    
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
 
    
    // #2- This 'if' conditional sets, if the songItemNumber is not the currentlyPlayingSong, to be reset (via .innerHTML) back to its variable songItemNumber.
    if (songItemNumber !== currentlyPlayingSong) {
      songItem.innerHTML = songItemNumber;
    }
  });
  
    // This code adds an eventListener to each of the songRows, and then executes the clickHandler function on the selected target. 
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