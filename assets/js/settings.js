// Get the button element
const settings_button = document.getElementById("settings_button");
const settings_exit = document.getElementById("settings_exit");
const settings_container = document.getElementById("settings_container");
const gradient_checkbox = document.getElementById("gradient_checkbox");
const credits_button = document.getElementById("credits_button");
const credits_container = document.getElementById("credits_container");
const settings_menu = document.getElementById("settings_menu");

let gradient = true;
let credits = false;

// Function to be executed on button click
function open_settings() {
    settings_container.style.display = "flex";
    window.requestAnimationFrame(function() { // It basically waits for the display to change, and waits an extra frame to change the opacity
        window.requestAnimationFrame(function() { // Each one of these adds a frame of delay
            settings_container.style.opacity = "1";
            settings_menu.style.backdropFilter = "blur(10px)";
        });
    });
}

function close_settings() {
    settings_container.style.opacity = "0";
    settings_menu.style.backdropFilter = "blur(0px)";
    settings_container.addEventListener('transitionend', function() {
        settings_container.style.display = "none";
    }, { once: true });
}

function switch_gradient() {
    gradient = gradient_checkbox.checked;
    body = document.querySelector("body");
    if (gradient) {
        body.style.background = "";
        body.classList.add("Gradient_Blue");
    } else {
        body.style.background = "black";
        body.classList.remove("Gradient_Blue")
    }
}

function toggle_credits() {
    if (credits) {
        credits_container.style.transform = "translateY(100px)";
    }
    else {
        credits_container.style.transform = "translateY(0)";
    }
    credits = !credits;
}

settings_button.addEventListener('click', open_settings);
settings_exit.addEventListener('click', close_settings);
gradient_checkbox.addEventListener('change', switch_gradient);
credits_button.addEventListener('click', toggle_credits);

switch_gradient(); // Initialize gradient based on last saved value