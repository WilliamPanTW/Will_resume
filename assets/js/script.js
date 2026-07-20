const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".page-header .links a");

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `index.html#${id}`);
    });
};

const observer = new IntersectionObserver(
    (entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
            setActiveLink(visible.target.id);
        }
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

const lastSection = sections[sections.length - 1];

window.addEventListener("scroll", () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && lastSection) {
        setActiveLink(lastSection.id);
    }
});
