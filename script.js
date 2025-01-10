let wrap = document.querySelector(".wrap");
let images = document.querySelectorAll(".wrap .block");

let docWidth = document.body.clientWidth;
let slidesWidth = wrap.clientWidth;

let isAnimating = false;

window.addEventListener("resize", () => {
    docWidth = document.body.clientWidth;
    slidesWidth = wrap.clientWidth;
})

document.addEventListener("mousemove", (e) => {
    const percent = e.clientX / window.innerWidth;
    gsap.to(".wrap", {
        transform: `translateX(${(percent * slidesWidth * - 1)}px)`
    })
});

let tl = gsap.timeline({ paused: true });
let path = document.querySelector(".path");

function showCards() {
    revealCards();

    let showBtn = document.querySelector(".toggleOverlay");
    showBtn.onclick = function (e) {
        tl.play();
    };

    let closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", () => {
        tl.reversed(!tl.reversed())
    });
}

showCards();

function revealCards() {
    let start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    let end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    tl.to(".sodas", 0.1, () => {
        path.setAttribute("d", 0.1, end);
        tl.to(".sodas", {
            opacity: 1,
            ease: "power2.inOut"
        })
    })

    tl.to(path, 0.8, { attr: { d: start }, ease: Power3.easeIn }).to(path, 0.4, {
        attr: { d: end }, ease: Power3.easeOut,
    })

    tl.from(".block", 1, {
        clipPath: "inset(0 100% 0 0)",
        ease: Power4.out,
        stagger: {
            amount: 0.25
        }
    })

    tl.from(".product img", 1, {
        scale: 3,
        ease: Power4.easeOut,
        stagger: {
            amount: 0.25
        },
    }, "-=1.5");

    tl.from(".closeBtn", 1, {
        y: 50,
        opacity: 0,
        ease: Power4.easeOut,
        stagger: {
            amount: 0.25
        },
    }, "-=1.5");
}