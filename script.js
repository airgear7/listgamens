// script.js
const apiKey = 'ea3359c7f16d4cc2b72313702ed37b24';  // Ganti dengan API key Anda
const apiUrlBase = 'https://api.rawg.io/api/games?platforms=7&page_size=12&key=' + apiKey;
let currentPage = 1;
let currentOrdering = 'name';  // Default urutan berdasarkan nama (A-Z)
let totalPages = 1;  // Jumlah total halaman
let searchQuery = '';  // Variabel untuk kata kunci pencarian

// Fungsi untuk mengambil data game
async function fetchGames() {
  try {
    const response = await fetch(`${apiUrlBase}&page=${currentPage}&ordering=${currentOrdering}&search=${searchQuery}`);
    const data = await response.json();
    const games = data.results;
    totalPages = Math.ceil(data.count / 10); // Menghitung total halaman berdasarkan jumlah game

    // Mengosongkan daftar game sebelum menambahkan yang baru
    const gameListElement = document.getElementById('game-list');
    gameListElement.innerHTML = '';

    // Menampilkan daftar game
    games.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');
      
      const gameImage = game.background_image ? game.background_image : 'https://via.placeholder.com/250x250?text=No+Image';
      
      // Menampilkan platform dalam format yang lebih rapi
      const platforms = game.platforms.map(platform => platform.platform.name).join(', ');

      gameCard.innerHTML = `
        <img src="${gameImage}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p><strong>Platforms:</strong> ${platforms}</p>
        <p><strong>Release Date:</strong> ${game.released}</p>
      `;
      
      gameListElement.appendChild(gameCard);
    });

    // Memperbarui status tombol Previous dan Next
    updatePagination();

  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}

