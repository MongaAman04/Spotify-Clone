console.log("Lets start javascript");
let currentsong = new Audio();
let songs;
let currFolder;

function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "invalidinput";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);
    const formattedminutes = String(minutes).padStart(2, '0');
    const formattedseconds = String(remainingseconds).padStart(2, '0');
    return `${formattedminutes}:${formattedseconds}`
}


async function getsongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
     songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    return songs
}
const playmusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)
    console.log("called play music")
    currentsong.src = `/${currFolder}/` + track
    if (!pause) {
        currentsong.play(0)
        play.src = "svg/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}
async function main() {
    // Get all the songs in the song list
    let songs = await getsongs("songs/ncs");
    // Show all the songs in the song list          
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (let i = 0; i < songs.length; i++) {
        songUl.innerHTML = songUl.innerHTML +
            ` <li><img class="invert" src="svg/music.svg" alt="music">
        <div class="info">
           <div>${songs[i].replaceAll("%20", " ",).replaceAll("%2B", " ").replaceAll("%5B", " ")}</div>
           <div>Anushka</div>
       </div>
       <div class="playnow">
       <img class="invert" src="svg/songplay.svg" alt="playnow"> 
   </div></li> `
        //  console.log(songs[i])
    }
    
//     // Add show all button

    document.querySelector(".show").addEventListener("click",e=>{
        e.target
        document.querySelector(".card-container").innerHTML=`<div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="pritam/pritam cover.jpeg" alt="pritam">
        <h2>Pritam</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="arijit singh/arijit cover 2.jpg" alt="arijitsingh">
        <h2>Arijit singh</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="A.R. Rahman/arrahman cover.jpeg" alt="A.R.Rahman">
        <h2>A.R. Rahman</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="vishal mishra/vishal cover2.jpeg" alt="vishalmishra">
        <h2>Vishal Mishra</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="Anirudh/anirudh cover.jpeg" alt="Anirudh">
        <h2>Anirudh</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="astif aslam/astifaslam.jpg" alt="Atif Aslam">
        <h2>Atif Aslam</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="bpark/bpark.jpg" alt="Vishal-Shekar">
        <h2>Vishal-Shekar</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="darshan raval/darshan2.jpg" alt="Darshan Raval">
        <h2>Darshan Raval</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="sachin-jigar/sachin.jpg" alt="Sachin-Jigar">
        <h2>Sachin-Jigar</h2>
        <p>Artist</p>
    </div>
    <div class="card">
        <div class="play">
           <img src="svg/play.svg" alt="">
        </div>

        <img src="badsaah/badsaah.jpg" alt="BadShah">
        <h2>BadShah</h2>
        <p>Artist</p>
    </div>`
  
})


    //Attach an Event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {
            // console.log(element.srcElement);
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    // attach an event listner to play, next and perivous

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "svg/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "svg/songplay.svg"
        }
    })


    //listen for time update
    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentsong.currentTime)}/${secondsToMinutes(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    })

    // Add event listner in seekbar
    document.querySelector(".seekbar").addEventListener("click", function (e) {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        console.log(percent);
        console.log(e.offsetX, e.target.getBoundingClientRect().width);

        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })

    // add event listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", e => {
        e.target
        document.querySelector(".left").style.left = 0
    })
    //add event listner for close button
    document.querySelector(".close").addEventListener("click", e => {
        e.target
        document.querySelector(".left").style.left = "-120%"
    })

    //add event listner to pervious button
    previous.addEventListener("click",()=>{
        console.log("previous clicked");
        console.log(currentsong);
        let index = songs.indexOf(currentsong.src.split("/").slice(-1) [0])
        if ((index-1)>length) {
            playmusic(songs[index-1])
        }
    })


    //add event listner to next button
    next.addEventListener("click",()=>{
        console.log("next clicked");
        currentsong.src
        let index = songs.indexOf(currentsong.src.split("/").slice(-1) [0])
        if ((index+1)< songs.length) {
            playmusic(songs[index+1])
        }
    })

    // add event listner to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",e=>{
        console.log(e,e.target.value);
        currentsong.volume =parseInt( e.target.value)/100
    })
    //load the playlist whenever card is clicked
   Array.from( document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            console.log(item.currentTarget.dataset);
             songs = await getsongs(`songs/${ item.currentTarget.dataset.folder}`);
           
        })
    })
}


main()
