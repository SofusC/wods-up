document.getElementById("generate-btn").addEventListener("click", getRandomWorkout);

async function getRandomWorkout() {
  const category = document.getElementById("category").value;
  let url = '/api/workouts/random';
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    addWorkoutCard(data, 'cards-container');
  } catch (err) {
    console.error('Failed to fetch workout:', err);
  }
}

function addWorkoutCard(data, containerId) {
  const container = document.getElementById(containerId);
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = `${data.title}`;
  card.appendChild(title);

  data.workout.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    card.appendChild(p);
  });

  const favButton = document.createElement('button');
  favButton.textContent = '⭐ Favorite';
  favButton.style.marginTop = '10px';
  favButton.style.background = '#ffcc00';
  favButton.style.padding = '10px 18px';
  favButton.style.border = 'none';
  favButton.style.borderRadius = '10px';
  favButton.style.fontWeight = 'bold';
  favButton.style.cursor = 'pointer';
  favButton.onclick = () => saveFavorite(data);
  card.appendChild(favButton);

  container.prepend(card);
}

function saveFavorite(data) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favs.some(w => w.title === data.title)) {
    favs.push(data);
    localStorage.setItem("favorites", JSON.stringify(favs));
    loadFavorites();
  }
}

function loadFavorites() {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  const container = document.getElementById('favorites-container');
  container.innerHTML = '';
  favs.forEach(data => addWorkoutCard(data, 'favorites-container'));
}

window.onload = () => {
  loadFavorites();
};
