const { ipcRenderer } = require('electron');
let allTracks, currentTrack;
let musicAudio = new Audio();
document.getElementById('add-music').addEventListener("click", () => {
  ipcRenderer.send('add', 'music');
})

ipcRenderer.on('getTracks', (e, arg) => {
  const songLIst = document.getElementById('songs');
  const songs = document.getElementById('songs');
  console.log(songs, allTracks)
  songs.addEventListener('click', e => {
    e.preventDefault();
    const { dataset, classList } = e.target;
    let src = e.target.src;
    const id = dataset && dataset.id;
    console.log(id, e.target)
    if (id && classList.contains('play')) {
      if (currentTrack && currentTrack.id === id) {
        // 继续播放音乐
        musicAudio.play();
        if (dataset.status !== 'on') {
          musicAudio.play();
          e.target.setAttribute("src", '../node_modules/bootstrap-icons/icons/pause-fill.svg')
          dataset.status = 'on';
        } else {
          musicAudio.pause();
          e.target.setAttribute("src", '../node_modules/bootstrap-icons/icons/play-fill.svg')
          dataset.status = 'off';
        }
      } else {
        //播放新的音乐，还原新的图标；
        currentTrack = arg.find(element => element.id === id);
        const a=document.getElementsByClassName('play');
        const newArr=[];
        for(let i=0;i<a.length;++i){
          newArr.push(a[i]);
        }
        for(let i=0;i<newArr.length;++i){
          newArr[i].dataset.status = 'off';
          newArr[i].setAttribute("src", '../node_modules/bootstrap-icons/icons/play-fill.svg')
        }
        console.log(currentTrack)
        musicAudio.src = currentTrack.path;
        if (dataset.status !== 'on') {
          musicAudio.play();
          e.target.setAttribute("src", '../node_modules/bootstrap-icons/icons/pause-fill.svg')
          dataset.status = 'on';
        } else {
          musicAudio.pause();
          e.target.setAttribute("src", '../node_modules/bootstrap-icons/icons/play-fill.svg')
          dataset.status = 'off';
        }
      }
    }
    if (id && classList.contains('trash')) {
      // 删除
      ipcRenderer.send('delete',id)
    }
  })
  arg.forEach(element => {
    songLIst.innerHTML += `<div class="p-2 border border-secondary mt-4 d-flex justify-content-between">
    <div>
    <img src="../node_modules/bootstrap-icons/icons/music-note-beamed.svg" width="32" height="32" />${element.fileName}
    </div>
    <div>
    <img src="../node_modules/bootstrap-icons/icons/trash.svg" width="20" height="20" class="click trash" data-id=${element.id} />
  <img src="../node_modules/bootstrap-icons/icons/play-fill.svg" width="32" height="32" class="click play" data-id=${element.id} />
    </div>
      </div>`
  });
  allTracks = arg;
})