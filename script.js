const apiKey = 'ea3359c7f16d4cc2b72313702ed37b24';  
const apiUrlBase = 'https://api.rawg.io/api/games?platforms=7&page_size=12&key=' + apiKey;
let currentPage = 1;
let currentOrdering = 'name';  
let totalPages = 1;   
let searchQuery = ''; 

// Fungsi untuk mengambil data game
async function fetchGames() {
  try {
    const response = await fetch(`${apiUrlBase}&page=${currentPage}&ordering=${currentOrdering}&search=${searchQuery}`);
    const data = await response.json();
    const games = data.results;
    totalPages = Math.ceil(data.count / 10); // Menghitung total halaman berdasarkan jumlah game
    const gameListElement = document.getElementById('game-list');
    gameListElement.innerHTML = '';

    // Menampilkan daftar game
    games.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');
      
      const gameImage = game.background_image ? game.background_image : 'https://via.placeholder.com/250x250?text=No+Image';

      // Menampilkan logo platform (gambar ikon) sesuai dengan platform yang ada
      const logosHTML = game.platforms.map(platform => {
        const platformName = platform.platform.name.toLowerCase();
        let iconUrl = '';

        // Menentukan URL ikon SVG platform berdasarkan nama platform
        if (platformName.includes('playstation')) {
          iconUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v5.3.0/icons/playstation.svg';  // Ikon PlayStation
        } else if (platformName.includes('xbox')) {
          iconUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v5.3.0/icons/xbox.svg';  // Ikon Xbox
        } else if (platformName.includes('pc')) {
          iconUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v5.3.0/icons/windows.svg';  // Ikon Windows
        } else if (platformName.includes('nintendo')) {
          iconUrl = 'https://cdn.jsdelivr.net/npm/simple-icons@v5.3.0/icons/nintendo.svg';  // Ikon Nintendo
        }

        // Menampilkan ikon platform jika ditemukan
        return iconUrl ? `<img src="${iconUrl}" alt="${platform.platform.name}" class="platform-logo">` : '';
      }).join('');

      gameCard.innerHTML = `
        <img src="${gameImage}" alt="${game.name}">
        <h3>${game.name}</h3>
        <div class="platform-logos">${logosHTML}</div>
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

// Fungsi untuk memperbarui status tombol Previous dan Next
function updatePagination() {
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}

// Fungsi untuk mengubah halaman
function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  fetchGames();
}

// Fungsi untuk mengubah urutan berdasarkan nama
function changeOrdering() {
  currentOrdering = document.getElementById('ordering').value;
  fetchGames();
}

// Fungsi untuk menangani input pencarian berdasarkan nama game
function searchGames() {
  searchQuery = document.getElementById('search').value.trim();  // Ambil nilai input pencarian
  currentPage = 1;  // Reset ke halaman pertama saat melakukan pencarian baru
  fetchGames();
}

// Memanggil fetchGames saat pertama kali halaman dimuat
fetchGames();
