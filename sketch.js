// Botões categoria com animação e troca de conteúdo
const links = document.querySelectorAll('.category-link');
const heading = document.getElementById('dynamic-main-heading');
const newsContent = document.getElementById('news-content');
const videosContent = document.getElementById('videos-content');
const musicsContent = document.getElementById('musics-content');

function showContent(category) {
  newsContent.style.display = category === 'news' ? 'block' : 'none';
  videosContent.style.display = category === 'videos' ? 'block' : 'none';
  musicsContent.style.display = category === 'musics' ? 'block' : 'none';

  if (category === 'news') heading.textContent = 'Últimas Notícias da Guilda';
  else if (category === 'videos') heading.textContent = 'Vídeos Recentes';
  else if (category === 'musics') heading.textContent = 'Músicas da Guilda';
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Ativa animação de salto + brilho
    link.classList.remove('jump-effect');
    void link.offsetWidth; // Reflow para resetar animação
    link.classList.add('jump-effect');

    // Troca o conteúdo
    const category = link.getAttribute('data-category');
    showContent(category);
  });
});

// Inicializa com notícias abertas
showContent('news');

// Player de música funcional
document.querySelectorAll('.audio-item-container').forEach(container => {
  const audio = container.querySelector('audio');
  const playButton = container.querySelector('.play-button');
  const progressBar = container.querySelector('.progress-bar');
  const currentTimeEl = container.querySelector('.current-time');
  const durationEl = container.querySelector('.duration');
  let isDragging = false;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    progressBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!isDragging) {
      progressBar.value = audio.currentTime;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  playButton.addEventListener('click', () => {
    // Pausa os outros áudios
    document.querySelectorAll('audio').forEach(a => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0;
        const btn = a.closest('.audio-item-container').querySelector('.play-button');
        if (btn) btn.textContent = '►';
      }
    });

    if (audio.paused) {
      audio.play();
      playButton.textContent = '❚❚';
    } else {
      audio.pause();
      playButton.textContent = '►';
    }

    audio.onended = () => {
      playButton.textContent = '►';
      progressBar.value = 0;
      currentTimeEl.textContent = '0:00';
    };
  });

  progressBar.addEventListener('input', () => {
    isDragging = true;
    currentTimeEl.textContent = formatTime(Number(progressBar.value));
  });

  progressBar.addEventListener('change', () => {
    audio.currentTime = Number(progressBar.value);
    isDragging = false;
  });
});
