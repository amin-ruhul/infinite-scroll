const postContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');


let limit = 3;
let page = 1;

// Fetch posts from api
async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

//show post 

async function showPosts(){
    const posts = await getPost();

    posts.forEach(post => {
        const post_element = document.createElement('div');
        post_element.classList.add('post');
        post_element.innerHTML = `
            <div class = "number">${post.id}</div>
            <div class = "post-info">
                <h1 class = "post-title">${post.title}</h1>
                <p class = "post-body">${post.body}</p>
            </div>
        `;

        postContainer.appendChild(post_element);
    });
}

showPosts();
