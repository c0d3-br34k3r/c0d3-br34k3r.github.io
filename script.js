String.prototype.lowerize = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

function detectBrowser() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else {
        return 'Other';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Deteck theme preference
    if (localStorage.getItem('theme')) document.body.dataset.theme = localStorage.getItem('theme')
    else {
        let themePreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        localStorage.setItem('theme', themePreference);
        document.body.dataset.theme = themePreference;
    }
    if (document.documentElement.clientWidth <= 480) {
        document.querySelector(".topnav-name").innerText = "<Aritro Ghosh />"
    } else {
        document.querySelector(".topnav-name").innerText = "<Aritro Ghosh  />"
    }
    window.addEventListener("resize", () => {
        if (document.documentElement.clientWidth <= 480) {
            document.querySelector(".topnav-name").innerText = "<Aritro Ghosh  />"
        } else {
            document.querySelector(".topnav-name").innerText = "<Aritro Ghosh  />"
        }
    })
    // Navbar
    document.querySelector(".topnav-ham").addEventListener("click", () => {
        document.querySelector(".topnav-menu").style.width = '100vw';
        document.querySelector(".topnav-exit-menu").addEventListener("click", () => {
            document.querySelector(".topnav-menu").style.width = '0vw';
        })
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                document.querySelector(".topnav-menu").style.width = '0vw';
            })
        })
        window.addEventListener("resize", () => {
            document.querySelector(".topnav-menu").style.width = '0vw';
        })
    })
    AOS.init()
    fetch('https://api.github.com/repos/theinvinciblelearner/theinvinciblelearner.github.io')
        .then(response => response.json())
        .then(result => {
            document.querySelector("#github-stars").innerText = result["stargazers_count"]
            document.querySelector("#github-forks").innerText = result["forks"]
        })
        .catch(() => document.querySelector(".github-stats").removeChild(document.querySelector(".github-stats")))

    document.querySelector(".switch-theme-btn").addEventListener("click", () => {
        let newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = newTheme
        localStorage.setItem('theme', newTheme)
    })


    fetch('https://gh-pinned-repos-5l2i19um3.vercel.app/?username=theinvinciblelearner')
        .then(response => response.json())
        .then(result => PROJECTS = result)

    // Articles

    fetch('https://dev.to/api/articles?username=aritroghosh')
        .then(response => response.json())
        .then(result => {
            ARTICLES = result;
            let recentArticles = result.slice(0, 4);
            recentArticles.forEach(article => {
                let articleElement = document.createElement('div');
                articleElement.classList.add("article-box");
                console.log(article)
                articleElement.innerHTML = `
				<a href="${article.url}" class="article-preview" target="_blank" rel="noopener">
					<img src="${article.social_image}" alt="1${article.title}">
				</a>
				<div class="article-content">
                    <div class="article-content-inner">
                        <h4 class="article-content-title">${article.title}</h4>
                        <p class="article-content-description">${article.description}</p>
                    </div>
					<a href="${article.url}" class="article-link" target="_blank"
						rel="noopener">
						<svg focusable="false" data-prefix="fab" data-icon="dev" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" class="article-svg">
                            <path fill="currentColor" d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z">
                            </path>
                        </svg>
                    </svg>
					</a>
				</div>`
                articleElement.addEventListener("click", () => {
                    let blog = window.open(article.url, "_blank");
                    blog.focus()
                })
                document.querySelector("#articles").appendChild(articleElement)
            })
            let readMoreElement = document.createElement('a')
            readMoreElement.classList.add('article-read-more');
            readMoreElement.innerText = ` See more on Github`
            readMoreElement.href = 'https://github.com/theinvinciblelearner/';
            readMoreElement.setAttribute('target', "_blank");
            readMoreElement.setAttribute('rel', 'noopener');
            document.querySelector("#articles").appendChild(readMoreElement)
        })
        .catch(() => document.querySelector("#articles").parentNode.removeChild(document.querySelector("#articles")))

    
})