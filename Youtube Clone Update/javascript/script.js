// all content
const menuButtons = document.querySelectorAll(".menu-button");
const screenOverlay = document.querySelector(".main-layout .screen-overlay");
const themeButton = document.querySelector(".navbar .theme-button i");

// Toggle sidebar visibility when menu buttons are clicked
menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-hidden");
    });
});

// Toggle sidebar visibility when screen overlay is clicked
screenOverlay.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
});

// Initialize dark mode based on localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeButton.classList.replace("uil-moon", "uil-sun");
} else {
    themeButton.classList.replace("uil-sun", "uil-moon");
}

// Toggle dark mode when theme button is clicked
themeButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    themeButton.classList.toggle("uil-sun", isDarkMode);
    themeButton.classList.toggle("uil-moon", !isDarkMode);
});

// Show sidebar on large screens by default
if (window.innerWidth >= 768) {
    document.body.classList.remove("sidebar-hidden");
}


// Preloading effet
window.addEventListener("load", function() {
    document.getElementById("preloader").style.animation = "easy-out 1.9s !important"
    document.getElementById("preloader").style.display = "none";
});

// result of search
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    fetchYouTubeVideos(query);
});

async function fetchYouTubeVideos(query) {
    const apiKey = 'AIzaSyCbyqDpVDCP52F6veQK-IyUbggIi-Y7BgQ';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
    }
}

function displayVideos(videos) {
    const videoList = document.querySelector('.video-list');
    videoList.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('a');
        videoCard.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
        <div class="thumbnail-container">
          <img src="${video.snippet.thumbnails.high.url}" alt="Video Thumbnail" class="thumbnail">
          <p class="duration">Duration</p>
        </div>
        <div class="video-info">
          <img src="images/user.jpg" alt="Channel Logo" class="icon">
          <div class="video-details">
            <h2 class="title">${video.snippet.title}</h2>
            <p class="channel-name">${video.snippet.channelTitle}</p>
            <p class="views">Views • Date</p>
          </div>
        </div>
      `;
        videoList.appendChild(videoCard);
    });
}