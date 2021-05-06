/**
 * Display web page after this load all media and show handle animations and styles
 */

function loader(loadPage) {
    // when page is load 
    if(loadPage){
        document.getElementsByClassName('loader')[0].style.opacity="0"
        setTimeout(() => {
            document.getElementById("loader").style.display="none"
            document.getElementById("main").style.display="block"
            document.getElementById("fixedMenu").style.display="block"
            document.body.style.animation="gradient 2s ease-in-out 1.5s infinite alternate"
            stickyMenu=false
        }, 1510);
    }else{
        document.getElementById('startButton').style.display="block"
    }
}  

/**
 * This listener change style of sticky menu
 */

var stickyMenu=true

addEventListener('scroll',()=>{
    let headerHeight=document.getElementsByTagName('header')[0].offsetHeight
    let menu=document.getElementById('menu')
    if (window.scrollY>=headerHeight && !stickyMenu) {
        stickyMenu=!stickyMenu
        menu.classList.toggle("menu-sticky")
    }else if (window.scrollY<headerHeight && stickyMenu){
        stickyMenu=!stickyMenu
        menu.classList.toggle("menu-sticky")
    }
})

/**
 * Play and pause music player in web page from fixed button 
 * @param {String} e - event of element, clicked button 
 */

 function playPause(e) {
    //Select target and title atribute
    let action=e.target.title == '' ? e.target.parentElement.title : e.target.title
    if (action=='play') {
        //Set pause and change fa icon and title atribute  
        player.play()
        menuPlayer.children[0].className='fas fa-pause'
        menuPlayer.title='pause'
        pauseButton.className="button-player"
        playButton.className="button-player hidden-element"
    }else if(action=='pause'){
        player.pause()
        menuPlayer.children[0].className='fas fa-play'
        menuPlayer.title='play'
        pauseButton.className="button-player hidden-element"
        playButton.className="button-player"
    }else{
        //start song which must be clicked by user 
        player.volume="0.35"
        //wait to animation finish
        setTimeout(() => {
            player.play()
        }, 1500);
        loader(true)
    }
}

//List of music 
var musicList=['01-Butter-Fly','02-FIRE','03-Boku-wa-Boku-datte','04-Butter-fly-Piano-version','05-Haruka-na-Okurimono','06-Seven','07-Butter-fly-Movie-Size-1','08-The-Biggest-Dreamer','09-Hirari','10-With-The-Will','11-Butter-FlyStrong-Version','12-Seven10th-Memorial-Version','13-Innocent-Mujyaki-na-mamade','14-an-Endless-tale','15-Kaze','16-Target-Akai-Shogeki','17-Mirai-e-no-Tobira-Ano-natsu-n','18-SeventriVersion','19-Butter-FlytriVersion']

/**
 * Remove style of current song and set to new current song and change the id in audio element
 * @param {Number} id - index of song in playlist 
 */

 function updateTrackStatus(id) {
    //remove all current targets
    let tracks=[...document.getElementsByClassName('track')]
    //rename all track class
    tracks.forEach(track => {
        track.className='track'
    });
    //change current target 
    tracks[parseInt(id)].className="track current-track"
    //change current track 
    player.setAttribute('data-track',id)
}

/**
 * Change source of player, load and play song 
 * @param {Number} id - index of song in playlist
 */
function play(id) {
    //change src
    player.src="https://x1hibi.s3-us-west-1.amazonaws.com/media/htmlProjects/tributePage/"+musicList[id]+".mp3"
    //load source 
    player.load() 
    //play source
    let playPromise=player.play()
    //catch error 
    playPromise.catch(error=>{
        //avoid DOM exeption :)
    })
}

/**
 * This play a select song with the id and also set styles required in web 
 * @param {String} id index of list of playlist 
 */

function playTrack(id){
    playButton.className='button-player hidden-element'
    pauseButton.className='button-player'
    menuPlayer.children[0].className='fas fa-pause'
    menuPlayer.title='pause'
    updateTrackStatus(id)
    play(id)    
}

/**
 * Handle each action in player, play, pause, next song etc 
 * @param {String} action - Button selected in player 
 */

function playerOption (action) {
    let id=parseInt(player.getAttribute('data-track'))
    let newId=0
    let musicListSize=musicList.length-1
    switch (action) {
        case 'play':
            player.play()
            playButton.classList.toggle('hidden-element')
            pauseButton.classList.toggle('hidden-element')
            menuPlayer.children[0].className='fas fa-pause'
            menuPlayer.title='pause'
            break;
        case 'pause':
            player.pause()
            playButton.classList.toggle('hidden-element')
            pauseButton.classList.toggle('hidden-element')
            menuPlayer.children[0].className='fas fa-play'
            menuPlayer.title='play'
            break;
        case 'next':
            //handle button to only allow one click until loald and play next song         
            newId = id == musicListSize ? 0 : id+1
            playTrack(newId)
            pauseButton.className="button-player"
            playButton.className="button-player hidden-element"
            menuPlayer.children[0].className='fas fa-pause'
            menuPlayer.title='pause'      
            break;
        case 'back':
            newId = id == 0 ? musicListSize : id-1
            playTrack(newId)
            pauseButton.className="button-player"
            playButton.className="button-player hidden-element"
            menuPlayer.children[0].className='fas fa-pause'
            menuPlayer.title='pause'
            break;    
    }
}

/**
 * Change position of audio select by user 
 */

function selectTime() {
    // relative unit used to calculate the current time in current song
    progressPerValue=player.duration/100
    // multiply the current value in input progress bar by progressPerValue to get desire position 
    player.currentTime=progressBar.value*progressPerValue
}

/**
 * update input progress bar in player whit the current position of song 
 */

function progressSong(){
    currentPosition=player.currentTime
    // relative unit used to know to define the value of progressBar
    progressPerSecond=100/player.duration
    // multiply current song position by progressPerSecond
    progressBar.value=currentPosition*progressPerSecond
}

// Listener for audio progess 
player.addEventListener('timeupdate',()=>{
    if (player.duration>0) {
        progressSong()
    }
})

// Listener for end song, next song automatically when song end 
player.addEventListener('ended',function(){
    let nextSongId=0
    let currentId=parseInt(player.getAttribute('data-track'))
    // set new id 
    nextSongId = currentId==18 ? 0 : currentId+1
    //play and set data in player
    playTrack(nextSongId)
});