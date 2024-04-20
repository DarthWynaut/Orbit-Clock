// Get the button element
const settings_button = document.getElementById("settings_button");
const settings_exit = document.getElementById("settings_exit");
const settings_container = document.getElementById("settings_container");
const settings_menu = document.getElementById("settings_menu");

const gradient_checkbox = document.getElementById("gradient_checkbox");

const clock_overlap_checkbox = document.getElementById("clock_overlap_checkbox");

const analog_container = document.getElementById("analog_container");
const digital_container = document.getElementById("digital_container");

const credits_button = document.getElementById("credits_button");
const credits_container = document.getElementById("credits_container");

let gradient = true;
let credits = false;
let clock_overlap = true;

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

function switch_clock_overlap() {
    clock_overlap = clock_overlap_checkbox.checked;
    if (clock_overlap) {
        analog_container.style.transform = "translateX(-150px)"
        digital_container.style.transform = "translateX(150px)"
    } else {
        analog_container.style.transform = "translateX(-300px)"
        digital_container.style.transform = "translateX(300px)"
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
clock_overlap_checkbox.addEventListener('change', switch_clock_overlap);

credits_button.addEventListener('click', toggle_credits);

switch_gradient(); // Initialize gradient based on last saved value
switch_clock_overlap(); // Initialize clock's overlap state based on last saved value