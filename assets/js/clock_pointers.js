let base_angle = 90;
let angle_per_unit = 360 / 60;
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let seconds_in_a_day = 60 * 60 * 24;

var date = new Date();
const initial_timestamp = Math.floor(date.getTime() / 1000);
const seconds_since = initial_timestamp % seconds_in_a_day;
const initial_day = initial_timestamp - seconds_since;


const time_zone_seconds = date.getTimezoneOffset() * 60;

seconds_pointer = document.getElementById("seconds_pointer");
minutes_pointer = document.getElementById("minutes_pointer");
hours_pointer = document.getElementById("hours_pointer");

digital_time = document.getElementById("digital_time");
digital_date = document.getElementById("digital_date");

function update_clock_pointers() {
    analog_clock();
    digital_clock();
}

function analog_clock() {
    var date = new Date();
    var current_timestamp = Math.floor(date.getTime() / 1000);
    var seconds = current_timestamp - initial_day - time_zone_seconds;

    // Update analog clock pointers
    var seconds_angle = base_angle + seconds * angle_per_unit;
    var minutes_angle = base_angle + seconds * 0.1; // 360/60 = 6 degrees per minute = 0.1 degrees per second. 360 degrees per hour to ensure that the animation is smooth
    var hours_angle = base_angle + seconds * (1/120); // 0.1 degrees per second divided by 12 hours
    seconds_pointer.style.transform = `rotate(${seconds_angle}deg)`;
    minutes_pointer.style.transform = `rotate(${minutes_angle}deg)`;
    hours_pointer.style.transform = `rotate(${hours_angle}deg)`;
}

function digital_clock() {
    var date = new Date();
    
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    // Update digital time
    digital_time.innerText = `${hours.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`;
    digital_date.innerText = `${months[month].toUpperCase()} ${day.toLocaleString('en-US', {minimumIntegerDigits: 2})}, ${year}`
}

function setup_clock_pointers() {
    seconds_pointer.style.transition = "none";
    minutes_pointer.style.transition = "none";
    hours_pointer.style.transition = "none";

    var date = new Date();
    var current_timestamp = Math.floor(date.getTime() / 1000);
    var seconds = current_timestamp - initial_day - time_zone_seconds;
    
    // Update analog clock pointers
    var seconds_variation = (seconds * angle_per_unit) % 360;
    var minutes_variation = (seconds * 0.1) % 360; // 360/60 = 6 degrees per minute = 0.1 degrees per second. 360 degrees per hour to ensure that the animation is smooth
    var hours_variation = (seconds * (1/120)) % 360; // 0.1 degrees per second divided by 12 hours


    var seconds_angle = base_angle + (seconds * angle_per_unit) - seconds_variation;
    var minutes_angle = base_angle + (seconds * 0.1) - minutes_variation; // 360/60 = 6 degrees per minute = 0.1 degrees per second. 360 degrees per hour to ensure that the animation is smooth
    var hours_angle = base_angle + (seconds * (1/120)) - hours_variation; // 0.1 degrees per second divided by 12 hours

    seconds_pointer.style.transform = `rotate(${seconds_angle}deg)`;
    minutes_pointer.style.transform = `rotate(${minutes_angle}deg)`;
    hours_pointer.style.transform = `rotate(${hours_angle}deg)`;

    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            seconds_pointer.style.transition = "1s linear";
            minutes_pointer.style.transition = "1s linear";
            hours_pointer.style.transition = "1s linear";
        });
    });
}

seconds_pointer.addEventListener('transitionend', function() {
    update_clock_pointers();
});

setup_clock_pointers();

window.requestAnimationFrame(function() {
    window.requestAnimationFrame(function() {
        update_clock_pointers();
    });
});