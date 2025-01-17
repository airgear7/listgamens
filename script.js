// script.js
const apiKey = 'ea3359c7f16d4cc2b72313702ed37b24';  // Ganti dengan API key Anda
const apiUrlBase = 'https://api.rawg.io/api/games?platforms=7&page_size=10&key=' + apiKey;
let currentPage = 1;
let currentOrdering = 'name';  // Default urutan berdasarkan nama (A-Z)

// Fungsi untuk mengambil data game
async function fetchGames() {
  try {
    const response = await fetch(`${apiUrlBase}&page=${currentPage}&ordering=${currentOrdering}`);
    const data = await response.json();
    const games = data.results;

    // Mengosongkan daftar game sebelum menambahkan yang baru
    const gameListElement = document.getElementById('game-list');
    gameListElement.innerHTML = '';

    // Menampilkan daftar game
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

    // Mengatur status tombol pagination
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * 10 >= data.count;
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

// Fungsi untuk mengubah halaman
function changePage(direction) {
  currentPage += direction;
  fetchGames();
}

// Fungsi untuk mengubah urutan berdasarkan nama
function changeOrdering() {
  currentOrdering = document.getElementById('ordering').value;
  fetchGames();
}

// Mengambil data game saat pertama kali halaman dimuat
fetchGames();
