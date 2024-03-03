const loadPostByCategory = async() => {
    const searchInput = document.getElementById('banner-input');
    const searchText = searchInput.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json();
    const posts = data.posts;
    displayPostsByCategory(posts);
}


const loadAllPost = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    const allPosts = data.posts;
    displayPostsByCategory(allPosts);
}

loadAllPost()


const displayPostsByCategory = posts =>{
    
    const postContainer = document.getElementById('post-container');
    
    postContainer.textContent = '';

    for(const post of posts){
        
       
        const newPost = document.createElement('div');
        

        newPost.classList = `card card-side bg-[#797DFC1A] shadow-xl mb-8`;

       
        if(post.isActive){
            newPost.innerHTML = `
            <div class="card w-[100%] card-side bg-[#797DFC1A] shadow-xl">
              <div class="w-24 h-24 flex justify-end items-start ml-10 mt-10 relative">
                <figure id="imageContainer"><img class="w-24 h-24 rounded-xl" src=${post.image} alt="Movie"/>
                  <div id="active-status" class="w-4 h-4 bg-green-500 rounded-full absolute -top-1 -right-1"></div>
                  </figure>
              </div>
              
              
              <div class="card-body">
                <div class="flex">
                  <h2 class="text-sm text-black mr-5"># <span>${post.category}</span></h2>
                  <h2 class="text-sm text-black">Author : <span>${post.author.name}</span></h2>
                </div>
                <div class="border-b-2 border-dashed pb-4">
                  <h1 class="text-xl font-semibold">${post.title}</h1>
                  <p class="font-normal">${post.description}</p>
                </div>
                <div class="card-actions justify-between flex">
                  <ul class="flex justify-start gap-4">
                    <li><i class="fa-regular fa-comment"></i> <span>${post.comment_count}</span></li>
                    <li><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></li>
                    <li><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span> min</li>
                  </ul>
                  <div onclick="addToSummary(${post.id})" class="bg-green-500 w-7 h-7 rounded-full text-center"">
                    <i class="fa-regular fa-envelope-open"></i>
                  </div>
                    
                  </ul>
                </div>
            </div>`;

        }

        else{
            newPost.innerHTML = `
            <div class="card w-[100%] card-side bg-[#797DFC1A] shadow-xl">
              <div class="w-24 h-24 flex justify-end items-start ml-10 mt-10 relative">
                <figure id="imageContainer"><img class="w-24 h-24 rounded-xl" src=${post.image} alt="Movie"/>
                  <div id="active-status" class="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
                  </figure>
              </div>
              
              
              <div class="card-body">
                <div class="flex">
                  <h2 class="text-sm text-black mr-5"># <span>${post.category}</span></h2>
                  <h2 class="text-sm text-black">Author : <span>${post.author.name}</span></h2>
                </div>
                <div class="border-b-2 border-dashed pb-4">
                  <h1 class="text-xl font-semibold">${post.title}</h1>
                  <p class="font-normal">${post.description}</p>
                </div>
                <div class="card-actions justify-between flex">
                  <ul class="flex justify-start gap-4">
                    <li><i class="fa-regular fa-comment"></i> <span>${post.comment_count}</span></li>
                    <li><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></li>
                    <li><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span> min</li>
                  </ul>
                  <div onclick="addToSummary(${post.id})" class="bg-green-500 w-7 h-7 rounded-full text-center"">
                    <i class="fa-regular fa-envelope-open"></i>
                  </div>
                    
                  </ul>
                </div>
            </div>`;
        }


            postContainer.appendChild(newPost);
           
    }

}

const addedToSummary = []

const addToSummary = async(id) =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostings = data.posts;

    for(const posting of allPostings){
       if(id === posting.id){
        console.log(posting)
        addedToSummary.push(posting)
       }
}

    displaySummary(addedToSummary)
}


const displaySummary = addedToSummary =>{

    const summaryContainer = document.getElementById('post-summary');
    summaryContainer.textContent ='';

    for(const summary of addedToSummary){
        const newSummary = document.createElement('div');

        newSummary.classList = 'bg-white m-3 flex justify-between items-center p-4 rounded-xl text-sm';
       

        newSummary.innerHTML = `
        <h1 class="font-semibold max-w-[70%]">${summary.title}</h1>
        <ul><li><i class="fa-regular fa-eye"></i> <span>${summary.view_count}</span></li></ul>`

        summaryContainer.appendChild(newSummary);
    }
    
}
