document.addEventListener("DOMContentLoaded", () => {
  const friendsList = document.querySelector(".friends-list");
  const chatHeader = document.getElementById("chatHeader");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const createFromFollowingBtn = document.getElementById("createFromFollowingBtn");
  const groupPopup = document.getElementById("groupPopup");
  const groupPopupContent = document.getElementById("groupPopupContent");
  const newGroupNameInput = document.getElementById("newGroupName");
  const groupMembersList = document.getElementById("groupMembersList");
  const popupCreateBtn = groupPopupContent?.querySelector(".createBtn");
  const popupCancelBtn = groupPopupContent?.querySelector(".cancelBtn");

  const loggedInUser = localStorage.getItem("loggedInUser") || "username";
  const sidebarUsername = document.getElementById("sidebarUsername");

  if (sidebarUsername) {
    sidebarUsername.textContent = `@${loggedInUser}`;
  }

  if (!friendsList || !chatHeader || !chatMessages || !chatInput || !sendBtn) {
    return;
  }

  const chats = [
    {
      id: "Dr.KingPaul1010",
      name: "Dr.KingPaul1010",
      avatar: "/assets/Photos/prfl5.png",
      status: "Active now",
      preview: "Seen · 1m",
      messages: [
        { type: "friend", text: "Bro, did you hear about that new developer?" },
        { type: "friend", text: "I heard he's amazing" },
        { type: "personal", text: "Yeah dude, he's killing it" },
        { type: "personal", text: "Saw the first one?" },
        { type: "friend", text: "The Instagram clone one?" },
        { type: "personal", text: "Yeah that one." },
        { type: "personal", text: "Looks clean actually" },
        { type: "friend", text: "Man I swear some people just can't stop." },
        { type: "personal", text: "Respect though." },
        { type: "personal", text: "Can't wait to see what he builds next 🔥" },
        { type: "system", text: "Seen 1 minute ago" }
      ]
    },
    {
      id: "Ron.Drin7",
      name: "Ron.Drin7",
      avatar: "/assets/Photos/prfl6.png",
      status: "Active 2h ago",
      preview: "",
      messages: [
        { type: "friend", text: "Yooooo" },
        { type: "personal", text: "Ayoooo" },
        { type : "system", text: "Active 2 hours ago" },
        { type: "personal", text: "Spent like two hours debugging one line." },
        { type: "friend", text: "" },
        { type: "personal", text: "F" },
        { type: "friend", text: "" },
        { type: "personal", text: "" }      
     ]
    },
    {
      id: "unrealNews",
      name: "unrealNews",
      avatar: "/assets/Photos/prfl3.png",
      status: "Active 5h ago",
      preview: "Shared a post · 5h",
      messages: [{ type: "friend", text: "Big news coming soon." }]
    },
    {
      id: "Sultan29",
      name: "Sultan29",
      avatar: "/assets/Photos/prfl2.png",
      status: "Seen yesterday",
      preview: "Seen yesterday",
      messages: [
        { type: "personal", text: "😂😂😂" },
        { type: "system", text: "Seen yesterday" }
      ]
    },
    {
      id: "I.D.F",
      name: "I.D.F",
      avatar: "/assets/Photos/IDF Logo.png",
      status: "Active now",
      preview: "New photo · 1d",
      messages: [
        { type: "friend", text: "Welcome to the official updates channel." }
      ]
    }
  ];

  let activeChatId = chats[0]?.id || null;
  let availableMembers = [];

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderSidebar() {
    friendsList.innerHTML = "";

    chats.forEach((chat) => {
      const friend = document.createElement("div");
      friend.className = `friend${chat.id === activeChatId ? " active" : ""}`;
      friend.dataset.chatId = chat.id;

      friend.innerHTML = `
        <img src="${chat.avatar}" alt="${escapeHtml(chat.name)}" />
        <div class="friend-text">
          <p class="friend-name">${escapeHtml(chat.name)}</p>
          <span class="friend-preview">${escapeHtml(chat.preview || "")}</span>
        </div>
      `;

      friend.addEventListener("click", () => {
        activeChatId = chat.id;
        renderSidebar();
        renderActiveChat();
      });

      friendsList.appendChild(friend);
    });
  }

  function renderHeader(chat) {
    chatHeader.innerHTML = `
      <div class="chat-user">
        <img
          src="${chat.avatar}"
          alt="${escapeHtml(chat.name)}"
          id="chatHeaderAvatar"
        />
        <div class="chat-user-info">
          <h3>${escapeHtml(chat.name)}</h3>
          <span>${escapeHtml(chat.status || "")}</span>
        </div>
      </div>

      <div class="chat-header-actions">
        <button class="icon-btn" aria-label="Call" type="button">
          <i class="bx bx-phone"></i>
        </button>
        <button class="icon-btn" aria-label="Video call" type="button">
          <i class="bx bx-video"></i>
        </button>
        <button class="icon-btn" aria-label="Info" type="button">
          <i class="bx bx-info-circle"></i>
        </button>
      </div>
    `;
  }

  function renderMessages(chat) {
    chatMessages.innerHTML = "";

    const dateBadge = document.createElement("div");
    dateBadge.className = "chat-date";
    dateBadge.textContent = "Today";
    chatMessages.appendChild(dateBadge);

    chat.messages.forEach((msg) => {
      if (msg.type === "system") {
        const systemMsg = document.createElement("div");
        systemMsg.className = "message system";
        systemMsg.textContent = msg.text;
        chatMessages.appendChild(systemMsg);
        return;
      }

      const row = document.createElement("div");
      row.className = `message-row ${msg.type === "personal" ? "outgoing" : "incoming"}`;

      if (msg.type === "friend") {
        const avatar = document.createElement("img");
        avatar.className = "message-avatar";
        avatar.src = chat.avatar;
        avatar.alt = chat.name;
        row.appendChild(avatar);
      }

      const bubble = document.createElement("div");
      bubble.className = `message ${msg.type}`;
      bubble.textContent = msg.text;
      row.appendChild(bubble);

      chatMessages.appendChild(row);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function renderActiveChat() {
    const activeChat = chats.find((chat) => chat.id === activeChatId);
    if (!activeChat) return;

    renderHeader(activeChat);
    renderMessages(activeChat);
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const activeChat = chats.find((chat) => chat.id === activeChatId);
    if (!activeChat) return;

    activeChat.messages.push({
      type: "personal",
      text
    });

    activeChat.preview = `You: ${text}`;
    activeChat.status = "Active now";
    chatInput.value = "";

    renderSidebar();
    renderActiveChat();
  }

  function openGroupPopup() {
    if (!groupPopup) return;
    groupPopup.style.display = "flex";
  }

  function closeGroupPopup() {
    if (!groupPopup) return;
    groupPopup.style.display = "none";
  }

  function getFallbackMembers() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    return chats
      .filter((chat) => chat.name !== loggedInUser)
      .map((chat) => ({
        username: chat.name,
        profilePic: chat.avatar
      }));
  }

  async function loadAvailableMembers() {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      alert("Please log in.");
      return false;
    }

    // אם אין אלמנט כזה ב-HTML, לא נמשיך
    if (!groupMembersList || !newGroupNameInput) {
      alert("Missing group popup elements in messagePage.html");
      return false;
    }

    try {
      const res = await fetch(`/api/users/following/${encodeURIComponent(username)}`);

      if (!res.ok) {
        throw new Error("following route not available");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        availableMembers = data;
      } else if (Array.isArray(data.following)) {
        availableMembers = data.following;
      } else {
        availableMembers = [];
      }
    } catch (err) {
      availableMembers = getFallbackMembers();
    }

    groupMembersList.innerHTML = "";

    if (!availableMembers.length) {
      groupMembersList.innerHTML = `<div class="message system">No available members to add.</div>`;
      return true;
    }

    availableMembers.forEach((user) => {
      const usernameValue = user.username || user.name || user;
      const profilePic =
        user.profilePic ||
        user.avatar ||
        "/assets/Photos/defaultPrfl.png";

      const item = document.createElement("div");
      item.className = "group-member-item";

      item.innerHTML = `
        <label>
          <input type="checkbox" value="${escapeHtml(usernameValue)}" />
          <img src="${profilePic}" alt="${escapeHtml(usernameValue)}" />
          <span>${escapeHtml(usernameValue)}</span>
        </label>
      `;

      groupMembersList.appendChild(item);
    });

    newGroupNameInput.value = "";
    return true;
  }

  async function handleOpenGroupCreation() {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      alert("Please log in.");
      return;
    }

    const loaded = await loadAvailableMembers();
    if (!loaded) return;

    openGroupPopup();
  }

  async function createGroupFromSelectedMembers() {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      alert("Please log in.");
      return;
    }

    if (!newGroupNameInput || !groupMembersList) {
      alert("Group popup is not configured correctly.");
      return;
    }

    const groupName = newGroupNameInput.value.trim();
    if (!groupName) {
      alert("Enter a group name");
      return;
    }

    const selectedMembers = Array.from(
      groupMembersList.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);

    if (!selectedMembers.length) {
      alert("Select at least one member");
      return;
    }

    try {
      let createdWithServer = false;

      // ניסיון ליצירה אמיתית בשרת
      try {
        const res = await fetch("/api/groups/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: groupName,
            description: "",
            creatorUsername: username,
            members: [username, ...selectedMembers]
          })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          createdWithServer = true;
        }
      } catch (serverErr) {
        createdWithServer = false;
      }

      const newGroup = {
        id: `group-${Date.now()}`,
        name: groupName,
        avatar: "/assets/Photos/defaultPrfl.png",
        status: `${selectedMembers.length + 1} members`,
        preview: "Group created",
        messages: [
          {
            type: "system",
            text: `${groupName} group created with ${selectedMembers.length} selected member(s).`
          }
        ]
      };

      chats.unshift(newGroup);
      activeChatId = newGroup.id;
      renderSidebar();
      renderActiveChat();
      closeGroupPopup();

      if (createdWithServer) {
        alert("Group created successfully");
      } else {
        alert("Group created locally (server route not available)");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create group");
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  if (createFromFollowingBtn) {
    createFromFollowingBtn.addEventListener("click", handleOpenGroupCreation);
  }

  if (popupCancelBtn) {
    popupCancelBtn.addEventListener("click", closeGroupPopup);
  }

  if (popupCreateBtn) {
    popupCreateBtn.addEventListener("click", createGroupFromSelectedMembers);
  }

  if (groupPopup) {
    groupPopup.addEventListener("click", (e) => {
      if (e.target === groupPopup) {
        closeGroupPopup();
      }
    });
  }

  renderSidebar();
  renderActiveChat();
});