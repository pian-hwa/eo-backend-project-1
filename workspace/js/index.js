const content = document.querySelector("#content > div");
const form = document.querySelector("#content > div > .input_box");
const input = document.querySelector("#content > div > .input_box > div");
const textarea = document.getElementById("prompt");
const sendBtn = document.querySelector("#content > div > .input_box > div > .send");
const chat = document.querySelector("#content > div > .chats");

let isDown = false;
let isProcess = false;

textarea.addEventListener("input", function () {
    textarea.style.height = "26px";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.scrollHeight > 26) {
        textarea.style.transition = "0s";
        form.classList.add("expand");

        if (textarea.scrollHeight > 338) textarea.classList.add("max");
        else textarea.classList.remove("max");
    } else {
        textarea.style.transition = "150ms";
        form.classList.remove("expand");
    }

    if (textarea.value.trim() && !isProcess) sendBtn.classList.add("on");
    else sendBtn.classList.remove("on");
});

textarea.addEventListener("keypress", function (e) {
    if (e.shiftKey && e.key === "Enter") {
        console.log("Shift + Enter");
        
    } else if (e.key === "Enter") {
        e.preventDefault();
        send(textarea.value.trim());
    }
});

sendBtn.addEventListener("click", send(textarea.value.trim()));

function send(text) {
    if (!text || isProcess) return;
    
    // 이벤트
    isDown = true;
    content.classList.add("down");

    textarea.value = null;
    sendBtn.classList.remove("on");

    textarea.style.height = "26px";
    textarea.style.transition = "150ms";
    form.classList.remove("expand");

    createUserChat(text);
    createAssistantChat(text);
    console.log("send: " + text);
}

function createUserChat(text) {
    if (!text) return;

    const div = document.createElement("div");
    div.classList.add("user");
    div.innerText = text;

    chat.appendChild(div);
}

function createAssistantChat(text) {
    if (!text) return null;

    const div = document.createElement("div");
    div.classList.add("assistant");
    div.innerText = text;

    chat.appendChild(div);
    div.scrollIntoView({ behavior: "smooth" });

    return div;
}

const sidebar = document.getElementById("sidebar");
const toggle = sidebar.querySelector(".header > .icon");
const recent = sidebar.querySelector(".recent");
const favorite = sidebar.querySelector(".favorite");

let chatList = [
    { id: 1, title: "더미 메시지입니다 1" },
    { id: 2, title: "더미 메시지입니다 2" },
    { id: 3, title: "더미 메시지입니다 3" },
    { id: 4, title: "더미 메시지입니다 4" },
    { id: 5, title: "더미 메시지입니다 5" },
    { id: 6, title: "더미 메시지입니다 6" },
    { id: 7, title: "더미 메시지입니다 7" },
    { id: 8, title: "더미 메시지입니다 8" },
    { id: 9, title: "더미 메시지입니다 9" },
    { id: 10, title: "더미 메시지입니다 10" },
    { id: 11, title: "더미 메시지입니다 11" },
    { id: 12, title: "더미 메시지입니다 12" }
];

let recentList = [ 1, 2, 3, 4, 5 ];

let favoriteList = [];

toggle.addEventListener("click", function () {
    sidebar.classList.toggle("collapse");
});

function renderRecentList() {
    recent.innerHTML = "";

    for (const item of recentList) {
        const value = chatList.find(v => v.id === item);

        const li = document.createElement("li");
        li.innerHTML = "<p class=\"link\">" +
            "<a href=\"#" + value.id + "\">" + value.title + "</a>" +
                "<button type=\"button\" class=\"icon\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path d=\"M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z\" fill=\"currentColor\"/>" +
                        "<path d=\"M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z\" fill=\"currentColor\"/>" +
                        "<path d=\"M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z\" fill=\"currentColor\"/>" +
                    "</svg>" +
                "</button>" +
            "</p>" +

            "<p class=\"buttons\">" +
                "<button type=\"button\" class=\"icon favorite\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path d=\"M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
                    "</svg>" +
                "</button>" +

                "<button type=\"button\" class=\"icon rename\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z\" fill=\"currentColor\"/>" +
                    "</svg>" +
                "</button>" +

                "<button type=\"button\" class=\"icon delete\">" +
                    "<svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"currentColor\">" +
                        "<g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g>" +
                        "<g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g>" +
                        "<g id=\"SVGRepo_iconCarrier\">" +
                            "<g id=\"🔍-Product-Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" +
                                "<g id=\"ic_fluent_delete_48_regular\" fill=\"currentColor\" fill-rule=\"nonzero\">" +
                                    "<path d=\"M24,7.25 C27.1017853,7.25 29.629937,9.70601719 29.7458479,12.7794443 L29.75,13 L37,13 C37.6903559,13 38.25,13.5596441 38.25,14.25 C38.25,14.8972087 37.7581253,15.4295339 37.1278052,15.4935464 L37,15.5 L35.909,15.5 L34.2058308,38.0698451 C34.0385226,40.2866784 32.1910211,42 29.9678833,42 L18.0321167,42 C15.8089789,42 13.9614774,40.2866784 13.7941692,38.0698451 L12.09,15.5 L11,15.5 C10.3527913,15.5 9.8204661,15.0081253 9.75645361,14.3778052 L9.75,14.25 C9.75,13.6027913 10.2418747,13.0704661 10.8721948,13.0064536 L11,13 L18.25,13 C18.25,9.82436269 20.8243627,7.25 24,7.25 Z M33.4021054,15.5 L14.5978946,15.5 L16.2870795,37.8817009 C16.3559711,38.7945146 17.116707,39.5 18.0321167,39.5 L29.9678833,39.5 C30.883293,39.5 31.6440289,38.7945146 31.7129205,37.8817009 L33.4021054,15.5 Z M27.25,20.75 C27.8972087,20.75 28.4295339,21.2418747 28.4935464,21.8721948 L28.5,22 L28.5,33 C28.5,33.6903559 27.9403559,34.25 27.25,34.25 C26.6027913,34.25 26.0704661,33.7581253 26.0064536,33.1278052 L26,33 L26,22 C26,21.3096441 26.5596441,20.75 27.25,20.75 Z M20.75,20.75 C21.3972087,20.75 21.9295339,21.2418747 21.9935464,21.8721948 L22,22 L22,33 C22,33.6903559 21.4403559,34.25 20.75,34.25 C20.1027913,34.25 19.5704661,33.7581253 19.5064536,33.1278052 L19.5,33 L19.5,22 C19.5,21.3096441 20.0596441,20.75 20.75,20.75 Z M24,9.75 C22.2669685,9.75 20.8507541,11.1064548 20.7551448,12.8155761 L20.75,13 L27.25,13 C27.25,11.2050746 25.7949254,9.75 24,9.75 Z\"></path>" +
                                "</g>" +
                            "</g>" +
                        "</g>" +
                    "</svg>" +
                "</button>" +
            "</p>";

        recent.appendChild(li);
        
        li.querySelector(".link > a").addEventListener("mouseenter", function () {
            li.classList.add("focus");
        });

        li.querySelector(".link > a").addEventListener("mouseleave", function () {
            li.classList.remove("focus");
        });

        li.querySelector(".buttons > .favorite").addEventListener("click", function () {
            addFavorite(value.id);
            renderRecentList();
            renderFavoriteList();
        });
    }

    recent.querySelectorAll("li").forEach(li => {
        li.querySelector(".link > .icon").addEventListener("click", function () {
            this.classList.toggle("focus");
            li.classList.toggle("expand");
        });
    })
};

function renderFavoriteList() {
    if (favoriteList.length ===  0) {
        favorite.classList.add("hide");
        return;
    }

    favorite.innerHTML = "";

    for (const item of favoriteList) {
        const value = chatList.find(v => v.id === item);

        const li = document.createElement("li");
        li.innerHTML = "<p class=\"link\">" +
            "<a href=\"#" + value.id + "\">" + value.title + "</a>" +
                "<button type=\"button\" class=\"icon\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path d=\"M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z\" fill=\"currentColor\"/>" +
                        "<path d=\"M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z\" fill=\"currentColor\"/>" +
                        "<path d=\"M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z\" fill=\"currentColor\"/>" +
                    "</svg>" +
                "</button>" +
            "</p>" +

            "<p class=\"buttons\">" +
                "<button type=\"button\" class=\"icon favorite\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path d=\"M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z\" stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
                    "</svg>" +
                "</button>" +

                "<button type=\"button\" class=\"icon rename\">" +
                    "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
                        "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z\" fill=\"currentColor\"/>" +
                    "</svg>" +
                "</button>" +

                "<button type=\"button\" class=\"icon delete\">" +
                    "<svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"currentColor\">" +
                        "<g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g>" +
                        "<g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g>" +
                        "<g id=\"SVGRepo_iconCarrier\">" +
                            "<g id=\"🔍-Product-Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" +
                                "<g id=\"ic_fluent_delete_48_regular\" fill=\"currentColor\" fill-rule=\"nonzero\">" +
                                    "<path d=\"M24,7.25 C27.1017853,7.25 29.629937,9.70601719 29.7458479,12.7794443 L29.75,13 L37,13 C37.6903559,13 38.25,13.5596441 38.25,14.25 C38.25,14.8972087 37.7581253,15.4295339 37.1278052,15.4935464 L37,15.5 L35.909,15.5 L34.2058308,38.0698451 C34.0385226,40.2866784 32.1910211,42 29.9678833,42 L18.0321167,42 C15.8089789,42 13.9614774,40.2866784 13.7941692,38.0698451 L12.09,15.5 L11,15.5 C10.3527913,15.5 9.8204661,15.0081253 9.75645361,14.3778052 L9.75,14.25 C9.75,13.6027913 10.2418747,13.0704661 10.8721948,13.0064536 L11,13 L18.25,13 C18.25,9.82436269 20.8243627,7.25 24,7.25 Z M33.4021054,15.5 L14.5978946,15.5 L16.2870795,37.8817009 C16.3559711,38.7945146 17.116707,39.5 18.0321167,39.5 L29.9678833,39.5 C30.883293,39.5 31.6440289,38.7945146 31.7129205,37.8817009 L33.4021054,15.5 Z M27.25,20.75 C27.8972087,20.75 28.4295339,21.2418747 28.4935464,21.8721948 L28.5,22 L28.5,33 C28.5,33.6903559 27.9403559,34.25 27.25,34.25 C26.6027913,34.25 26.0704661,33.7581253 26.0064536,33.1278052 L26,33 L26,22 C26,21.3096441 26.5596441,20.75 27.25,20.75 Z M20.75,20.75 C21.3972087,20.75 21.9295339,21.2418747 21.9935464,21.8721948 L22,22 L22,33 C22,33.6903559 21.4403559,34.25 20.75,34.25 C20.1027913,34.25 19.5704661,33.7581253 19.5064536,33.1278052 L19.5,33 L19.5,22 C19.5,21.3096441 20.0596441,20.75 20.75,20.75 Z M24,9.75 C22.2669685,9.75 20.8507541,11.1064548 20.7551448,12.8155761 L20.75,13 L27.25,13 C27.25,11.2050746 25.7949254,9.75 24,9.75 Z\"></path>" +
                                "</g>" +
                            "</g>" +
                        "</g>" +
                    "</svg>" +
                "</button>" +
            "</p>";

        favorite.appendChild(li);
        
        li.querySelector(".link > a").addEventListener("mouseenter", function () {
            li.classList.add("focus");
        });

        li.querySelector(".link > a").addEventListener("mouseleave", function () {
            li.classList.remove("focus");
        });

        li.querySelector(".buttons > .favorite").addEventListener("click", function () {
            addRecent(value.id);
            renderRecentList();
            renderFavoriteList();
        });
    }

    favorite.querySelectorAll("li").forEach(li => {
        li.querySelector(".link > .icon").addEventListener("click", function () {
            this.classList.toggle("focus");
            li.classList.toggle("expand");
        });
    })

    favorite.classList.remove("hide");
};

function addUnique(list, id) {
    if (!list.includes(id)) list.push(id);
}

function removeId(list, id) {
    const idx = list.indexOf(id);
    if (idx !== -1) list.splice(idx, 1);
}

function addRecent(id) {
    addUnique(recentList, id);
    removeId(favoriteList, id);
}

function addFavorite(id) {
    addUnique(favoriteList, id);
    removeId(recentList, id);
}

renderRecentList();
renderFavoriteList();