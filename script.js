console.log("Welcome!");
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('progressBar');
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));
let songs=[
    {songName:"Watermelon Sugar",filePath:"/songs/1.mp3",coverPath:"1.jpeg"},
    {songName:"Stay",filePath:"/songs/2.mp3",coverPath:"2.jpeg"},
    {songName:"Espresso",filePath:"/songs/3.mp3",coverPath:"3.jpeg"},
    {songName:"Chaleya",filePath:"/songs/4.mp3",coverPath:"4.jpeg"},
    {songName:"Kesariya",filePath:"/songs/5.mp3",coverPath:"5.jpeg"},
    {songName:"Nadaniyaan",filePath:"/songs/6.mp3",coverPath:"6.jpeg"},
    {songName:"I Like Me Better",filePath:"/songs/7.mp3",coverPath:"7.jpeg"},
    {songName:"There's Nothing Holding Me Back",filePath:"/songs/8.mp3",coverPath:"8.jpeg"},
    {songName:"Stiches",filePath:"/songs/9.mp3",coverPath:"9.jpeg"},
    {songName:"Drivers License",filePath:"/songs/10.mp3",coverPath:"10.jpeg"}
];
let audioElem=new Audio('/songs/1.mp3');
//audio play/pause 
masterPlay.addEventListener("click",()=>{
    console.log("clicked");
    if(audioElem.paused || audioElem.currentTime<=0){
        audioElem.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElem.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-pause-circle");
        gif.style.opacity=0;
    }
    songCoordination();
});
//Events
audioElem.addEventListener("timeupdate",()=>{
    console.log("Timeupdate");
    //Update Seekbar   
    progress=parseInt((audioElem.currentTime/audioElem.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElem.currentTime=(myProgressBar.value*audioElem.duration)/100;
});
songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})
    
songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElem.paused || audioElem.currentTime<=0){
        console.log(e.target);
        songIndex=parseInt(e.target.id);
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElem.src=songs[songIndex].filePath;
        audioElem.currentTime=0;
        audioElem.play();
        gif.style.opacity=1;
     
        }
        else{
            audioElem.pause();
            element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            gif.style.opacity=0;
        }
        
    })
})
audioElem.addEventListener('ended',()=>{
    songIndex=(songIndex+1)%songs.length;
    audioElem.src=songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName; 
    audioElem.currentTime=0;
    audioElem.play();
    let logo=document.getElementById(songIndex);
    logo.classList.add("fa-pause-circle");
    logo.classList.remove("fa-play-circle");
    songCoordination();
})

document.getElementById('next').addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }
    audioElem.src=songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName;
    audioElem.currentTime=0;
    audioElem.pause();
    myProgressBar.value=0;
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
})
document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
    songIndex-=1;
    }
    audioElem.src=songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName;
    audioElem.currentTime=0;
    myProgressBar.value=0;
    audioElem.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
});
const songCoordination=()=>{
    let song=(audioElem.src).split('http://127.0.0.1:5500');
    console.log(song[1]);
    for(let i=0;i<10;i++){
        if(song[1]==songs[i].filePath){
            console.log(songs[i].songName);
            if(!audioElem.paused){
                changeAllToPlay(i);
                 changeLogoToPause(i);
               }
               else{
                changeLogoToPlay(i);    
            }
        }
   
    
}
}
const changeAllToPlay=(i)=>{
    for(let j=0;j<10;j++){
        if(j!=i){
            let logo=document.getElementById(j);
            logo.classList.add('fa-circle-play');
            logo.classList.remove('fa-pause-circle');
        }
    }
}
const changeLogoToPause=(i)=>{
let logo=document.getElementById(i);
logo.classList.remove('fa-circle-play');
logo.classList.add('fa-pause-circle');
}

const changeLogoToPlay=(i)=>{
    let logo=document.getElementById(i);
    logo.classList.add('fa-circle-play');
    logo.classList.remove('fa-pause-circle');
        }
    

