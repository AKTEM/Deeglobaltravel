document.addEventListener("DOMContentLoaded", () => {
    fetchBlogs();
  });
  
  async function fetchBlogs() {
    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      const blogs = await response.json();
      displayBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  
  function displayBlogs(blogs) {
    const blogContainer = document.querySelector(".row.g-5"); // Select blog section container
    blogContainer.innerHTML = ""; // Clear existing content
  
    blogs.forEach(blog => {
      const blogHTML = `
        <div class="col-md-6">
          <div class="blog-item bg-light rounded overflow-hidden">
            <div class="blog-img position-relative overflow-hidden">
              <img class="img-fluid" src="${blog.image}" alt="">
              <a class="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4">${blog.category}</a>
            </div>
            <div class="p-4">
              <div class="d-flex mb-3">
                <small class="me-3"><i class="far fa-user text-primary me-2"></i>${blog.author}</small>
                <small><i class="far fa-calendar-alt text-primary me-2"></i>${new Date(blog.date).toDateString()}</small>
              </div>
              <h4 class="mb-3">${blog.title}</h4>
              <p>${blog.content.substring(0, 100)}...</p>
              <a class="text-uppercase" href="#">Read More <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      `;
      blogContainer.innerHTML += blogHTML;
    });
  }
  