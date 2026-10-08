const windowBox =
    document.getElementById("window");

const closeBtn =
    document.getElementById("closeBtn");

const continueBtn =
    document.getElementById("continueBtn");

const message =
    document.getElementById("message");

const photoSection =
    document.getElementById("photoSection");

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


// ===============================
// MUSIC
// ===============================

let isPlaying = false;


function updateMusicButton() {

    if (isPlaying) {

        musicButton.textContent = "❚❚";

        musicButton.classList.add(
            "playing"
        );

    } else {

        musicButton.textContent = "♪";

        musicButton.classList.remove(
            "playing"
        );

    }

}


function playMusic() {

    bgMusic.volume = 0.7;

    const playPromise =
        bgMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                isPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                /*
                    Browser blocked autoplay.

                    Music will automatically
                    start when the user clicks
                    OK or the music button.
                */

                console.log(
                    "Autoplay was blocked by the browser."
                );

            });

    }

}


function pauseMusic() {

    bgMusic.pause();

    isPlaying = false;

    updateMusicButton();

}


function toggleMusic() {

    if (isPlaying) {

        pauseMusic();

    } else {

        playMusic();

    }

}


musicButton.addEventListener(
    "click",
    toggleMusic
);


// ===============================
// TRY AUTOPLAY
// ===============================

/*
    Try to start music immediately
    when the page loads.
*/

window.addEventListener(
    "load",
    () => {

        playMusic();

    }
);


// ===============================
// TEXT SEQUENCE
// ===============================

const messages = [

    "Ibalik ang",
    "kalendaryo",
    "nasa iyo",
    "Pagbigyan kahit",
    "Ibalik",
    "pabalik"

];


let currentMessage = 0;


const messageInterval =
    setInterval(() => {

        currentMessage++;


        if (
            currentMessage >=
            messages.length
        ) {

            clearInterval(
                messageInterval
            );


            setTimeout(() => {

                showPhotos();

            }, 1200);


            return;

        }


        message.style.opacity = "0";

        message.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            message.textContent =
                messages[currentMessage];


            message.style.opacity = "1";

            message.style.transform =
                "translateY(0)";

        }, 350);


    }, 1200);


// ===============================
// SHOW PHOTOS
// ===============================

function showPhotos() {

    /*
        Try playing music again.

        This works if the user has
        already interacted with the page.
    */

    playMusic();


    windowBox.style.opacity = "0";

    windowBox.style.transform =
        "scale(.8) translateY(30px)";

    windowBox.style.pointerEvents =
        "none";


    setTimeout(() => {

        windowBox.style.display =
            "none";


        photoSection.classList.add(
            "show"
        );

    }, 800);

}


// ===============================
// CLOSE BUTTON
// ===============================

closeBtn.addEventListener(
    "click",
    () => {

        /*
            This is a real user click,
            so browsers normally allow
            audio playback here.
        */

        playMusic();

        showPhotos();

    }
);


// ===============================
// OK BUTTON
// ===============================

continueBtn.addEventListener(
    "click",
    () => {

        /*
            This is also a user interaction,
            so autoplay restrictions are
            normally satisfied here.
        */

        playMusic();

        showPhotos();

    }
);


// ===============================
// MOUSE MOVEMENT
// ===============================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            !photoSection.classList.contains(
                "show"
            )
        ) {

            return;

        }


        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        const moveX =
            x * 10;


        const moveY =
            y * 10;


        photoSection.style.transform =
            `scale(1) translate(${moveX}px, ${moveY}px)`;

    }
);