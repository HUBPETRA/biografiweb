// Efek Mengetik 
const textElement = document.getElementById('typewriter-text');
const texts = ["Programmer", "Newbie Web Developer", "Newbie Software Engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 50;
const delayBetweenTexts = 1000;

function typeWriter() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}
document.addEventListener('DOMContentLoaded', typeWriter);

// Scroll
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const header = document.querySelector('.main-header');

        if (targetElement && header) {
            const offset = header.offsetHeight + 20;
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Efek Navbar Muncul/Menghilang
let lastScrollY = window.scrollY;
const header = document.querySelector('.main-header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Animasi Skill Circle 
const skillCircles = document.querySelectorAll('.skill-circle');
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) {
        return;
    }
    skillsAnimated = true;

    skillCircles.forEach(circle => {
        const span = circle.querySelector('span');
        if (span) {
            const originalPercentage = parseInt(span.textContent.replace('%', ''));
            circle.style.setProperty('--liquid-height', `0%`);
            void circle.offsetWidth; 
            setTimeout(() => {
                circle.style.setProperty('--liquid-height', `${originalPercentage}%`);
            }, 50);
        }
    });
}

// Event listener
window.addEventListener('scroll', () => {
    if (!header || !sections.length || !navLinks.length) {
        return;
    }

    console.log("scrollY:", window.scrollY);
    console.log("lastScrollY:", lastScrollY);
    console.log("header.offsetHeight:", header.offsetHeight);
    console.log("Threshold (header.offsetHeight + 50):", header.offsetHeight + 50);
    if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight + 50) {
        console.log("Action: Adding 'hidden' class");
        header.classList.add('hidden');
    } 
    else if (window.scrollY < lastScrollY || window.scrollY <= 50) {
        console.log("Action: Removing 'hidden' class")
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 50;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === sectionId) {
                    link.classList.add('active');
                }
            });
            if (sectionId === 'skills' && skillsSection && !skillsAnimated) {
                animateSkills();
            }
        }
    });

    if (window.scrollY === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
});

// Efek Animasi Fade In/Slide Up Per Section 
const animateElements = document.querySelectorAll(
    '#about .about-content, ' + 
    '#skills .skills-grid, ' +  
    '#achievements .achievements-grid, ' + 
    '#pendidikan .timeline-container '
    
);

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible'); 
        }
    });
};

const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

animateElements.forEach(el => sectionObserver.observe(el));
