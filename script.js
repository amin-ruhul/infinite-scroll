const postContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');


let limit = 5;
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

function showLoading(){
    loading.classList.add('show');

    setTimeout(() =>{
        setTimeout(()=>{
            page++;
            showPosts();
        },300);
        loading.classList.remove('show')
    },1000);
}

// filter post 

function filterPost(e){
   const term = e.target.value.toUpperCase();
   const posts =document.querySelectorAll('.post');

posts.forEach(post =>{
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
        post.style.display = 'flex';
    }
    else{
        post.style.display = 'none';
    }

});
}

showPosts();

window.addEventListener('scroll',() =>{
    const { scrollTop,scrollHeight,clientHeight } = 
    document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight -5){
        showLoading()
    }
})

filter.addEventListener('input',filterPost);