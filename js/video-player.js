
// 1 - let's select all required tags or elements (vamos selecionar todas as tags ou elementos necessários) 

// AQUI FOI SELECIONADO TODAS AS TAGS E OS ELEMENTOS NECESSÁRIOS USANDO UM SELETOR

const video_player = document.querySelector('#video_player'), // Selecionado ID do Documento.
mainVideo = video_player.querySelector('#main-video'), // Selecionar o ID do video
progressAreaTime = video_player.querySelector('.progressAreaTime'), 
controls = video_player.querySelector('.controls'), 
progress_area = video_player.querySelector('.progress-area'),
progress_bar = video_player.querySelector('.progress-bar'),
fast_rewind = video_player.querySelector('.fast-rewind'),
play_pause = video_player.querySelector('.play_pause    '),
fast_forward = video_player.querySelector('.fast-forward'),
volume = video_player.querySelector('.volume'),
volume_range = video_player.querySelector('.volume_range'),
current = video_player.querySelector('.current'),
duration = video_player.querySelector('.duration'),
auto_play = video_player.querySelector('.auto-play'),
settings_btn = video_player.querySelector('.settigns-btn'),
picture_in_picture = video_player.querySelector('.picture_in_picture'),
fullscreen = video_player.querySelector('.fullscreen'),
settings = video_player.querySelector('#settings'),
playback = video_player.querySelectorAll('.playback li');

/**********************************/
/* 1. CRIANDO FUNÇÃO DE PLAY E PAUSE NO VIDEO E ADICIONANDO UM EVENTO
/**********************************/

// FUNÇÃO - PLAY VIDEO 
function playVideo()
{
    play_pause.innerHTML = "pause";         // innerHTML Essa propriedade fornece uma forma simples de trocar completamente o conteúdo de um elemento.                               // document.body.innerHTML = "";
    play_pause.title = "pause";             // Adiciona um novo título no momento da ação do Play;
    video_player.classList.add('pause')     // Adicionando uma classe no elemento pai.
    mainVideo.play();                       // ID seletor da tag <video>
}
// FUNÇÃO - PAUSE VIDEO 
function pauseVideo()
{
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove('pause')
    mainVideo.pause();
}

// ADICIONANDO UM EVENTO - 
function isVideoPause()
{
    const isVideoPaused = video_player.classList.contains('pause');
    isVideoPaused ? pauseVideo() : playVideo() // Operador ternário - var resultado = <condicao> ? <verdadeiro> : <falso>
}
play_pause.addEventListener('click', isVideoPause); /* play_pause.addEventListener('click',()=>()); */
// ??????????????????
mainVideo.addEventListener('play', ()=>(
    playVideo()
))
mainVideo.addEventListener('pause', ()=>(
    pauseVideo()
))
/**********************************/
/* 2. CRIANDO EVENTOS PARA AVANÇAR E RETROCEDER O VIDEO 
/**********************************/
// fast_rewind (Retrocesso rápido)
fast_rewind.addEventListener('click', ()=>(
    mainVideo.currentTime -= 10
));

// fast_forward (avanço rápido)
fast_forward.addEventListener('click', ()=>(
    mainVideo.currentTime += 10
));

/**********************************/
/* 3. CARREGAR DURAÇÃO DO VÍDEO - 
/**********************************/

// CARREGAR DURAÇÃO DO VÍDEO - LOAD VIDEO DURATION
    // função para mostrar o total do vídeo
function loadData(e)
{
    let videoDuration = e.target.duration;

    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    // Se os segundos forem menores que 10, adicione 0 no início.
    totalSec < 10 ? totalSec = "0"+totalSec : totalSec;
    duration.innerHTML = `${totalMin}:${totalSec}`
};
mainVideo.addEventListener("loadeddata", loadData);
    // função para mostrar o tempo do video em andamento e a barra de progressão do video
function isTimeUpdate(e)
{
    let currentVideoTime = e.target.currentTime;

    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

    // Se os segundos forem menores que 10, adicione 0 no início.
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec;
    current.innerHTML = `${currentMin}:${currentSec}`;

    let videoDuration = e.target.duration;
    // mudança de largura da barra de progresso
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_bar.style.width = `${progressWidth}%`;
};
mainVideo.addEventListener('timeupdate', isTimeUpdate);
/**********************************/
/* 4. 
/**********************************/
    // Vamos atualizar o tempo atual de reprodução do vídeo de acordo com a largura da barra de progresso
function progressBarVideo(e)
{
    let videoDuration = mainVideo.duration;
    let progressWidthval = progress_area.clientWidth;
    let ClickOffsetX = e.offsetX;

    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
};
progress_area.addEventListener('click', progressBarVideo);
/**********************************/
/* 5. Change Volume (ALTERAR VOLUME) 
/**********************************/
function changeVolume()
{
    mainVideo.volume = volume_range.value / 100;

    if(volume_range.value == 0)
    {
        volume.innerHTML = "volume_off";
    }else if(volume_range.value < 40)
    {
        volume.innerHTML = "volume_down";
    }else
    {
        volume.innerHTML = "volume_up";
    }
};

volume_range.addEventListener('change', changeVolume);

function muteVolume()
{
    if(volume_range.value == 0)
    {
        volume_range.value = 50;
        mainVideo.volume = 0.5;
        volume.innerHTML = "volume_up"
    }else
    {
        volume_range.value = 0;
        mainVideo.volume = 0;
        volume.innerHTML = "volume_off"
    }
}
volume.addEventListener('click', muteVolume);
/**********************************/
/* 6. EXIBIR BLOCO QUE MOSTRA O TEMPO DA BARRA DE PROGRESSO 
/**********************************/
/*
 * Update progress area time and display block on mouse move (Atualize o tempo da área de progresso e exiba o bloco ao mover o mouse)
 */
function mouseMove(e)
{
    let progressWidthval = progress_area.clientWidth;
    let x = e.offsetX;

    progressAreaTime.style.setProperty('--x', `${x}px`);
    progressAreaTime.style.display = "block";

    let videoDuration = mainVideo.duration;
    let progressTime = Math.floor((x / progressWidthval) * videoDuration);

    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);

    // Se os segundos forem menores que 10, adicione 0 no início.
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec;

    progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

};
progress_area.addEventListener('mousemove', mouseMove);

function mouseLeave(e)
{
    progressAreaTime.style.display = "none";
}
progress_area.addEventListener('mouseleave', mouseLeave);
/**********************************/
/* 7. AUTOPLAY
/**********************************/ 

auto_play.addEventListener('click', () => {
    auto_play.classList.toggle('active');
   
    if(auto_play.classList.contains('active'))
    {
        auto_play.title = 'A reprodução automática está ativada';
    }else
    {
        auto_play.title = 'A reprodução automática está desativada';
    }
});

mainVideo.addEventListener("ended", () =>{
    if(auto_play.classList.contains('active'))
    {   
        playVideo();
    }else
    {
        play_pause.innerHTML = "replay";
        play_pause.title = "Replay";
    }
});
/**********************************/
/* 8. PICTURE IN PICTURE
/**********************************/
picture_in_picture.addEventListener('click', ()=>{
    mainVideo.requestPictureInPicture();
});
/**********************************/
/* 9. FULL SCREEN FUNCTION
/**********************************/
fullscreen.addEventListener('click', ()=>{
    if(!video_player.classList.contains('openFullScreen'))
    {
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    }else
    {
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();
    }
});
/**********************************/
/* 10. OPEN SETTINGS (abrir configurações) 
/**********************************/
function openSettigns(){
    settings.classList.toggle('active');
    settings_btn.classList.toggle('active');                       
};
settings_btn.addEventListener('click', openSettigns);

    // taxa de reprodução (PLAYBACK RATE)
playback.forEach((event)=>{
    event.addEventListener('click', ()=>{
        removeActiveClasses();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        mainVideo.playbackRate = speed;
    })
})
function removeActiveClasses()
{
    playback.forEach(event => {
        event.classList.remove('active')
    });
}
video_player.addEventListener('mouseover', () => {
    controls.classList.add('active');
})
video_player.addEventListener('mouseleave', () => {
    if(video_player.classList.contains('pause'))
    {
        if(settings_btn.classList.contains('active'))
        {
            controls.classList.add('active');
        } else {
            controls.classList.remove('active');
        }
    } else {
        controls.classList.add('active');
    }
})
if(video_player.classList.contains('pause'))
{
    if(settings_btn.classList.contains('active'))
    {
        controls.classList.remove('active');
    } else {
        controls.classList.add('active');
    }
} else {
    controls.classList.remove('active');
}
// Mobile touch controls
video_player.addEventListener('touchstart', () => {
    controls.classList.add('active');
    setTimeout(() => {
        controls.classList.remove('active');
    }, 8000);
})
video_player.addEventListener('touchove', () => {
    if(video_player.classList.contains('pause'))
    {
        controls.classList.remove('active');
    } else {
        controls.classList.add('active');
    }
})
