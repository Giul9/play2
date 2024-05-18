let musicas = [
    {titulo:'starman', artista:'David Bowie ', src:'musicas/starman.mp3', img:'imagens/pn5.jpg'},
    {titulo:'Chemtrails Over The Country Club', artista:'Lana Del Rey', src:'musicas/Lana.mp3', img:'imagens/pn2.jpeg'},
    {titulo:'I Want You', artista:'Mitski', src:'musicas/Mitski.mp3', img:'imagens/pn4.jpg'},
    {titulo:'Eyes Without A Face', artista:'Billy Idol', src:'musicas/Billy idol.mp3', img:'imagens/n1.jpeg'},
    {titulo:'Cheri Cheri Lady', artista:'Modern Talking', src:'musicas/Modern Talking.mp3', img:'imagens/n2.jpeg'},
    {titulo:'Look At Us Now', artista:'Daisy Jones & The Six', src:'musicas/Daisy Jones.mp3', img:'imagens/n3.jpeg'},
    

    
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1;
    }
    renderizarMusica(indexMusica);
    tocarMusica(); // Inicia a nova música automaticamente
});
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica >= musicas.length){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica(); // Inicia a nova música automaticamente
});
musica.addEventListener('ended', () => {
    indexMusica++;
    if (indexMusica >= musicas.length){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica(); // Inicia a nova música automaticamente
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}
