const spinButton = document.getElementById('spinButton');
const applyFilterButton = document.getElementById('applyFilter');
const filterInput = document.getElementById('filterInput');
const youtubePlayer = document.getElementById('youtubePlayer');
const wheelInner = document.querySelector('.wheel-inner');

let currentFilter = 'karaoke'; // Filtro por defecto

// Función para obtener videos de YouTube con el filtro actual
async function fetchYouTubeVideos() {
  const apiKey = 'AIzaSyBqIdiCdkVG2yqcJnBOzDtyzpraFm_fhKk8'; // Sustituye con tu API Key
  const query = `${currentFilter} karaoke`;
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
    console.error('Error al obtener videos:', error);
    return ['https://www.youtube.com/embed/dQw4w9WgXcQ']; // Video de respaldo
  }
}

// Aplica el filtro
applyFilterButton.addEventListener('click', () => {
  const filterValue = filterInput.value.trim();
  if (filterValue) {
    currentFilter = filterValue;
    spinButton.disabled = false; // Habilita el botón de la ruleta
    alert(`Filtro aplicado: ${currentFilter}`);
  } else {
    alert('Por favor ingresa un filtro válido.');
  }
});

// Manejo del giro de la ruleta
spinButton.addEventListener('click', async () => {
  const videos = await fetchYouTubeVideos();
  const randomIndex = Math.floor(Math.random() * videos.length);
  const selectedVideo = videos[randomIndex];

  const spins = Math.floor(Math.random() * 5) + 3; // Entre 3 y 7 giros
  const degrees = spins * 360 + randomIndex * 60; // Cada segmento tiene 60 grados
  wheelInner.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
    youtubePlayer.src = selectedVideo; // Cambia el video
  }, 4000);
});
