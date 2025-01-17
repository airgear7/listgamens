// script.js
const apiKey = 'ea3359c7f16d4cc2b72313702ed37b24';  // Ganti dengan kunci API yang valid dari RAWG API
const apiUrl = `https://api.rawg.io/api/games?platforms=7&page_size=10&key=${apiKey}`;  // Platform 7 = Nintendo Switch

const gameListElement = document.getElementById('game-list');

// Fungsi untuk mengambil data game dari API
async function fetchGames() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const games = data.results;
    
    // Menampilkan game di halaman
    games.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');
      
      const gameImage = game.background_image ? game.background_image : 'https://via.placeholder.com/250x350?text=No+Image';
      gameCard.innerHTML = `
        <img src="${gameImage}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>${game.released}</p>
      `;
      
      gameListElement.appendChild(gameCard);
    });
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

// Panggil fungsi untuk mengambil dan menampilkan game
fetchGames();
