// Get the button element
const settings_button = document.getElementById("settings_button");
const settings_exit = document.getElementById("settings_exit");
const settings_container = document.getElementById("settings_container");
const settings_menu = document.getElementById("settings_menu");

// const gradient_checkbox = document.getElementById("gradient_checkbox");
const dropdown_button = document.getElementById("dropdown_button");
const gradient_button = document.getElementById("gradient_button");
const none_button = document.getElementById("none_button");
const custom_image_button = document.getElementById("custom_image_button");

const custom_image_url_box = document.getElementById("custom_image_url_box");

const clock_overlap_checkbox = document.getElementById("clock_overlap_checkbox");

const analog_container = document.getElementById("analog_container");
const digital_container = document.getElementById("digital_container");

const credits_button = document.getElementById("credits_button");
const credits_container = document.getElementById("credits_container");

let gradient = true;
let credits = false;
let clock_overlap = true;

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

function switch_background(state) {
    const body = document.querySelector("body");
    const options = {
        "gradient": "Gradient",
        "none": "None",
        "custom_image": "Custom Image"
    };
    dropdown_button.innerHTML = options[state];
    
    // Save the state in localStorage
    localStorage.setItem("background_option", state);
    
    if (state === "gradient") {
        body.style.background = "";
        body.classList.add("Gradient_Blue");
        custom_image_url_box.style.display = "none";
    } else if (state === "custom_image") {
        custom_image_url_box.style.display = "block";
        const url = custom_image_url_box.value;
        localStorage.setItem("custom_image_url", url);
        body.style.background = `url(${url})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.classList.remove("Gradient_Blue");
    } else {
        body.style.background = "black";
        body.classList.remove("Gradient_Blue");
        custom_image_url_box.style.display = "none";
    }
}

function switch_clock_overlap() {
    clock_overlap = clock_overlap_checkbox.checked;
    if (clock_overlap) {
        analog_container.style.transform = "translateX(-150px)";
        digital_container.style.transform = "translateX(150px)";
    } else {
        analog_container.style.transform = "translateX(-300px)";
        digital_container.style.transform = "translateX(300px)";
    }
}

function toggle_credits() {
    if (credits) {
        credits_container.style.transform = "translateY(100px)";
    } else {
        credits_container.style.transform = "translateY(0)";
    }
    credits = !credits;
}

settings_button.addEventListener('click', open_settings);
settings_exit.addEventListener('click', close_settings);

gradient_button.addEventListener('click', () => switch_background("gradient"));
none_button.addEventListener('click', () => switch_background("none"));
custom_image_button.addEventListener('click', () => switch_background("custom_image"));
custom_image_url_box.addEventListener('change', () => switch_background("custom_image"));

clock_overlap_checkbox.addEventListener('change', switch_clock_overlap);

credits_button.addEventListener('click', toggle_credits);

// Initialize clock's overlap state based on last saved value
document.addEventListener("DOMContentLoaded", () => {
    const saved_background = localStorage.getItem("background_option") || "gradient";
    const saved_custom_image_url = localStorage.getItem("custom_image_url") || "";
    custom_image_url_box.value = saved_custom_image_url;
    switch_background(saved_background);
});
switch_clock_overlap(); // Initialize clock's overlap state based on last saved value

const url_params = new URLSearchParams(window.location.search);
if (url_params.has("hide_credits_button")) {
    credits_button.style.display = "none";
}