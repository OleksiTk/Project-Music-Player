let inputSearch = document.querySelector(".search__body--input--place");
let buttonSearch = document.querySelector(".search--button");
let nextPageMusic = document.querySelector(".music--player__body");
let mainPageSearch = document.querySelector(".search__body");
let MusicPageBack = document.querySelector(".music--player__back");

MusicPageBack.addEventListener("click", (event) => {
  backPage(event);
});

buttonSearch.addEventListener("click", (events) => {
  SearchMusic();
  nextPage(events);
});

async function SearchMusic() {
  try {
    const token =
      "BQDj2A0SjOHzJHyVtt7CeZ9dYCjHmTRNJyDTy9s7pxS7eknXrFXxwxvddOXgRnW-P_x_V_u48m-SmrD-1s9yUE6MPdV9x6jXWZVP-t5VT-9OSmXqP29DvqnoMecikyELDv1_8F40C904hL27Y8SSf0aD_fNM7Msmjxq_btGQ7lCH0cW85BoGbVc8oEBfepmujXLtvEMuoKCe9o3Z5PK-8limL1lH3MD991JLJU5pQtAlecxMlu6ai9AwStFkO2kI0nM82SMtTP6T9bntQsq-li1DvD3s_Zx6";

    const trackName = inputSearch.value; // Замініть на назву треку, який ви хочете знайти

    const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      trackName
    )}&type=track&limit=10`;
    await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Додаємо токен в заголовок запиту
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Виводить знайдені треки
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error); // Якщо помилка, обробити її
  }
}

function nextPage(event) {
  if (event.type == "click") {
    mainPageSearch.style.display = "none";
    nextPageMusic.style.display = "flex";
  }
}

function backPage(event) {
  if (event.type == "click") {
    mainPageSearch.style.display = "flex";
    nextPageMusic.style.display = "none";
  }
}

let progress = document.querySelector(".music--player--progres");
let song = document.querySelector(".controls");
let crtIcon = document.querySelector(".fa-play");

crtIcon.addEventListener("click", playMusic);

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playMusic() {
  if (crtIcon.classList.contains("fa-pause")) {
    song.pause();
    crtIcon.classList.remove("fa-pause");
    crtIcon.classList.add("fa-play");
  } else {
    song.play();
    crtIcon.classList.add("fa-pause");
    crtIcon.classList.remove("fa-play");
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  crtIcon.classList.add("fa-pause");
  crtIcon.classList.remove("fa-play");
};
