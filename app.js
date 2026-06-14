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
const heroGrid = document.querySelector(".hero-grid");
const turntableCard = document.getElementById("turntable-card");
const playerShellBody = document.getElementById("player-shell-body");
const playerShellState = document.getElementById("player-shell-state");
const playerVisibilityToggle = document.getElementById("player-visibility-toggle");
const playerVisibilityLabel = document.getElementById("player-visibility-label");
const playerCollapsedSummary = document.getElementById("player-collapsed-summary");
const playerCollapsedTitle = document.getElementById("player-collapsed-title");
const playerCollapsedMeta = document.getElementById("player-collapsed-meta");
const liveClock = document.getElementById("live-clock");
const currentYear = document.getElementById("current-year");
const portalAuthState = document.getElementById("portal-auth-state");
const authToggleButton = document.getElementById("auth-toggle-button");
const authSettingsButton = document.getElementById("auth-settings-button");
const accessNote = document.getElementById("access-note");
const protectedEntryGroup = document.getElementById("protected-entry-group");
const accessLockedState = document.getElementById("access-locked-state");
const protectedEntryButtons = document.querySelectorAll(".protected-entry-button");
const unlockModal = document.getElementById("unlock-modal");
const unlockBackdrop = document.getElementById("unlock-modal-backdrop");
const unlockForm = document.getElementById("unlock-form");
const unlockInput = document.getElementById("unlock-input");
const unlockCancel = document.getElementById("unlock-cancel");
const unlockSubmitButton = document.getElementById("unlock-submit-button");
const unlockFeedback = document.getElementById("unlock-feedback");
const settingsModal = document.getElementById("settings-modal");
const settingsBackdrop = document.getElementById("settings-modal-backdrop");
const settingsForm = document.getElementById("settings-form");
const settingsCurrentPassword = document.getElementById("settings-current-password");
const settingsNewPassword = document.getElementById("settings-new-password");
const settingsConfirmPassword = document.getElementById("settings-confirm-password");
const settingsCancel = document.getElementById("settings-cancel");
const settingsFeedback = document.getElementById("settings-feedback");
const favoritesGrid = document.getElementById("favorites-grid");
const favoriteAddButton = document.getElementById("favorite-add-button");
const favoriteExportButton = document.getElementById("favorite-export-button");
const favoriteImportButton = document.getElementById("favorite-import-button");
const favoritesImportInput = document.getElementById("favorites-import-input");

const FAVORITES_KEY = "zeavin-favorites";
const PLAYLIST_STORAGE_KEY = "zeavin-custom-playlist";
const PROTECTED_CONFIG_KEY = "zeavin-protected-config";
const PLAYER_COLLAPSE_KEY = "zeavin-player-collapsed";
const DEFAULT_PLAYLIST_URL = "./assets/music/playlist.json";
const favoriteThemes = [
  "favorite-blue",
  "favorite-violet",
  "favorite-gold",
  "favorite-steel",
];
const defaultProtectedEntries = {
  nas4: {
    salt: "mlW1QDVzwGuN8iqXQoNSVg==",
    iv: "lKfVZpUhGD0GCL2Q",
    data: "fejj0peTVZjwHNfs8BI5MXlGcAE=",
    tag: "/BHgo9DdwqnsCunS+osa7g==",
  },
  nas6: {
    salt: "H3TwrEViWIM0y2mxQzq4Cw==",
    iv: "Gv1iaD+UvAXfeEVV",
    data: "WncCuFFVzioUMFSUWx5f5w/qKIm5EMp7zg==",
    tag: "WjApvxzDv3lYe1DEj0RAQw==",
  },
  remote: {
    salt: "RXti18hxvI4aA0o5pecilQ==",
    iv: "PhWIqUMHK4TFERbY",
    data: "8WJyS85i3ITjmZeYoic5QSr//8IahtM8xNgtBRnIfCGAhg==",
    tag: "pfPTGRKzpL602JhQUmRM7Q==",
  },
};

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
  loadingDefaultPlaylist: "\u6b63\u5728\u8bfb\u53d6\u9ed8\u8ba4\u6b4c\u5355",
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
  protectedEntryReady: "\u79c1\u6709\u5165\u53e3\u5df2\u89e3\u9501",
  protectedEntryFailed: "\u53e3\u4ee4\u4e0d\u6b63\u786e\uff0c\u65e0\u6cd5\u89e3\u5bc6\u79c1\u6709\u5165\u53e3",
  protectedEntryMissing: "\u79c1\u6709\u5165\u53e3\u914d\u7f6e\u4e22\u5931",
  protectedEntryUnsupported: "\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301 Web Crypto\uff0c\u65e0\u6cd5\u89e3\u5bc6\u5165\u53e3",
  protectedEntryHint: "\u8f93\u5165\u767b\u5f55\u53e3\u4ee4\u540e\u6253\u5f00\u79c1\u6709\u5165\u53e3",
  authLoggedOut: "\u672a\u767b\u5f55",
  authLoggedIn: "\u5df2\u767b\u5f55",
  authLoginReady: "\u5df2\u767b\u5f55\uff0c\u53ef\u76f4\u63a5\u8bbf\u95ee\u79c1\u6709\u5165\u53e3",
  authLoggedOutStatus: "\u5df2\u9000\u51fa\u767b\u5f55",
  authLoginTitle: "\u767b\u5f55\u79c1\u6709\u5165\u53e3",
  settingsSaved: "\u65b0\u53e3\u4ee4\u5df2\u4fdd\u5b58",
  settingsNeedLogin: "\u8bf7\u5148\u767b\u5f55\u540e\u518d\u4fee\u6539\u53e3\u4ee4",
  settingsCurrentInvalid: "\u5f53\u524d\u53e3\u4ee4\u4e0d\u6b63\u786e",
  settingsPasswordMismatch: "\u4e24\u6b21\u8f93\u5165\u7684\u65b0\u53e3\u4ee4\u4e0d\u4e00\u81f4",
  settingsPasswordShort: "\u65b0\u53e3\u4ee4\u81f3\u5c11\u8bf7\u8f93\u5165 8 \u4e2a\u5b57\u7b26",
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
let unlockTargetId = "";
let unlockedPassphrase = "";
let protectedEntries = loadProtectedEntries();
let playerCollapsed = loadPlayerCollapsedPreference();

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
  syncCollapsedPlayerSummary();
}

function base64ToBytes(value) {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

function loadProtectedEntries() {
  try {
    const raw = window.localStorage.getItem(PROTECTED_CONFIG_KEY);
    if (!raw) {
      return structuredClone(defaultProtectedEntries);
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return structuredClone(defaultProtectedEntries);
    }

    const normalized = {};
    Object.keys(defaultProtectedEntries).forEach((key) => {
      const item = parsed[key];
      if (
        item
        && typeof item.salt === "string"
        && typeof item.iv === "string"
        && typeof item.data === "string"
        && typeof item.tag === "string"
      ) {
        normalized[key] = item;
      } else {
        normalized[key] = defaultProtectedEntries[key];
      }
    });
    return normalized;
  } catch {
    return structuredClone(defaultProtectedEntries);
  }
}

function saveProtectedEntries() {
  window.localStorage.setItem(PROTECTED_CONFIG_KEY, JSON.stringify(protectedEntries));
}

function saveSessionPassphrase(passphrase) {
  unlockedPassphrase = passphrase;
}

async function decryptProtectedEntry(targetId, passphrase) {
  if (!window.crypto?.subtle) {
    throw new Error(copy.protectedEntryUnsupported);
  }

  const payload = protectedEntries[targetId];
  if (!payload) {
    throw new Error(copy.protectedEntryMissing);
  }

  const encoder = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(payload.salt),
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["decrypt"],
  );
  const encryptedData = base64ToBytes(payload.data);
  const authTag = base64ToBytes(payload.tag);
  const encryptedWithTag = new Uint8Array(encryptedData.length + authTag.length);
  encryptedWithTag.set(encryptedData);
  encryptedWithTag.set(authTag, encryptedData.length);
  const result = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: base64ToBytes(payload.iv),
      tagLength: 128,
    },
    key,
    encryptedWithTag,
  );
  return new TextDecoder().decode(result);
}

async function encryptProtectedValue(value, passphrase) {
  if (!window.crypto?.subtle) {
    throw new Error(copy.protectedEntryUnsupported);
  }

  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt"],
  );
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      tagLength: 128,
    },
    key,
    encoder.encode(value),
  );
  const bytes = new Uint8Array(encrypted);
  const encryptedData = bytes.slice(0, Math.max(0, bytes.length - 16));
  const authTag = bytes.slice(Math.max(0, bytes.length - 16));
  return {
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(encryptedData),
    tag: bytesToBase64(authTag),
  };
}

function setAccessNote() {
  if (!accessNote) {
    return;
  }

  accessNote.textContent = unlockedPassphrase
    ? "\u5df2\u767b\u5f55\uff0c\u8fd9\u4e09\u4e2a\u79c1\u6709\u5165\u53e3\u53ef\u76f4\u63a5\u6253\u5f00\u3002"
    : "\u79c1\u6709\u5165\u53e3\u5df2\u9690\u85cf\u771f\u5b9e\u5730\u5740\uff0c\u767b\u5f55\u540e\u53ef\u76f4\u63a5\u8bbf\u95ee\u3002";
}

function updateAuthUI() {
  const authenticated = Boolean(unlockedPassphrase);

  if (portalAuthState) {
    portalAuthState.textContent = authenticated ? copy.authLoggedIn : copy.authLoggedOut;
    portalAuthState.classList.toggle("is-authenticated", authenticated);
  }

  if (authToggleButton) {
    authToggleButton.textContent = authenticated ? "Logout" : "Login";
  }

  if (authSettingsButton) {
    authSettingsButton.disabled = !authenticated;
  }

  if (protectedEntryGroup) {
    protectedEntryGroup.hidden = !authenticated;
  }

  if (accessLockedState) {
    accessLockedState.hidden = authenticated;
  }

  protectedEntryButtons.forEach((button) => {
    button.hidden = !authenticated;
  });

  setAccessNote();
}

function hideUnlockModal() {
  unlockModal.hidden = true;
  unlockTargetId = "";
  unlockFeedback.textContent = "";
  unlockForm.reset();
}

function showUnlockModal(targetId = "") {
  unlockTargetId = targetId;
  unlockSubmitButton.textContent = targetId ? "\u767b\u5f55\u5e76\u6253\u5f00" : "Login";
  unlockFeedback.textContent = "";
  unlockForm.reset();
  unlockModal.hidden = false;
  window.requestAnimationFrame(() => {
    unlockInput.focus();
  });
}

function hideSettingsModal() {
  settingsModal.hidden = true;
  settingsFeedback.textContent = "";
  settingsForm.reset();
}

function showSettingsModal() {
  if (!unlockedPassphrase) {
    setStatus(copy.settingsNeedLogin);
    showUnlockModal();
    return;
  }

  settingsFeedback.textContent = "";
  settingsForm.reset();
  settingsModal.hidden = false;
  window.requestAnimationFrame(() => {
    settingsCurrentPassword.focus();
  });
}

async function openProtectedEntry(targetId, passphrase) {
  const url = await decryptProtectedEntry(targetId, passphrase);
  saveSessionPassphrase(passphrase);
  updateAuthUI();
  window.open(url, "_blank", "noopener,noreferrer");
  setStatus(copy.protectedEntryReady);
}

async function loginWithPassphrase(passphrase) {
  await decryptProtectedEntry("nas4", passphrase);
  saveSessionPassphrase(passphrase);
  updateAuthUI();
  setStatus(copy.authLoginReady);
}

function restoreSessionAuth() {
  saveSessionPassphrase("");
  updateAuthUI();
}

function loadPlayerCollapsedPreference() {
  try {
    const raw = window.localStorage.getItem(PLAYER_COLLAPSE_KEY);
    if (raw === "true") {
      return true;
    }
    if (raw === "false") {
      return false;
    }
  } catch {
    return window.matchMedia("(max-width: 720px)").matches;
  }

  return window.matchMedia("(max-width: 720px)").matches;
}

function savePlayerCollapsedPreference() {
  window.localStorage.setItem(PLAYER_COLLAPSE_KEY, String(playerCollapsed));
}

function syncCollapsedPlayerSummary() {
  if (!playerCollapsedTitle || !playerCollapsedMeta) {
    return;
  }

  const titleText = trackTitle?.textContent?.trim() || copy.trackIdle;
  const subtitleText = trackSubtitle?.textContent?.trim() || copy.trackHint;
  playerCollapsedTitle.textContent = titleText;
  playerCollapsedMeta.textContent = subtitleText;
}

function applyPlayerVisibility() {
  if (!turntableCard || !playerShellBody || !playerVisibilityToggle) {
    return;
  }

  turntableCard.classList.toggle("is-collapsed", playerCollapsed);
  heroGrid?.classList.toggle("player-collapsed", playerCollapsed);
  playerShellBody.hidden = playerCollapsed;

  if (playerCollapsedSummary) {
    playerCollapsedSummary.hidden = !playerCollapsed;
  }

  if (playerShellState) {
    playerShellState.textContent = playerCollapsed
      ? "\u64ad\u653e\u5668\u5df2\u9690\u85cf"
      : "\u64ad\u653e\u5668\u5df2\u5c55\u5f00";
  }

  if (playerVisibilityLabel) {
    playerVisibilityLabel.textContent = playerCollapsed
      ? "\u5c55\u5f00\u64ad\u653e\u5668"
      : "\u9690\u85cf";
  }

  playerVisibilityToggle.setAttribute(
    "aria-label",
    playerCollapsed ? "\u5c55\u5f00\u64ad\u653e\u5668" : "\u9690\u85cf\u64ad\u653e\u5668",
  );
  playerVisibilityToggle.setAttribute("aria-expanded", String(!playerCollapsed));
  syncCollapsedPlayerSummary();
}

function togglePlayerVisibility() {
  playerCollapsed = !playerCollapsed;
  savePlayerCollapsedPreference();
  applyPlayerVisibility();
}

async function handleProtectedEntryClick(targetId) {
  if (!targetId || !protectedEntries[targetId]) {
    setStatus(copy.protectedEntryMissing);
    return;
  }

  if (unlockedPassphrase) {
    try {
      await openProtectedEntry(targetId, unlockedPassphrase);
      return;
    } catch {
      saveSessionPassphrase("");
      updateAuthUI();
    }
  }

  setStatus(copy.protectedEntryHint);
  showUnlockModal(targetId);
}

function updateLiveClock() {
  if (!liveClock) {
    return;
  }

  const now = new Date();
  const datePart = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    timeZone: "Asia/Shanghai",
  }).format(now);
  const timePart = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(now);
  liveClock.textContent = `${datePart} ${timePart}`;
}

function getTrackSourceLabel(track) {
  return track.artist || track.source || copy.remoteSource;
}

function updateTrackMeta(track, index = activeTrackIndex) {
  if (!track) {
    trackKicker.textContent = "ZEAVIN PORTAL";
    trackTitle.textContent = copy.trackIdle;
    trackSubtitle.textContent = copy.trackHint;
    syncCollapsedPlayerSummary();
    return;
  }

  const currentIndex = Number.isInteger(index) && index >= 0 ? index : 0;
  const total = playlist.length || 1;
  const source = track.source || copy.defaultSource;
  trackKicker.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} \u00b7 ${source}`;
  trackTitle.textContent = track.title;
  trackSubtitle.textContent = getTrackSourceLabel(track);
  syncCollapsedPlayerSummary();
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

function getFavoriteHostname(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./i, "");
  } catch {
    return simplifyUrl(url);
  }
}

function getFavoriteBrandDetails(favorite) {
  const hostname = getFavoriteHostname(favorite.url);
  const brandMap = {
    "github.com": {
      className: "favorite-brand-github",
      iconUrl: "https://cdn.simpleicons.org/github/1f2328",
    },
    "google.com": {
      className: "favorite-brand-google",
      iconUrl: "https://cdn.simpleicons.org/google",
    },
    "baidu.com": {
      className: "favorite-brand-baidu",
      iconUrl: "https://cdn.simpleicons.org/baidu/2932e1",
    },
    "dash.cloudflare.com": {
      className: "favorite-brand-cloudflare",
      iconUrl: "https://cdn.simpleicons.org/cloudflare/f38020",
    },
    "zwwz.fun": {
      className: "favorite-brand-zwwz",
      fallbackText: "Z",
    },
  };

  if (brandMap[hostname]) {
    return brandMap[hostname];
  }

  if (hostname.endsWith(".zwwz.fun")) {
    return {
      className: "favorite-brand-zwwz",
      fallbackText: "Z",
    };
  }

  return {
    className: "",
    iconUrl: `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(favorite.url)}`,
  };
}

function getFavoriteFallbackText(title) {
  const trimmed = String(title || "").trim();
  if (!trimmed) {
    return "+";
  }

  return trimmed.charAt(0).toUpperCase();
}

function appendFavoriteIcon(container, favorite) {
  const brand = getFavoriteBrandDetails(favorite);
  const iconShell = document.createElement("span");
  iconShell.className = "favorite-icon-shell";

  const icon = document.createElement("span");
  icon.className = "favorite-icon";
  if (brand.className) {
    icon.classList.add(brand.className);
  }

  const image = document.createElement("img");
  image.className = "favorite-icon-image";
  image.src = brand.iconUrl || "";
  image.alt = "";
  image.loading = "lazy";
  image.referrerPolicy = "no-referrer";

  const fallback = document.createElement("span");
  fallback.className = "favorite-icon-fallback";
  fallback.textContent = brand.fallbackText || getFavoriteFallbackText(favorite.title);

  if (image.src) {
    image.addEventListener("load", () => {
      if (image.naturalWidth > 8 && image.naturalHeight > 8) {
        icon.classList.add("has-image");
      }
    });

    image.addEventListener("error", () => {
      icon.classList.remove("has-image");
    });
  }

  icon.append(image, fallback);
  iconShell.append(icon);
  container.append(iconShell);
}

function appendFavoriteCard(favorite, index) {
  const card = document.createElement("a");
  card.className = `favorite-card ${favorite.theme}`;
  card.href = favorite.url;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.draggable = true;
  card.title = `${favorite.title} · ${copy.reorderHint}`;

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
  note.textContent = favorite.note || getFavoriteHostname(favorite.url);

  const meta = document.createElement("span");
  meta.className = "favorite-meta";
  meta.append(title, note);

  const editButton = document.createElement("button");
  editButton.className = "favorite-edit";
  editButton.type = "button";
  editButton.textContent = "Edit";
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

  appendFavoriteIcon(card, favorite);
  card.append(meta, editButton);
  favoritesGrid.append(card);
}

function renderFavorites() {
  favoritesGrid.innerHTML = "";
  favorites.forEach((favorite, index) => appendFavoriteCard(favorite, index));
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

playerVisibilityToggle?.addEventListener("click", togglePlayerVisibility);

authToggleButton.addEventListener("click", () => {
  if (unlockedPassphrase) {
    saveSessionPassphrase("");
    updateAuthUI();
    hideUnlockModal();
    hideSettingsModal();
    setStatus(copy.authLoggedOutStatus);
    return;
  }

  showUnlockModal();
});

authSettingsButton.addEventListener("click", showSettingsModal);

protectedEntryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleProtectedEntryClick(button.dataset.protectedTarget || "");
  });
});

unlockBackdrop.addEventListener("click", hideUnlockModal);
unlockCancel.addEventListener("click", hideUnlockModal);

unlockForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const passphrase = unlockInput.value.trim();
  if (!passphrase) {
    unlockFeedback.textContent = copy.protectedEntryHint;
    return;
  }

  try {
    if (unlockTargetId) {
      await openProtectedEntry(unlockTargetId, passphrase);
    } else {
      await loginWithPassphrase(passphrase);
    }
    hideUnlockModal();
  } catch (error) {
    const message = error instanceof Error
      && (error.message === copy.protectedEntryMissing || error.message === copy.protectedEntryUnsupported)
      ? error.message
      : copy.protectedEntryFailed;
    unlockFeedback.textContent = message;
    setStatus(message);
    unlockInput.select();
  }
});

settingsBackdrop.addEventListener("click", hideSettingsModal);
settingsCancel.addEventListener("click", hideSettingsModal);

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!unlockedPassphrase) {
    settingsFeedback.textContent = copy.settingsNeedLogin;
    setStatus(copy.settingsNeedLogin);
    return;
  }

  const currentPassword = settingsCurrentPassword.value.trim();
  const newPassword = settingsNewPassword.value.trim();
  const confirmPassword = settingsConfirmPassword.value.trim();

  if (newPassword.length < 8) {
    settingsFeedback.textContent = copy.settingsPasswordShort;
    return;
  }

  if (newPassword !== confirmPassword) {
    settingsFeedback.textContent = copy.settingsPasswordMismatch;
    return;
  }

  try {
    const decryptedEntries = await Promise.all(
      Object.keys(protectedEntries).map(async (key) => ({
        key,
        value: await decryptProtectedEntry(key, currentPassword),
      })),
    );
    const nextEntries = {};
    for (const entry of decryptedEntries) {
      nextEntries[entry.key] = await encryptProtectedValue(entry.value, newPassword);
    }
    protectedEntries = nextEntries;
    saveProtectedEntries();
    saveSessionPassphrase(newPassword);
    updateAuthUI();
    settingsFeedback.textContent = copy.settingsSaved;
    setStatus(copy.settingsSaved);
    window.setTimeout(() => {
      hideSettingsModal();
    }, 400);
  } catch {
    settingsFeedback.textContent = copy.settingsCurrentInvalid;
    setStatus(copy.settingsCurrentInvalid);
    settingsCurrentPassword.select();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !unlockModal.hidden) {
    hideUnlockModal();
  }

  if (event.key === "Escape" && !settingsModal.hidden) {
    hideSettingsModal();
  }
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

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

updateTrackMeta(null, -1);
setStatus(copy.loadingDefaultPlaylist);
clearLyrics();
renderFavorites();
renderPlaylist();
syncPlaybackState();
syncProgress();
applyPlayerVisibility();
updateLiveClock();
window.setInterval(updateLiveClock, 1000);
restoreSessionAuth();
loadDefaultPlaylist();
