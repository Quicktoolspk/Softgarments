const blogs = [
    {
        title: "Summer Fashion Trends 2026",
        date: "August 25, 2026",
        category: "Fashion",
        image: "../assets/images/blog/placeholder.jpg",
        description:
            "Discover the latest summer fashion trends and stylish clothing ideas for 2026.",
        url: "#"
    }
];


const blogGrid = document.getElementById("blogGrid");


function displayBlogs() {

    if (!blogGrid) {
        return;
    }


    blogGrid.innerHTML = blogs.map(blog => {

        return `
            <article class="blog-card">

                <img
                    src="${blog.image}"
                    alt="${blog.title}"
                    loading="lazy"
                >

                <div class="blog-content">

                    <div class="blog-category">
                        ${blog.category}
                    </div>

                    <h2>
                        ${blog.title}
                    </h2>

                    <p>
                        ${blog.description}
                    </p>

                    <div class="blog-date">
                        ${blog.date}
                    </div>

                    <a
                        href="${blog.url}"
                        class="read-more"
                    >
                        Read More →
                    </a>

                </div>

            </article>
        `;

    }).join("");
}


displayBlogs();
