const rulesOpenClose = document.querySelectorAll(".on_off"),
    rulesArea = document.querySelector(".informations"),
    rulesWindow = document.querySelector(".game_rules");

rulesOpenClose.forEach(btn => {
    btn.addEventListener("click", () => {
        rulesArea.classList.toggle("active");
        rulesWindow.scrollTo(0, 0);
    })
})
