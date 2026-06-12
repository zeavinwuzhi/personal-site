const audio = document.getElementById("turntable-audio");
const fileInput = document.getElementById("audio-file-input");
const lyricsFileInput = document.getElementById("lyrics-file-input");
const playToggle = document.getElementById("play-toggle");
const prevTrack = document.getElementById("prev-track");
const nextTrack = document.getElementById("next-track");
const loadAudio = document.getElementById("load-audio");
const addUrlTrack = document.getElementById("add-url-track");
const loadLyrics = document.getElementById("load-lyrics");
const progressSlider = document.getElementById("progress-slider");
const currentTime = document.getElementById("current-time");
const durationTime = document.getElementById("duration-time");
const trackKicker = document.getElementById("track-kicker");
const trackTitle = document.getElementById("track-title");
const trackSubtitle = document.getElementById("track-subtitle");
const trackStatus = document.getElementById("track-status");
const vinylRecord = document.getElementById("vinyl-record");
const playlistElement = document.getElementById("playlist");
const lyricsWindow = document.getElementById("lyrics-window");
const lyricPrev = document.getElementById("lyric-prev");
const lyricCurrent = document.getElementById("lyric-current");
const lyricNext = document.getElementById("lyric-next");
const favoritesGrid = document.getElementById("favorites-grid");
const favoriteAddButton = document.getElementById("favorite-add-button");
const favoriteExportButton = document.getElementById("favorite-export-button");
const favoriteImportButton = document.getElementById("favorite-import-button");
const favoritesImportInput = document.getElementById("favorites-import-input");

const FAVORITES_KEY = "zeavin-favorites";
const PLAYLIST_STORAGE_KEY = "zeavin-custom-playlist";
const DEFAULT_PLAYLIST_URL = "./assets/music/playlist.json";
const favoriteThemes = [
  "favorite-blue",
  "favorite-violet",
  "favorite-gold",
  "favorite-steel",
];

const copy = {
  baiduNote: "\u641c\u7d22\u5165\u53e3",
  cloudflareNote: "\u63a7\u5236\u53f0",
  trackIdle: "\u672a\u8f7d\u5165\u97f3\u4e50",
  trackHint: "\u53ef\u9009\u62e9\u672c\u5730\u97f3\u9891\u6216\u6dfb\u52a0\u7f51\u7edc\u76f4\u94fe",
  noDefaultTracks: "\u672a\u914d\u7f6e\u9ed8\u8ba4\u6b4c\u5355",
  loaded: "\u672c\u5730\u97f3\u9891\u5df2\u8f7d\u5165",
  remoteLoaded: "\u7f51\u7edc\u97f3\u4e50\u5df2\u52a0\u5165",
  playing: "\u6b63\u5728\u64ad\u653e",
  paused: "\u5df2\u6682\u505c",
  playFailed: "\u64ad\u653e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u97f3\u9891\u5730\u5740\u6216\u6587\u4ef6",
  ended: "\u64ad\u653e\u7ed3\u675f",
  lyricsIdle: "\u7b49\u5f85\u97f3\u4e50\u548c\u6b4c\u8bcd",
  lyricsLoaded: "\u6b4c\u8bcd\u5df2\u8f7d\u5165",
  lyricsMissing: "\u6682\u65e0\u6b4c\u8bcd",
  lyricsFailed: "\u6b4c\u8bcd\u52a0\u8f7d\u5931\u8d25",
  defaultPlaylistReady: "\u9ed8\u8ba4\u6b4c\u5355\u5df2\u8f7d\u5165",
  playlistReady: "\u53ef\u76f4\u63a5\u64ad\u653e",
  localSource: "\u672c\u5730\u97f3\u4e50",
  remoteSource: "\u7f51\u7edc\u97f3\u4e50",
  defaultSource: "\u9ed8\u8ba4\u6b4c\u5355",
  favoriteName: "\u7f51\u7ad9\u540d\u79f0",
  favoriteUrl: "\u7f51\u7ad9\u5730\u5740\uff08\u53ef\u76f4\u63a5\u586b\u57df\u540d\uff09",
  favoriteNote: "\u526f\u6807\u9898\uff08\u53ef\u7559\u7a7a\uff09",
  favoriteDeleteConfirm: "\u5730\u5740\u7559\u7a7a\u4f1a\u5220\u9664\u8fd9\u4e2a\u6536\u85cf\uff0c\u786e\u8ba4\u5220\u9664\u5417\uff1f",
  favoriteFallback: "\u6536\u85cf",
  edit: "\u7f16\u8f91",
  addTitle: "\u6dfb\u52a0\u7f51\u7ad9",
  addNote: "\u70b9\u51fb\u81ea\u5b9a\u4e49\u6536\u85cf",
  exportName: "zeavin-favorites.json",
  importFailed: "\u5bfc\u5165\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5 JSON \u6587\u4ef6\u5185\u5bb9",
  importSuccess: "\u6536\u85cf\u5939\u5df2\u5bfc\u5165",
  exportDone: "\u6536\u85cf\u5939\u5df2\u5bfc\u51fa",
  reorderHint: "\u53ef\u62d6\u62fd\u6392\u5e8f",
  promptTrackTitle: "\u6b4c\u66f2\u540d\u79f0",
  promptTrackUrl: "\u97f3\u9891\u76f4\u94fe\uff08mp3/flac/m4a\uff09",
  promptLyricUrl: "\u6b4c\u8bcd LRC \u76f4\u94fe\uff08\u53ef\u7559\u7a7a\uff09",
};

const defaultFavorites = [
  {
    title: "Home",
    url: "https://zwwz.fun",
    note: "zwwz.fun",
    theme: "favorite-blue",
  },
  {
    title: "GitHub",
    url: "https://github.com/zeavinwuzhi/personal-site",
    note: "personal-site",
    theme: "favorite-violet",
  },
  {
    title: "Baidu",
    url: "https://www.baidu.com",
    note: copy.baiduNote,
    theme: "favorite-gold",
  },
  {
    title: "Cloudflare",
    url: "https://dash.cloudflare.com",
    note: copy.cloudflareNote,
    theme: "favorite-steel",
  },
];

let objectUrls = [];
let userSeeking = false;
let draggedFavoriteIndex = null;
let favorites = loadFavorites();
let playlist = loadStoredPlaylist();
let activeTrackIndex = -1;
let lyrics = [];
let activeLyricIndex = -1;

function formatTime(timeInSeconds) {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setStatus(message) {
  trackStatus.textContent = message;
}

function getTrackSourceLabel(track) {
  return track.artist || track.source || copy.remoteSource;
}

function updateTrackMeta(track, index = activeTrackIndex) {
  if (!track) {
    trackKicker.textContent = "DEFAULT PLAYLIST";
    trackTitle.textContent = copy.trackIdle;
    trackSubtitle.textContent = copy.trackHint;
    return;
  }

  const currentIndex = Number.isInteger(index) && index >= 0 ? index : 0;
  const total = playlist.length || 1;
  const source = track.source || copy.defaultSource;
  trackKicker.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} \u00b7 ${source}`;
  trackTitle.textContent = track.title;
  trackSubtitle.textContent = getTrackSourceLabel(track);
}

function syncPlaybackState() {
  const isLoaded = Boolean(audio.src);
  const isPlaying = !audio.paused && !audio.ended;

  playToggle.textContent = isPlaying ? "Pause" : "Play";
  playToggle.disabled = !isLoaded;
  prevTrack.disabled = playlist.length < 2;
  nextTrack.disabled = playlist.length < 2;
  vinylRecord.classList.toggle("is-spinning", isPlaying);
}

function syncProgress() {
  if (!userSeeking && Number.isFinite(audio.duration) && audio.duration > 0) {
    progressSlider.value = String((audio.currentTime / audio.duration) * 100);
  }

  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = formatTime(audio.duration);
  syncLyrics(audio.currentTime);
}

function normalizeUrl(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("./") || trimmed.startsWith("/")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function simplifyUrl(url) {
  try {
    const normalized = new URL(url, window.location.href);
    return normalized.host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function normalizeTrack(track, index = 0) {
  if (!track || typeof track.src !== "string") {
    return null;
  }

  const src = normalizeUrl(track.src);
  if (!src) {
    return null;
  }

  return {
    id: track.id || `track-${Date.now()}-${index}`,
    title: track.title || `${copy.favoriteFallback} ${index + 1}`,
    artist: track.artist || "",
    src,
    lrc: track.lrc ? normalizeUrl(track.lrc) : "",
    source: track.source || copy.remoteSource,
    persisted: track.persisted !== false,
  };
}

function loadStoredPlaylist() {
  try {
    const raw = window.localStorage.getItem(PLAYLIST_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((track, index) => normalizeTrack(track, index))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function savePlaylist() {
  const persistentTracks = playlist
    .filter((track) => track.persisted !== false && !track.src.startsWith("blob:"))
    .map(({ id, title, artist, src, lrc, source }) => ({ id, title, artist, src, lrc, source }));
  window.localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(persistentTracks));
}

async function loadDefaultPlaylist() {
  try {
    const response = await fetch(DEFAULT_PLAYLIST_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Default playlist missing");
    }

    const parsed = await response.json();
    if (!Array.isArray(parsed)) {
      throw new Error("Default playlist is not an array");
    }

    const defaultTracks = parsed
      .map((track, index) => normalizeTrack({
        ...track,
        source: track.source || "\u9ed8\u8ba4\u6b4c\u5355",
      }, index))
      .filter(Boolean);

    if (!defaultTracks.length) {
      setStatus(copy.noDefaultTracks);
      renderPlaylist();
      return;
    }

    const existingSources = new Set(playlist.map((track) => track.src));
    defaultTracks.forEach((track) => {
      if (!existingSources.has(track.src)) {
        playlist.push(track);
      }
    });
    savePlaylist();
    renderPlaylist();

    if (activeTrackIndex === -1) {
      loadTrack(0, false);
    }

    setStatus(copy.defaultPlaylistReady);
  } catch {
    setStatus(playlist.length ? copy.trackHint : copy.noDefaultTracks);
    renderPlaylist();
  }
}

function loadSelectedFile(file) {
  if (!file) {
    return;
  }

  const url = URL.createObjectURL(file);
  objectUrls.push(url);
  const track = {
    id: `local-${Date.now()}`,
    title: file.name.replace(/\.[^.]+$/, ""),
    artist: copy.localSource,
    src: url,
    lrc: "",
    source: copy.localSource,
    persisted: false,
  };
  playlist.push(track);
  activeTrackIndex = playlist.length - 1;
  renderPlaylist();
  loadTrack(activeTrackIndex, true);
  setStatus(copy.loaded);
}

function addNetworkTrack() {
  const title = window.prompt(copy.promptTrackTitle, "");
  if (title === null) {
    return;
  }

  const src = normalizeUrl(window.prompt(copy.promptTrackUrl, "") || "");
  if (!src) {
    return;
  }

  const lrc = normalizeUrl(window.prompt(copy.promptLyricUrl, "") || "");
  playlist.push({
    id: `remote-${Date.now()}`,
    title: title.trim() || simplifyUrl(src),
    artist: simplifyUrl(src),
    src,
    lrc,
    source: copy.remoteSource,
    persisted: true,
  });
  savePlaylist();
  activeTrackIndex = playlist.length - 1;
  renderPlaylist();
  loadTrack(activeTrackIndex, true);
  setStatus(copy.remoteLoaded);
}

function loadTrack(index, autoplay = false) {
  const track = playlist[index];
  if (!track) {
    audio.removeAttribute("src");
    updateTrackMeta(null, -1);
    setStatus(copy.trackHint);
    clearLyrics();
    syncPlaybackState();
    return;
  }

  activeTrackIndex = index;
  audio.src = track.src;
  audio.load();
  updateTrackMeta(track, index);
  setStatus(copy.playlistReady);
  progressSlider.value = "0";
  currentTime.textContent = "00:00";
  durationTime.textContent = "00:00";
  clearLyrics();
  renderPlaylist();
  syncPlaybackState();

  if (track.lrc) {
    loadLyricsFromUrl(track.lrc);
  }

  if (autoplay) {
    audio.play().catch(() => {
      setStatus(copy.playFailed);
      syncPlaybackState();
    });
  }
}

function playAdjacentTrack(direction) {
  if (!playlist.length) {
    return;
  }

  const current = activeTrackIndex === -1 ? 0 : activeTrackIndex;
  const nextIndex = (current + direction + playlist.length) % playlist.length;
  loadTrack(nextIndex, true);
}

function parseTimestamp(value) {
  const match = value.match(/(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?/);
  if (!match) {
    return null;
  }

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const fraction = Number((match[3] || "0").padEnd(3, "0"));
  return minutes * 60 + seconds + fraction / 1000;
}

function parseLrc(text) {
  return text
    .split(/\r?\n/)
    .flatMap((line) => {
      const tags = [...line.matchAll(/\[(\d{1,2}:\d{2}(?:[.:]\d{1,3})?)\]/g)];
      const lyricText = line.replace(/\[[^\]]+\]/g, "").trim();
      return tags
        .map((tag) => ({
          time: parseTimestamp(tag[1]),
          text: lyricText,
        }))
        .filter((item) => item.time !== null && item.text);
    })
    .sort((a, b) => a.time - b.time);
}

function clearLyrics() {
  lyrics = [];
  activeLyricIndex = -1;
  lyricsWindow.classList.add("is-empty");
  lyricsWindow.classList.remove("is-live");
  lyricPrev.textContent = "";
  lyricCurrent.textContent = copy.lyricsIdle;
  lyricNext.textContent = "";
}

function setLyrics(text) {
  lyrics = parseLrc(text);
  activeLyricIndex = -1;
  if (!lyrics.length) {
    lyricsWindow.classList.add("is-empty");
    lyricsWindow.classList.remove("is-live");
    lyricCurrent.textContent = copy.lyricsMissing;
    return;
  }

  lyricsWindow.classList.remove("is-empty");
  lyricsWindow.classList.add("is-live");
  lyricCurrent.textContent = lyrics[0].text;
  lyricNext.textContent = lyrics[1] ? lyrics[1].text : "";
  setStatus(copy.lyricsLoaded);
}

async function loadLyricsFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lyrics request failed");
    }

    setLyrics(await response.text());
  } catch {
    setStatus(copy.lyricsFailed);
  }
}

function syncLyrics(time) {
  if (!lyrics.length) {
    return;
  }

  let nextIndex = lyrics.findIndex((line, index) => {
    const following = lyrics[index + 1];
    return time >= line.time && (!following || time < following.time);
  });

  if (nextIndex === -1) {
    nextIndex = time < lyrics[0].time ? 0 : lyrics.length - 1;
  }

  if (nextIndex === activeLyricIndex) {
    return;
  }

  activeLyricIndex = nextIndex;
  lyricPrev.textContent = lyrics[nextIndex - 1] ? lyrics[nextIndex - 1].text : "";
  lyricCurrent.textContent = lyrics[nextIndex] ? lyrics[nextIndex].text : copy.lyricsMissing;
  lyricNext.textContent = lyrics[nextIndex + 1] ? lyrics[nextIndex + 1].text : "";
}

function renderPlaylist() {
  playlistElement.innerHTML = "";

  if (!playlist.length) {
    const empty = document.createElement("p");
    empty.className = "playlist-empty";
    empty.textContent = copy.noDefaultTracks;
    playlistElement.append(empty);
    return;
  }

  playlist.forEach((track, index) => {
    const item = document.createElement("button");
    item.className = "playlist-item";
    item.type = "button";
    item.classList.toggle("is-active", index === activeTrackIndex);
    item.addEventListener("click", () => loadTrack(index, true));

    const title = document.createElement("span");
    title.className = "playlist-title";
    title.textContent = track.title;

    const source = document.createElement("span");
    source.className = "playlist-source";
    source.textContent = track.artist || track.source || simplifyUrl(track.src);

    item.append(title, source);
    playlistElement.append(item);
  });

  const activeItem = playlistElement.querySelector(".playlist-item.is-active");
  if (activeItem) {
    activeItem.scrollIntoView({ block: "nearest" });
  }
}

function sanitizeFavorite(item, index = 0) {
  if (!item || typeof item.title !== "string" || typeof item.url !== "string") {
    return null;
  }

  const url = normalizeUrl(item.url);
  if (!url) {
    return null;
  }

  return {
    title: item.title.trim() || `${copy.favoriteFallback} ${index + 1}`,
    url,
    note: typeof item.note === "string" && item.note.trim() ? item.note.trim() : simplifyUrl(url),
    theme: favoriteThemes.includes(item.theme) ? item.theme : favoriteThemes[index % favoriteThemes.length],
  };
}

function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [...defaultFavorites];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...defaultFavorites];
    }

    const normalized = parsed
      .map((item, index) => sanitizeFavorite(item, index))
      .filter(Boolean);

    return normalized.length ? normalized : [...defaultFavorites];
  } catch {
    return [...defaultFavorites];
  }
}

function saveFavorites() {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function askFavoriteDraft(currentFavorite = null) {
  const currentTitle = currentFavorite ? currentFavorite.title : "";
  const currentUrl = currentFavorite ? currentFavorite.url : "";
  const currentNote = currentFavorite ? currentFavorite.note : "";

  const title = window.prompt(copy.favoriteName, currentTitle);
  if (title === null) {
    return null;
  }

  const urlInput = window.prompt(copy.favoriteUrl, currentUrl);
  if (urlInput === null) {
    return null;
  }

  const normalizedUrl = normalizeUrl(urlInput);
  if (!normalizedUrl) {
    if (currentFavorite && window.confirm(copy.favoriteDeleteConfirm)) {
      return { remove: true };
    }
    return null;
  }

  const noteInput = window.prompt(copy.favoriteNote, currentNote);
  if (noteInput === null) {
    return null;
  }

  return {
    title: title.trim() || simplifyUrl(normalizedUrl),
    url: normalizedUrl,
    note: noteInput.trim() || simplifyUrl(normalizedUrl),
  };
}

function appendFavoriteCard(favorite, index) {
  const card = document.createElement("a");
  card.className = `favorite-card ${favorite.theme}`;
  card.href = favorite.url;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.draggable = true;
  card.title = copy.reorderHint;

  card.addEventListener("dragstart", (event) => {
    draggedFavoriteIndex = index;
    card.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(index));
    }
  });

  card.addEventListener("dragend", () => {
    draggedFavoriteIndex = null;
    favoritesGrid.querySelectorAll(".favorite-card").forEach((item) => {
      item.classList.remove("is-dragging", "drop-target");
    });
  });

  card.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (draggedFavoriteIndex === null || draggedFavoriteIndex === index) {
      return;
    }

    favoritesGrid.querySelectorAll(".favorite-card").forEach((item) => {
      item.classList.remove("drop-target");
    });
    card.classList.add("drop-target");
  });

  card.addEventListener("dragleave", () => {
    card.classList.remove("drop-target");
  });

  card.addEventListener("drop", (event) => {
    event.preventDefault();
    card.classList.remove("drop-target");
    moveFavorite(draggedFavoriteIndex, index);
  });

  const title = document.createElement("span");
  title.className = "favorite-title";
  title.textContent = favorite.title;

  const note = document.createElement("span");
  note.className = "favorite-url";
  note.textContent = favorite.note;

  const editButton = document.createElement("button");
  editButton.className = "favorite-edit";
  editButton.type = "button";
  editButton.textContent = copy.edit;
  editButton.setAttribute("aria-label", `${copy.edit} ${favorite.title}`);
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const draft = askFavoriteDraft(favorite);
    if (!draft) {
      return;
    }

    if (draft.remove) {
      favorites.splice(index, 1);
    } else {
      favorites[index] = {
        ...favorite,
        ...draft,
      };
    }

    favorites = favorites.map((item, themeIndex) => ({
      ...item,
      theme: favoriteThemes[themeIndex % favoriteThemes.length],
    }));
    saveFavorites();
    renderFavorites();
  });

  card.append(title, note, editButton);
  favoritesGrid.append(card);
}

function appendAddCard() {
  const addCard = document.createElement("button");
  addCard.className = "favorite-card favorite-add";
  addCard.type = "button";

  const addTitle = document.createElement("span");
  addTitle.className = "favorite-title";
  addTitle.textContent = copy.addTitle;

  const addNote = document.createElement("span");
  addNote.className = "favorite-url";
  addNote.textContent = copy.addNote;

  addCard.append(addTitle, addNote);
  addCard.addEventListener("click", () => {
    const draft = askFavoriteDraft();
    if (!draft) {
      return;
    }

    favorites.push({
      ...draft,
      theme: favoriteThemes[favorites.length % favoriteThemes.length],
    });
    saveFavorites();
    renderFavorites();
  });

  favoritesGrid.append(addCard);
}

function renderFavorites() {
  favoritesGrid.innerHTML = "";
  favorites.forEach((favorite, index) => appendFavoriteCard(favorite, index));
  appendAddCard();
}

function moveFavorite(fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex === null ||
    toIndex === null ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= favorites.length ||
    toIndex >= favorites.length
  ) {
    return;
  }

  const [moved] = favorites.splice(fromIndex, 1);
  favorites.splice(toIndex, 0, moved);
  favorites = favorites.map((item, index) => ({
    ...item,
    theme: favoriteThemes[index % favoriteThemes.length],
  }));
  saveFavorites();
  renderFavorites();
}

function exportFavorites() {
  const payload = JSON.stringify(favorites, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "zeavin-favorites.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
  setStatus(copy.exportDone);
}

function importFavoritesFromText(text) {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) {
    throw new Error("Invalid favorites format");
  }

  const importedFavorites = parsed
    .map((item, index) => sanitizeFavorite(item, index))
    .filter(Boolean);

  if (!importedFavorites.length) {
    throw new Error("No valid favorites");
  }

  favorites = importedFavorites.map((item, index) => ({
    ...item,
    theme: favoriteThemes[index % favoriteThemes.length],
  }));
  saveFavorites();
  renderFavorites();
  setStatus(copy.importSuccess);
}

playToggle.addEventListener("click", async () => {
  if (!audio.src && playlist.length) {
    loadTrack(activeTrackIndex === -1 ? 0 : activeTrackIndex, false);
  }

  if (!audio.src) {
    fileInput.click();
    return;
  }

  if (audio.paused) {
    try {
      await audio.play();
      setStatus(copy.playing);
    } catch {
      setStatus(copy.playFailed);
    }
  } else {
    audio.pause();
    setStatus(copy.paused);
  }

  syncPlaybackState();
});

prevTrack.addEventListener("click", () => playAdjacentTrack(-1));
nextTrack.addEventListener("click", () => playAdjacentTrack(1));

loadAudio.addEventListener("click", () => {
  fileInput.click();
});

addUrlTrack.addEventListener("click", addNetworkTrack);

loadLyrics.addEventListener("click", () => {
  const currentTrack = playlist[activeTrackIndex];
  if (currentTrack && currentTrack.lrc) {
    loadLyricsFromUrl(currentTrack.lrc);
    return;
  }

  lyricsFileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const target = event.target;
  const file = target.files && target.files[0];
  loadSelectedFile(file);
  target.value = "";
});

lyricsFileInput.addEventListener("change", async (event) => {
  const target = event.target;
  const file = target.files && target.files[0];
  if (!file) {
    return;
  }

  try {
    setLyrics(await file.text());
  } catch {
    setStatus(copy.lyricsFailed);
  } finally {
    target.value = "";
  }
});

audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = formatTime(audio.duration);
  syncPlaybackState();
  syncProgress();
});

audio.addEventListener("timeupdate", syncProgress);
audio.addEventListener("play", syncPlaybackState);
audio.addEventListener("pause", syncPlaybackState);
audio.addEventListener("ended", () => {
  setStatus(copy.ended);
  if (playlist.length > 1) {
    playAdjacentTrack(1);
  } else {
    syncPlaybackState();
  }
});

progressSlider.addEventListener("input", () => {
  userSeeking = true;
});

progressSlider.addEventListener("change", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(progressSlider.value) / 100) * audio.duration;
  }

  userSeeking = false;
  syncProgress();
});

favoriteAddButton.addEventListener("click", () => {
  const draft = askFavoriteDraft();
  if (!draft) {
    return;
  }

  favorites.push({
    ...draft,
    theme: favoriteThemes[favorites.length % favoriteThemes.length],
  });
  saveFavorites();
  renderFavorites();
});

favoriteExportButton.addEventListener("click", exportFavorites);

favoriteImportButton.addEventListener("click", () => {
  favoritesImportInput.click();
});

favoritesImportInput.addEventListener("change", async (event) => {
  const target = event.target;
  const file = target.files && target.files[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    importFavoritesFromText(text);
  } catch {
    setStatus(copy.importFailed);
  } finally {
    target.value = "";
  }
});

window.addEventListener("beforeunload", () => {
  objectUrls.forEach((url) => URL.revokeObjectURL(url));
});

updateTrackMeta(null, -1);
setStatus(copy.defaultPlaylistReady);
clearLyrics();
renderFavorites();
renderPlaylist();
syncPlaybackState();
syncProgress();
loadDefaultPlaylist();
