
const turkey = document.getElementById("turkey");
const button = document.getElementById("button");
const smoke = document.getElementById("smoke");
const lights = document.querySelectorAll(".disco-light");
const lasers = document.querySelector(".lasers");
const strobe = document.querySelector(".strobe");
const finalButtons = document.getElementById("finalButtons");

let partyStarted = false;
let partyTimers = [];

function clearPartyTimers() {
    partyTimers.forEach(timer => clearTimeout(timer));
    partyTimers = [];
}

function startParty() {

    if (partyStarted) return;

    partyStarted = true;
    document.body.classList.add("partying");

    // Turn on nightclub effects
    lights.forEach(light => light.classList.add("lights-on"));
    lasers.classList.add("active");
    strobe.classList.add("active");

    // Start dancing turkey
    turkey.src = "turkey2.webp";
    turkey.style.display = "block";
    turkey.style.opacity = "1";
    turkey.className = "dancing";

    // Dance faster and faster
    partyTimers.push(setTimeout(() => {
        turkey.className = "fast1";
    }, 3000));

    partyTimers.push(setTimeout(() => {
        turkey.className = "fast2";
    }, 6000));

    partyTimers.push(setTimeout(() => {
        turkey.className = "fast3";
    }, 9000));

    // Hide dancing turkey and start smoke
    partyTimers.push(setTimeout(() => {

        turkey.style.opacity = "0";

        smoke.classList.remove("fade-out");
        smoke.classList.add("active");

    }, 12000));

    // Wait until smoke is fully visible.
    // Swap to cooked turkey underneath the cloud.
    partyTimers.push(setTimeout(() => {

        turkey.src = "cooked.webp";
        turkey.className = "cooked";
        turkey.style.opacity = "1";

    }, 14000));

    // Fade away smoke
    partyTimers.push(setTimeout(() => {

        smoke.classList.add("fade-out");

    }, 15000));

    // Finish party and reveal buttons
    partyTimers.push(setTimeout(() => {

        smoke.classList.remove("active", "fade-out");

        lights.forEach(light => light.classList.remove("lights-on"));
        lasers.classList.remove("active");
        strobe.classList.remove("active");

        finalButtons.classList.add("visible");

        confetti();

    }, 17000));
}

// Eat the turkey
function eatTurkey() {

    turkey.className = "eating";

    setTimeout(() => {
        turkey.style.display = "none";
    }, 800);

    document.querySelector(".eat").style.display = "none";

    confetti();
}

// Fully restart the website
function restartParty() {

    clearPartyTimers();

    partyStarted = false;

    // Reset turkey
    turkey.src = "turkey2.webp";
    turkey.style.display = "block";
    turkey.style.opacity = "1";
    turkey.className = "dancing";

    // Reset smoke
    smoke.classList.remove("active", "fade-out");

    // Turn off nightclub effects
    lights.forEach(light => light.classList.remove("lights-on"));
    lasers.classList.remove("active");
    strobe.classList.remove("active");

    // Hide final buttons
    finalButtons.classList.remove("visible");
    document.querySelector(".eat").style.display = "inline-block";

    // Restore opening screen
    document.body.classList.remove("partying");
}

// Confetti celebration
function confetti() {

    const emojis = ["🎉", "🎊", "✨", "🍂", "🧡"];

    for (let i = 0; i < 70; i++) {

        const piece = document.createElement("div");

        piece.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-30px";
        piece.style.fontSize = "25px";
        piece.style.zIndex = "100";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const animation = piece.animate([
            { transform: "translateY(0) rotate(0)" },
            { transform: "translateY(110vh) rotate(720deg)" }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: "ease-in"
        });

        animation.onfinish = () => piece.remove();
    }
}
