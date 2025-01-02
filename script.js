const spinButton = document.getElementById('spinButton');
const youtubePlayer = document.getElementById('youtubePlayer');
const wheelOverlay = document.querySelector('.wheel-overlay');

// Mostrar/ocultar la ruleta al tocar la pantalla
document.addEventListener('click', toggleWheel);
document.addEventListener('touchstart', toggleWheel);

function toggleWheel() {
  if (wheelOverlay.classList.contains('hidden')) {
    wheelOverlay.classList.remove('hidden'); // Mostrar la ruleta
  } else {
    wheelOverlay.classList.add('hidden'); // Ocultar la ruleta
  }
}

// Función para buscar videos de karaoke
const fetchYouTubeVideos = async () => {
  const apiKey = 'AIzaSyAm_AxD_vEjcaNdXDwhVgJG7Lszqw10yz8'; // Sustituye con tu API Key
  const query = 'karaoke';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items.map(item => `https://www.youtube.com/embed/${item.id.videoId}`);
    } else {
      console.error('No se encontraron videos.');
      return ['https://www.youtube.com/embed/dQw4w9WgXcQ']; // Video de respaldo
    }
  } catch (error) {
    console.error('Error al obtener los videos:', error);
    return ['https://www.youtube.com/embed/dQw4w9WgXcQ']; // Video de respaldo
  }
};

// Manejo del giro de la ruleta
spinButton.addEventListener('click', async () => {
  const videos = await fetchYouTubeVideos();
  const randomIndex = Math.floor(Math.random() * videos.length);
  const selectedVideo = videos[randomIndex];

  const spins = Math.floor(Math.random() * 5) + 3;
  const degrees = spins * 360 + randomIndex * 60;
  document.querySelector('.wheel-inner').style.transition = 'transform 4s ease-out';
  document.querySelector('.wheel-inner').style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
    youtubePlayer.src = selectedVideo;
    wheelOverlay.classList.add('hidden'); // Ocultar la ruleta después de usarla
  }, 4000);
});
