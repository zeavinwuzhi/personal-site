(() => {
const TIME_ZONE = "Asia/Shanghai";
const BLOG_STORAGE_KEY = "zeavin-blog-posts-v1";
const PROFILE_STORAGE_KEY = "zeavin-profile-v1";
const CONTACT_STORAGE_KEY = "zeavin-contact-v1";
const PROTECTED_CONFIG_KEY = "zeavin-protected-config";
const AUTH_SESSION_STORAGE_KEY = "zeavin-owner-session-passphrase";

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

const authCopy = {
  loggedOut: "未登录",
  loggedIn: "已登录",
  loggedOutStatus: "已退出登录，编辑区已隐藏。",
  loginReady: "已登录，当前页面可以进入编辑模式。",
  loginHint: "请输入登录口令。",
  loginFailed: "口令不正确，无法进入编辑模式。",
  missingConfig: "私有入口配置缺失，无法校验登录口令。",
  unsupported: "当前浏览器不支持 Web Crypto，无法校验登录口令。",
  settingsNeedLogin: "请先登录后再修改口令。",
  settingsSaved: "新口令已保存，当前会话已同步更新。",
  settingsCurrentInvalid: "当前口令不正确。",
  settingsPasswordMismatch: "两次输入的新口令不一致。",
  settingsPasswordShort: "新口令至少请输入 8 个字符。",
};

const defaultBlogDraft = {
  title: "主页改造记录",
  category: "更新日志",
  date: formatDateForInput(new Date()),
  summary: "把主页、播放器和子页面慢慢整理成一个更像个人站点的样子。",
  content:
    "先把导航、展示和私有入口理顺，再把博客、个人资料和联系方式拆成前台展示与后台编辑两层。\n\n"
    + "这样访客看到的是干净的公开内容，而你自己登录后再决定如何继续维护它。",
};

const defaultBlogPosts = [
  {
    id: "blog-welcome",
    title: "欢迎来到博客",
    category: "更新日志",
    date: formatDateForInput(new Date()),
    summary: "这里保留项目复盘、NAS 折腾记录和页面改版笔记。",
    content:
      "先展示标题，再点开看全文，是很多成熟个人博客都会采用的方式。\n\n"
      + "它能让目录更清楚，也让真正愿意读的人在进入正文时更专注。",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "blog-roadmap",
    title: "下一步想补的内容",
    category: "规划",
    date: formatDateForInput(new Date()),
    summary: "把主页继续补成一个能长期维护、持续生长的个人站点。",
    content:
      "后面可以继续补上：\n"
      + "1. 文章分类与归档\n"
      + "2. 图片或作品展示页\n"
      + "3. 更细的个人资料与联系入口\n"
      + "4. 文章搜索和标签筛选",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const defaultProfile = {
  name: "Zeavin",
  title: "个人主页 / 家庭网络 / 远程入口",
  location: "Shanghai · UTC+8",
  intro:
    "我把这个站点当成自己的网络控制台和日常入口：一边维护 NAS、远程桌面和常用服务，一边慢慢把它补成更像“个人名片 + 项目展台 + 生活记录”的样子。",
  focus: "NAS、远程桌面、网站改版、个人知识库",
  style: "偏爱慢慢打磨，保留一点江湖气，也保留一点实用主义。",
  signature: "自我完整，即是乐趣",
  tags: ["NAS", "Remote", "Blog", "Music", "Favorites"],
};

const defaultContact = {
  headline: "把公开入口和私有入口分开",
  intro:
    "主页上只保留公开可见的联系信息，而把 NAS、远程桌面等入口放在登录之后。这样既干净，也方便后续继续扩展。",
  home: {
    label: "Home",
    value: "zwwz.fun",
    url: "https://zwwz.fun",
  },
  github: {
    label: "GitHub",
    value: "personal-site",
    url: "https://github.com/zeavinwuzhi/personal-site",
  },
  email: {
    label: "Mail",
    value: "hello@zeavin.fun",
    url: "mailto:hello@zeavin.fun",
  },
  message: {
    label: "Message",
    value: "留言板",
    url: "#message",
  },
  note: "如果后面想公开更多方式，可以继续补充社交账号、表单或中转页。",
};

const mounts = {
  blog: new WeakMap(),
  profile: new WeakMap(),
  contact: new WeakMap(),
};

const mountedRoots = new Map();
const isDirectSubpage = Boolean(document.querySelector(".subpage-hero"));
const authStateNode = document.getElementById("portal-auth-state");
const authToggleButton = document.getElementById("auth-toggle-button");
const authSettingsButton = document.getElementById("auth-settings-button");
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
const liveClock = document.getElementById("live-clock");
const currentYear = document.getElementById("current-year");

let authHandlersBound = false;

function clone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return clone(fallback);
    }

    const parsed = JSON.parse(raw);
    if (parsed == null) {
      return clone(fallback);
    }

    return parsed;
  } catch {
    return clone(fallback);
  }
}

function writeJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
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
  const parsed = readJSON(PROTECTED_CONFIG_KEY, defaultProtectedEntries);
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
}

function saveProtectedEntries(entries) {
  writeJSON(PROTECTED_CONFIG_KEY, entries);
}

function getSessionPassphrase() {
  try {
    return window.sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function isAuthenticated() {
  return Boolean(getSessionPassphrase());
}

function setSessionPassphrase(passphrase) {
  try {
    if (passphrase) {
      window.sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, passphrase);
    } else {
      window.sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    }
  } catch {
    // Ignore session storage failures and keep the current render flow alive.
  }

  window.dispatchEvent(new CustomEvent("zeavin-auth-change", {
    detail: {
      authenticated: Boolean(passphrase),
    },
  }));
}

async function decryptProtectedEntry(targetId, passphrase, entries = loadProtectedEntries()) {
  if (!window.crypto?.subtle) {
    throw new Error(authCopy.unsupported);
  }

  const payload = entries[targetId];
  if (!payload) {
    throw new Error(authCopy.missingConfig);
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
    throw new Error(authCopy.unsupported);
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

function currentDateTimeParts() {
  const now = new Date();
  const datePart = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    timeZone: TIME_ZONE,
  }).format(now);
  const timePart = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(now);
  return { datePart, timePart };
}

function updateLiveClock() {
  if (!liveClock) {
    return;
  }

  const { datePart, timePart } = currentDateTimeParts();
  liveClock.textContent = `${datePart} ${timePart}`;
}

function updateCurrentYear() {
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
}

function formatDateForInput(value) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function getPageName(pathname = window.location.pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  const fileName = normalized.split("/").filter(Boolean).pop() || "";
  if (fileName === "index.html") {
    return "";
  }
  return fileName.replace(/\.html$/i, "");
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setHTML(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) {
    element.innerHTML = "";
    element.textContent = value;
  }
}

function setInput(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) {
    element.value = value;
  }
}

function getInput(root, selector) {
  const element = root.querySelector(selector);
  return element ? element.value.trim() : "";
}

function normalizePost(post) {
  return {
    id: post.id || createId("blog"),
    title: post.title || defaultBlogDraft.title,
    category: post.category || defaultBlogDraft.category,
    date: post.date || defaultBlogDraft.date,
    summary: post.summary || "",
    content: post.content || "",
    createdAt: post.createdAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.createdAt || new Date().toISOString(),
  };
}

function getBlogPosts() {
  const posts = readJSON(BLOG_STORAGE_KEY, defaultBlogPosts);
  if (!Array.isArray(posts) || !posts.length) {
    return clone(defaultBlogPosts).map(normalizePost);
  }
  return posts.map(normalizePost);
}

function saveBlogPosts(posts) {
  writeJSON(BLOG_STORAGE_KEY, posts.map(normalizePost));
}

function getProfileState() {
  const stored = readJSON(PROFILE_STORAGE_KEY, defaultProfile);
  return {
    ...clone(defaultProfile),
    ...stored,
    tags: Array.isArray(stored.tags) && stored.tags.length ? stored.tags : clone(defaultProfile.tags),
  };
}

function saveProfileState(profile) {
  writeJSON(PROFILE_STORAGE_KEY, profile);
}

function getContactState() {
  const stored = readJSON(CONTACT_STORAGE_KEY, defaultContact);
  return {
    ...clone(defaultContact),
    ...stored,
    home: { ...defaultContact.home, ...(stored.home || {}) },
    github: { ...defaultContact.github, ...(stored.github || {}) },
    email: { ...defaultContact.email, ...(stored.email || {}) },
    message: { ...defaultContact.message, ...(stored.message || {}) },
  };
}

function saveContactState(contact) {
  writeJSON(CONTACT_STORAGE_KEY, contact);
}

function updateDirectAuthUI() {
  if (!isDirectSubpage || !authStateNode || !authToggleButton || !authSettingsButton) {
    return;
  }

  const authenticated = isAuthenticated();
  authStateNode.textContent = authenticated ? authCopy.loggedIn : authCopy.loggedOut;
  authStateNode.classList.toggle("is-authenticated", authenticated);
  authToggleButton.textContent = authenticated ? "Logout" : "Login";
  authSettingsButton.disabled = !authenticated;
}

function hideUnlockModal() {
  if (!unlockModal || !unlockForm || !unlockFeedback) {
    return;
  }
  unlockModal.hidden = true;
  unlockFeedback.textContent = "";
  unlockForm.reset();
}

function showUnlockModal() {
  if (!unlockModal || !unlockForm || !unlockFeedback || !unlockSubmitButton) {
    return;
  }
  unlockSubmitButton.textContent = "Login";
  unlockFeedback.textContent = "";
  unlockForm.reset();
  unlockModal.hidden = false;
  window.requestAnimationFrame(() => {
    unlockInput?.focus();
  });
}

function hideSettingsModal() {
  if (!settingsModal || !settingsForm || !settingsFeedback) {
    return;
  }
  settingsModal.hidden = true;
  settingsFeedback.textContent = "";
  settingsForm.reset();
}

function showSettingsModal() {
  if (!isAuthenticated()) {
    showUnlockModal();
    return;
  }

  if (!settingsModal || !settingsForm || !settingsFeedback) {
    return;
  }

  settingsFeedback.textContent = "";
  settingsForm.reset();
  settingsModal.hidden = false;
  window.requestAnimationFrame(() => {
    settingsCurrentPassword?.focus();
  });
}

function syncRootOwnerVisibility(root, pageName) {
  if (!root || !pageName) {
    return;
  }
  mount(root, pageName);
}

function rerenderMountedRoots() {
  for (const [root, pageName] of mountedRoots.entries()) {
    if (root !== document && !root.isConnected) {
      mountedRoots.delete(root);
      continue;
    }
    syncRootOwnerVisibility(root, pageName);
  }
}

function initializeDirectAuthHandlers() {
  if (!isDirectSubpage || authHandlersBound || !authToggleButton) {
    return;
  }

  authToggleButton.addEventListener("click", () => {
    if (isAuthenticated()) {
      setSessionPassphrase("");
      updateDirectAuthUI();
      hideUnlockModal();
      hideSettingsModal();
      rerenderMountedRoots();
      return;
    }
    showUnlockModal();
  });

  authSettingsButton?.addEventListener("click", showSettingsModal);
  unlockBackdrop?.addEventListener("click", hideUnlockModal);
  unlockCancel?.addEventListener("click", hideUnlockModal);
  settingsBackdrop?.addEventListener("click", hideSettingsModal);
  settingsCancel?.addEventListener("click", hideSettingsModal);

  unlockForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const passphrase = unlockInput?.value.trim() || "";
    if (!passphrase) {
      if (unlockFeedback) {
        unlockFeedback.textContent = authCopy.loginHint;
      }
      return;
    }

    try {
      await decryptProtectedEntry("nas4", passphrase);
      setSessionPassphrase(passphrase);
      updateDirectAuthUI();
      rerenderMountedRoots();
      hideUnlockModal();
    } catch (error) {
      if (unlockFeedback) {
        unlockFeedback.textContent = error instanceof Error && error.message !== authCopy.missingConfig && error.message !== authCopy.unsupported
          ? authCopy.loginFailed
          : error.message;
      }
      unlockInput?.select();
    }
  });

  settingsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const sessionPassphrase = getSessionPassphrase();
    if (!sessionPassphrase) {
      if (settingsFeedback) {
        settingsFeedback.textContent = authCopy.settingsNeedLogin;
      }
      return;
    }

    const currentPassword = settingsCurrentPassword?.value.trim() || "";
    const nextPassword = settingsNewPassword?.value.trim() || "";
    const confirmPassword = settingsConfirmPassword?.value.trim() || "";

    if (nextPassword.length < 8) {
      if (settingsFeedback) {
        settingsFeedback.textContent = authCopy.settingsPasswordShort;
      }
      return;
    }

    if (nextPassword !== confirmPassword) {
      if (settingsFeedback) {
        settingsFeedback.textContent = authCopy.settingsPasswordMismatch;
      }
      return;
    }

    try {
      const currentEntries = loadProtectedEntries();
      const decryptedEntries = await Promise.all(
        Object.keys(currentEntries).map(async (key) => ({
          key,
          value: await decryptProtectedEntry(key, currentPassword, currentEntries),
        })),
      );

      const nextEntries = {};
      for (const entry of decryptedEntries) {
        nextEntries[entry.key] = await encryptProtectedValue(entry.value, nextPassword);
      }

      saveProtectedEntries(nextEntries);
      setSessionPassphrase(nextPassword);
      updateDirectAuthUI();
      rerenderMountedRoots();
      if (settingsFeedback) {
        settingsFeedback.textContent = authCopy.settingsSaved;
      }
      window.setTimeout(() => {
        hideSettingsModal();
      }, 320);
    } catch {
      if (settingsFeedback) {
        settingsFeedback.textContent = authCopy.settingsCurrentInvalid;
      }
      settingsCurrentPassword?.select();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && unlockModal && !unlockModal.hidden) {
      hideUnlockModal();
    }
    if (event.key === "Escape" && settingsModal && !settingsModal.hidden) {
      hideSettingsModal();
    }
  });

  authHandlersBound = true;
  updateDirectAuthUI();
}

function mountBlog(root) {
  const instance = mounts.blog.get(root) || {
    bound: false,
    editingId: "",
    selectedId: "",
  };
  mounts.blog.set(root, instance);
  mountedRoots.set(root, "blog");

  const ownerPanel = root.querySelector('[data-owner-panel="blog"]');
  const list = () => root.querySelector("[data-blog-reader-list]");
  const status = () => root.querySelector("[data-blog-status]");
  const submitButton = () => root.querySelector("[data-blog-submit]");

  function syncStatus(message) {
    const node = status();
    if (node) {
      node.textContent = message;
    }
  }

  function readDraft() {
    return {
      title: getInput(root, '[data-blog-field="title"]'),
      category: getInput(root, '[data-blog-field="category"]'),
      date: getInput(root, '[data-blog-field="date"]'),
      summary: getInput(root, '[data-blog-field="summary"]'),
      content: getInput(root, '[data-blog-field="content"]'),
    };
  }

  function fillDraft(draft) {
    setInput(root, '[data-blog-field="title"]', draft.title || defaultBlogDraft.title);
    setInput(root, '[data-blog-field="category"]', draft.category || defaultBlogDraft.category);
    setInput(root, '[data-blog-field="date"]', draft.date || defaultBlogDraft.date);
    setInput(root, '[data-blog-field="summary"]', draft.summary || defaultBlogDraft.summary);
    setInput(root, '[data-blog-field="content"]', draft.content || defaultBlogDraft.content);
    instance.editingId = draft.id || "";
    if (submitButton()) {
      submitButton().textContent = instance.editingId ? "更新文章" : "发布文章";
    }
  }

  function renderPreview() {
    const draft = readDraft();
    setText(root, "[data-blog-preview-title]", draft.title || "未命名文章");
    setText(root, "[data-blog-preview-meta]", `${draft.category || "未分类"} · ${draft.date || defaultBlogDraft.date}`);
    setText(root, "[data-blog-preview-summary]", draft.summary || "摘要会显示在阅读视图的开头。");
    setText(root, "[data-blog-preview-content]", draft.content || "在这里起草正文，保存后访客会从标题列表点开阅读。");
  }

  function renderDetailActions(activePost) {
    const container = root.querySelector("[data-blog-detail-actions]");
    if (!container) {
      return;
    }

    container.replaceChildren();
    if (!activePost || !isAuthenticated()) {
      return;
    }

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "subpage-button subpage-button-secondary";
    editButton.textContent = "编辑这篇文章";
    editButton.dataset.blogAction = "edit";
    editButton.dataset.blogId = activePost.id;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "subpage-button";
    removeButton.textContent = "删除这篇文章";
    removeButton.dataset.blogAction = "delete";
    removeButton.dataset.blogId = activePost.id;

    container.append(editButton, removeButton);
  }

  function renderReader() {
    const posts = getBlogPosts().sort((left, right) => {
      const rightTime = new Date(right.updatedAt || right.createdAt || 0).getTime();
      const leftTime = new Date(left.updatedAt || left.createdAt || 0).getTime();
      return rightTime - leftTime;
    });

    if (!instance.selectedId || !posts.some((post) => post.id === instance.selectedId)) {
      instance.selectedId = posts[0]?.id || "";
    }

    const container = list();
    if (container) {
      container.replaceChildren();
      if (!posts.length) {
        const empty = document.createElement("p");
        empty.className = "subpage-muted-note";
        empty.textContent = "还没有公开文章，后面登录后发布的内容会先在这里列出标题。";
        container.append(empty);
      } else {
        posts.forEach((post) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "subpage-post-link";
          if (post.id === instance.selectedId) {
            button.classList.add("is-active");
          }
          button.dataset.blogOpen = post.id;

          const title = document.createElement("span");
          title.className = "subpage-post-link-title";
          title.textContent = post.title;
          button.append(title);
          container.append(button);
        });
      }
    }

    const activePost = posts.find((post) => post.id === instance.selectedId);
    if (!activePost) {
      setText(root, "[data-blog-active-title]", "还没有文章");
      setText(root, "[data-blog-active-meta]", "登录后发布文章，这里才会出现正文。");
      setText(root, "[data-blog-active-summary]", "当前还没有公开文章。");
      setText(root, "[data-blog-active-content]", "发布后的全文会显示在这里。");
      renderDetailActions(null);
      return;
    }

    setText(root, "[data-blog-active-title]", activePost.title);
    setText(root, "[data-blog-active-meta]", `${activePost.category || "未分类"} · ${activePost.date || defaultBlogDraft.date}`);
    setText(root, "[data-blog-active-summary]", activePost.summary || "这篇文章没有单独填写摘要。");
    setText(root, "[data-blog-active-content]", activePost.content || "");
    renderDetailActions(activePost);
  }

  function renderOwnerVisibility() {
    if (ownerPanel) {
      ownerPanel.hidden = !isAuthenticated();
    }
  }

  function submitDraft() {
    if (!isAuthenticated()) {
      syncStatus("请先登录后再编辑文章。");
      return;
    }

    const draft = readDraft();
    if (!draft.title) {
      syncStatus("请先填写文章标题。");
      return;
    }

    const posts = getBlogPosts();
    const now = new Date().toISOString();
    let activeId = instance.editingId;

    if (instance.editingId) {
      const index = posts.findIndex((post) => post.id === instance.editingId);
      if (index >= 0) {
        posts[index] = {
          ...posts[index],
          ...draft,
          updatedAt: now,
        };
        activeId = posts[index].id;
        syncStatus(`文章已更新：${draft.title}`);
      }
    } else {
      const nextPost = {
        id: createId("blog"),
        ...draft,
        createdAt: now,
        updatedAt: now,
      };
      posts.unshift(nextPost);
      activeId = nextPost.id;
      syncStatus(`文章已发布：${draft.title}`);
    }

    saveBlogPosts(posts);
    instance.selectedId = activeId;
    instance.editingId = "";
    fillDraft(defaultBlogDraft);
    renderPreview();
    renderReader();
  }

  function handleListAction(event) {
    const openButton = event.target.closest("[data-blog-open]");
    if (openButton && root.contains(openButton)) {
      instance.selectedId = openButton.dataset.blogOpen || "";
      renderReader();
      return;
    }

    const actionButton = event.target.closest("[data-blog-action]");
    if (!actionButton || !root.contains(actionButton) || !isAuthenticated()) {
      return;
    }

    const blogId = actionButton.dataset.blogId || "";
    const action = actionButton.dataset.blogAction || "";
    const posts = getBlogPosts();
    const post = posts.find((item) => item.id === blogId);
    if (!post) {
      return;
    }

    if (action === "edit") {
      fillDraft(post);
      renderPreview();
      syncStatus(`正在编辑：《${post.title}》`);
      return;
    }

    if (action === "delete") {
      if (!window.confirm(`确定删除《${post.title}》吗？`)) {
        return;
      }

      const nextPosts = posts.filter((item) => item.id !== blogId);
      saveBlogPosts(nextPosts);
      if (instance.editingId === blogId) {
        instance.editingId = "";
        fillDraft(defaultBlogDraft);
        renderPreview();
      }
      if (instance.selectedId === blogId) {
        instance.selectedId = nextPosts[0]?.id || "";
      }
      renderReader();
      syncStatus(`已删除：《${post.title}》`);
    }
  }

  if (!instance.bound) {
    root.addEventListener("input", (event) => {
      if (!event.target.closest("[data-blog-form]") || !isAuthenticated()) {
        return;
      }
      renderPreview();
      syncStatus(instance.editingId ? "草稿已修改，点击更新即可保存。" : "草稿已修改，点击发布即可保存。");
    });

    root.addEventListener("submit", (event) => {
      if (!event.target.closest("[data-blog-form]")) {
        return;
      }
      event.preventDefault();
      submitDraft();
    });

    root.addEventListener("click", (event) => {
      handleListAction(event);

      const resetButton = event.target.closest("[data-blog-reset]");
      if (resetButton && root.contains(resetButton) && isAuthenticated()) {
        instance.editingId = "";
        fillDraft(defaultBlogDraft);
        renderPreview();
        syncStatus("已恢复到默认草稿。");
      }
    });

    instance.bound = true;
  }

  renderOwnerVisibility();
  fillDraft(defaultBlogDraft);
  renderPreview();
  renderReader();
  syncStatus(isAuthenticated() ? `当前共 ${getBlogPosts().length} 篇文章，可直接进入编辑。` : "");
}

function mountProfile(root) {
  const instance = mounts.profile.get(root) || {
    bound: false,
  };
  mounts.profile.set(root, instance);
  mountedRoots.set(root, "profile");

  const ownerPanel = root.querySelector('[data-owner-panel="profile"]');
  const status = () => root.querySelector("[data-profile-status]");

  function syncStatus(message) {
    const node = status();
    if (node) {
      node.textContent = message;
    }
  }

  function readProfile() {
    return {
      name: getInput(root, '[data-profile-field="name"]') || defaultProfile.name,
      title: getInput(root, '[data-profile-field="title"]') || defaultProfile.title,
      location: getInput(root, '[data-profile-field="location"]') || defaultProfile.location,
      intro: getInput(root, '[data-profile-field="intro"]') || defaultProfile.intro,
      focus: getInput(root, '[data-profile-field="focus"]') || defaultProfile.focus,
      style: getInput(root, '[data-profile-field="style"]') || defaultProfile.style,
      signature: getInput(root, '[data-profile-field="signature"]') || defaultProfile.signature,
      tags: getInput(root, '[data-profile-field="tags"]')
        .split(/[,\u3001\uff0c]/)
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }

  function fillProfile(profile) {
    setInput(root, '[data-profile-field="name"]', profile.name || defaultProfile.name);
    setInput(root, '[data-profile-field="title"]', profile.title || defaultProfile.title);
    setInput(root, '[data-profile-field="location"]', profile.location || defaultProfile.location);
    setInput(root, '[data-profile-field="intro"]', profile.intro || defaultProfile.intro);
    setInput(root, '[data-profile-field="focus"]', profile.focus || defaultProfile.focus);
    setInput(root, '[data-profile-field="style"]', profile.style || defaultProfile.style);
    setInput(root, '[data-profile-field="signature"]', profile.signature || defaultProfile.signature);
    setInput(root, '[data-profile-field="tags"]', (profile.tags || defaultProfile.tags).join("，"));
  }

  function renderProfileBlocks(profile, mappingPrefix) {
    setText(root, `[data-${mappingPrefix}-name]`, profile.name);
    setText(root, `[data-${mappingPrefix}-title]`, profile.title);
    setText(root, `[data-${mappingPrefix}-location]`, profile.location);
    setText(root, `[data-${mappingPrefix}-intro]`, profile.intro);
    setText(root, `[data-${mappingPrefix}-focus]`, profile.focus);
    setText(root, `[data-${mappingPrefix}-style]`, profile.style);
    setText(root, `[data-${mappingPrefix}-signature]`, profile.signature);

    const tagContainer = root.querySelector(`[data-${mappingPrefix}-tags]`);
    if (tagContainer) {
      tagContainer.replaceChildren();
      profile.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "subpage-chip";
        chip.textContent = tag;
        tagContainer.append(chip);
      });
    }
  }

  function renderAll() {
    const profile = getProfileState();
    renderProfileBlocks(profile, "profile-view");
    renderProfileBlocks(readProfile(), "profile-preview");
    if (ownerPanel) {
      ownerPanel.hidden = !isAuthenticated();
    }
  }

  function saveProfile() {
    if (!isAuthenticated()) {
      syncStatus("请先登录后再修改个人资料。");
      return;
    }
    const profile = readProfile();
    saveProfileState(profile);
    renderAll();
    syncStatus("个人资料已保存。");
  }

  if (!instance.bound) {
    root.addEventListener("input", (event) => {
      if (!event.target.closest("[data-profile-form]") || !isAuthenticated()) {
        return;
      }
      renderProfileBlocks(readProfile(), "profile-preview");
      syncStatus("资料已修改，点击保存即可更新公开展示。");
    });

    root.addEventListener("submit", (event) => {
      if (!event.target.closest("[data-profile-form]")) {
        return;
      }
      event.preventDefault();
      saveProfile();
    });

    root.addEventListener("click", (event) => {
      const resetButton = event.target.closest("[data-profile-reset]");
      if (resetButton && root.contains(resetButton) && isAuthenticated()) {
        fillProfile(defaultProfile);
        renderProfileBlocks(readProfile(), "profile-preview");
        syncStatus("已恢复到默认资料。");
      }
    });

    instance.bound = true;
  }

  fillProfile(getProfileState());
  renderAll();
  syncStatus(isAuthenticated() ? "登录后可以直接修改公开资料。" : "");
}

function mountContact(root) {
  const instance = mounts.contact.get(root) || {
    bound: false,
  };
  mounts.contact.set(root, instance);
  mountedRoots.set(root, "contact");

  const ownerPanel = root.querySelector('[data-owner-panel="contact"]');
  const status = () => root.querySelector("[data-contact-status]");

  function syncStatus(message) {
    const node = status();
    if (node) {
      node.textContent = message;
    }
  }

  function readContact() {
    return {
      headline: getInput(root, '[data-contact-field="headline"]') || defaultContact.headline,
      intro: getInput(root, '[data-contact-field="intro"]') || defaultContact.intro,
      home: {
        label: getInput(root, '[data-contact-field="homeLabel"]') || defaultContact.home.label,
        value: getInput(root, '[data-contact-field="homeValue"]') || defaultContact.home.value,
        url: getInput(root, '[data-contact-field="homeUrl"]') || defaultContact.home.url,
      },
      github: {
        label: getInput(root, '[data-contact-field="githubLabel"]') || defaultContact.github.label,
        value: getInput(root, '[data-contact-field="githubValue"]') || defaultContact.github.value,
        url: getInput(root, '[data-contact-field="githubUrl"]') || defaultContact.github.url,
      },
      email: {
        label: getInput(root, '[data-contact-field="emailLabel"]') || defaultContact.email.label,
        value: getInput(root, '[data-contact-field="emailValue"]') || defaultContact.email.value,
        url: getInput(root, '[data-contact-field="emailUrl"]') || defaultContact.email.url,
      },
      message: {
        label: getInput(root, '[data-contact-field="messageLabel"]') || defaultContact.message.label,
        value: getInput(root, '[data-contact-field="messageValue"]') || defaultContact.message.value,
        url: getInput(root, '[data-contact-field="messageUrl"]') || defaultContact.message.url,
      },
      note: getInput(root, '[data-contact-field="note"]') || defaultContact.note,
    };
  }

  function fillContact(contact) {
    setInput(root, '[data-contact-field="headline"]', contact.headline || defaultContact.headline);
    setInput(root, '[data-contact-field="intro"]', contact.intro || defaultContact.intro);
    setInput(root, '[data-contact-field="homeLabel"]', contact.home?.label || defaultContact.home.label);
    setInput(root, '[data-contact-field="homeValue"]', contact.home?.value || defaultContact.home.value);
    setInput(root, '[data-contact-field="homeUrl"]', contact.home?.url || defaultContact.home.url);
    setInput(root, '[data-contact-field="githubLabel"]', contact.github?.label || defaultContact.github.label);
    setInput(root, '[data-contact-field="githubValue"]', contact.github?.value || defaultContact.github.value);
    setInput(root, '[data-contact-field="githubUrl"]', contact.github?.url || defaultContact.github.url);
    setInput(root, '[data-contact-field="emailLabel"]', contact.email?.label || defaultContact.email.label);
    setInput(root, '[data-contact-field="emailValue"]', contact.email?.value || defaultContact.email.value);
    setInput(root, '[data-contact-field="emailUrl"]', contact.email?.url || defaultContact.email.url);
    setInput(root, '[data-contact-field="messageLabel"]', contact.message?.label || defaultContact.message.label);
    setInput(root, '[data-contact-field="messageValue"]', contact.message?.value || defaultContact.message.value);
    setInput(root, '[data-contact-field="messageUrl"]', contact.message?.url || defaultContact.message.url);
    setInput(root, '[data-contact-field="note"]', contact.note || defaultContact.note);
  }

  function updateContactCard(rootNode, selectorPrefix, entry) {
    const card = rootNode.querySelector(`[data-${selectorPrefix}-card]`);
    const hrefNode = rootNode.querySelector(`[data-${selectorPrefix}-href]`);
    const labelNode = rootNode.querySelector(`[data-${selectorPrefix}-label]`);
    const valueNode = rootNode.querySelector(`[data-${selectorPrefix}-value]`);

    if (labelNode) {
      labelNode.textContent = entry.label;
    }
    if (valueNode) {
      valueNode.textContent = entry.value;
    }
    if (hrefNode) {
      hrefNode.setAttribute("href", entry.url || "#");
      if (entry.url && entry.url.startsWith("http")) {
        hrefNode.setAttribute("target", "_blank");
        hrefNode.setAttribute("rel", "noreferrer");
      } else {
        hrefNode.setAttribute("target", "_self");
        hrefNode.removeAttribute("rel");
      }
    }
  }

  function renderContactBlock(contact, prefix) {
    setText(root, `[data-${prefix}-headline]`, contact.headline);
    setText(root, `[data-${prefix}-intro]`, contact.intro);
    setText(root, `[data-${prefix}-note]`, contact.note);

    ["home", "github", "email", "message"].forEach((key) => {
      const anchor = root.querySelector(`[data-${prefix}-card="${key}"]`);
      if (!anchor) {
        return;
      }

      const labelNode = anchor.querySelector(`[data-${prefix}-label]`);
      const valueNode = anchor.querySelector(`[data-${prefix}-value]`);

      if (labelNode) {
        labelNode.textContent = contact[key].label;
      }
      if (valueNode) {
        valueNode.textContent = contact[key].value;
      }

      anchor.setAttribute("href", contact[key].url || "#");
      if (contact[key].url && contact[key].url.startsWith("http")) {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noreferrer");
      } else {
        anchor.setAttribute("target", "_self");
        anchor.removeAttribute("rel");
      }
    });
  }

  function renderAll() {
    const contact = getContactState();
    renderContactBlock(contact, "contact-view");
    renderContactBlock(readContact(), "contact-preview");
    if (ownerPanel) {
      ownerPanel.hidden = !isAuthenticated();
    }
  }

  function saveContact() {
    if (!isAuthenticated()) {
      syncStatus("请先登录后再修改联系方式。");
      return;
    }
    const contact = readContact();
    saveContactState(contact);
    renderAll();
    syncStatus("联系方式已保存。");
  }

  if (!instance.bound) {
    root.addEventListener("input", (event) => {
      if (!event.target.closest("[data-contact-form]") || !isAuthenticated()) {
        return;
      }
      renderContactBlock(readContact(), "contact-preview");
      syncStatus("联系方式已修改，点击保存即可更新公开展示。");
    });

    root.addEventListener("submit", (event) => {
      if (!event.target.closest("[data-contact-form]")) {
        return;
      }
      event.preventDefault();
      saveContact();
    });

    root.addEventListener("click", (event) => {
      const resetButton = event.target.closest("[data-contact-reset]");
      if (resetButton && root.contains(resetButton) && isAuthenticated()) {
        fillContact(defaultContact);
        renderContactBlock(readContact(), "contact-preview");
        syncStatus("已恢复到默认联系方式。");
      }
    });

    instance.bound = true;
  }

  fillContact(getContactState());
  renderAll();
  syncStatus(isAuthenticated() ? "登录后可以直接维护公开联系入口。" : "");
}

function mount(root = document, pageName = getPageName(window.location.pathname)) {
  const normalized = getPageName(pageName);
  if (!normalized) {
    return;
  }

  if (normalized === "blog") {
    mountBlog(root);
    return;
  }

  if (normalized === "profile") {
    mountProfile(root);
    return;
  }

  if (normalized === "contact") {
    mountContact(root);
  }
}

window.addEventListener("zeavin-auth-change", () => {
  updateDirectAuthUI();
  rerenderMountedRoots();
});

window.addEventListener("storage", (event) => {
  if (event.key === AUTH_SESSION_STORAGE_KEY || event.key === PROTECTED_CONFIG_KEY) {
    updateDirectAuthUI();
    rerenderMountedRoots();
  }
});

window.ZeavinSubpages = {
  mount,
  refresh: rerenderMountedRoots,
};

initializeDirectAuthHandlers();
updateDirectAuthUI();
updateCurrentYear();
updateLiveClock();
window.setInterval(updateLiveClock, 1000);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    mount(document);
  });
} else {
  mount(document);
}
})();
