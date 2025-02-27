document.getElementById("first-categories").onclick = () => {
    document.getElementById("first-block").style.display = "flex"
    document.getElementById("second-block").style.display = "none"
    document.getElementById("third-block").style.display = "none"
};

document.getElementById("second-categories").onclick = () => {
    document.getElementById("first-block").style.display = "none"
    document.getElementById("second-block").style.display = "flex"
    document.getElementById("third-block").style.display = "none"
};

document.getElementById("third-categories").onclick = () => {
    document.getElementById("first-block").style.display = "none"
    document.getElementById("second-block").style.display = "none"
    document.getElementById("third-block").style.display = "flex"
};
