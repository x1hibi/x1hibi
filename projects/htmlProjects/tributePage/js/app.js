/**
 * This listener change style from stycky menu
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
        player.play()
        player.volume="0.35"
        loader(true)
    }
}

//List of music 
var musicList=[
    {id:0,nameSong:'01-Butter-Fly'},
    {id:1,nameSong:'02-FIRE'},
    {id:2,nameSong:'03-Boku-wa-Boku-datte'},
    {id:3,nameSong:'04-Butter-fly-Piano-version'},
    {id:4,nameSong:'05-Haruka-na-Okurimono'},
    {id:5,nameSong:'06-Seven'},
    {id:6,nameSong:'07-Butter-fly-Movie-Size-1'},
    {id:7,nameSong:'08-The-Biggest-Dreamer'},
    {id:8,nameSong:'09-Hirari'},
    {id:9,nameSong:'10-With-The-Will'},
    {id:10,nameSong:'11-Butter-FlyStrong-Version'},
    {id:11,nameSong:'12-Seven10th-Memorial-Version'},
    {id:12,nameSong:'13-Innocent-Mujyaki-na-mamade'},
    {id:13,nameSong:'14-an-Endless-tale'},
    {id:14,nameSong:'15-Kaze'},
    {id:15,nameSong:'16-Target-Akai-Shogeki'},
    {id:16,nameSong:'17-Mirai-e-no-Tobira-Ano-natsu-n'},
    {id:17,nameSong:'18-SeventriVersion'},
    {id:18,nameSong:'19-Butter-FlytriVersion'},
]

/**
 * This play a select song with the id and also set styles required in web 
 * @param {String} id index of list of playlist 
 */

function playTrack(id){
    updateTrackStatus(id)
    play(id)
}

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
            if(id==musicListSize) {
                newId=0
            }else{
                newId=id+1
            }
            pauseButton.className="button-player"
            playButton.className="button-player hidden-element"
            menuPlayer.children[0].className='fas fa-pause'
            menuPlayer.title='pause'
            playTrack(newId)
            break;
        case 'back':
            if(id==0) {
                newId=musicListSize
            }else{
                newId=id-1
            }
            pauseButton.className="button-player"
            playButton.className="button-player hidden-element"
            menuPlayer.children[0].className='fas fa-pause'
            menuPlayer.title='pause'
            playTrack(newId)
            break;    
    
        default:
            break;
    }
}

// next song atuomatically 
player.addEventListener('ended',function(){
    let nextSongId=0
    let currentId=parseInt(player.getAttribute('data-track'))
    if(currentId==18){
        nextSongId=0
    }else{
        nextSongId=currentId+1
    }
    
    //play and set data in player
    playTrack(nextSongId)

});

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




function play(id) {

    //change src
    player.src="https://x1hibi.s3-us-west-1.amazonaws.com/media/htmlProjects/tributePage/"+musicList[id].nameSong+".mp3"
    //load source 
    player.load()
    //set size of seconds 
    //play source
    player.play()
}

player.addEventListener('timeupdate',()=>{
    progressSong()
})

function progressSong(){
    currentPosition=player.currentTime
    progressPerSecond=100/player.duration
    progressBar.value=currentPosition*progressPerSecond
}

function selectTime() {
    progressPerValue=player.duration/100
    console.log(progressBar.value)
    console.log(progressBar.value*progressPerSecond)
    player.currentTime=progressBar.value*progressPerValue
}