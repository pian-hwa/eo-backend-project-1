const sidebar = document.getElementById("sidebar");
const sidebarToggle = sidebar.querySelector(".header > .toggle");

const textarea = document.getElementById("prompt");
const sendBtn = document.querySelector("#content > .box > .input_box > .input > .bottom > .send")

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapse");
});

textarea.addEventListener("input", function () {
    textarea.style.height = "48px";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.value.trim()) sendBtn.classList.add("on");
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