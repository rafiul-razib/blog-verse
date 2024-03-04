// All Posts

const loadPostByCategory = async() => {
    showSpinner2(true)
    const searchInput = document.getElementById('banner-input');
    const searchText = searchInput.value;
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json();
    const posts = data.posts;
    setTimeout(()=>{
      displayPostsByCategory(posts)
    }, 2000);

    setTimeout(()=>{
      showSpinner2(false)
    },2000)
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
        

        newPost.classList = `card w-[100%] lg:card-side bg-[#797DFC1A] shadow-xl mb-8`;

       
        newPost.innerHTML = `
            
              <div class="w-24 h-24 flex justify-end items-start ml-10 mt-10 relative">
                <figure id="imageContainer"><img class="w-24 h-24 rounded-xl" src=${post.image} alt="Movie"/>
                  <div id="active-status" class="w-4 h-4 ${post.isActive?'bg-green-500':'bg-red-500'} rounded-full absolute -top-1 -right-1"></div>
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
            `;

            postContainer.appendChild(newPost);
           
    }

}

const addedToSummary = []

const addToSummary = async(id) =>{
    showSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostings = data.posts;

    for(const posting of allPostings){
       if(id === posting.id){
    
        addedToSummary.push(posting)
       }
}
    setTimeout(()=>{
      displaySummary(addedToSummary)
    }, 2000)
    

    
    setTimeout(()=>{
      showSpinner(false)
    }, 2000)
    
}


const displaySummary = addedToSummary =>{

    const summaryContainer = document.getElementById('post-summary');
    summaryContainer.textContent ='';

    const totalRead = document.getElementById('total-read');
    totalRead.innerText = addedToSummary.length;

    

    for(const summary of addedToSummary){
        const newSummary = document.createElement('div');

        newSummary.classList = 'bg-white m-3 flex justify-between items-center p-4 rounded-xl text-sm';
       

        newSummary.innerHTML = `
        <h1 class="font-semibold max-w-[70%]">${summary.title}</h1>
        <ul><li><i class="fa-regular fa-eye"></i> <span>${summary.view_count}</span></li></ul>`


        summaryContainer.appendChild(newSummary);


        
    }

    

    
    
}

// Latest Posts

const loadLatestPosts = async() =>{
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  displayLatestPosts(data)
}

loadLatestPosts();

const displayLatestPosts = data =>{
  // console.log(data)
  const latestPostContainer = document.getElementById('card-container');

  for(const element of data){
    // console.log(element);
    const latestPost = document.createElement('div');
    latestPost.classList = 'card bg-base-100 shadow-xl';

    latestPost.innerHTML = `
    <figure class="p-6"><img class="rounded-2xl" src="${element.cover_image}" alt="Shoes" /></figure>
    <div class="card-body pt-0">
      <div class="flex items-center gap-3">
        <i class="fa-regular fa-calendar-days"></i>
        <h4>${element.author?.posted_date || 'No publish date'}</h4>
      </div>
      <h2 class="card-title ">${element.title}</h2>
      <p>${element.description}</p>
      <div class="card-actions flex gap-4 justify-start items-center pt-4">
        <div class="w-16 h-16">
          <img class="w-full rounded-full" src="${element.profile_image}" alt="" srcset="">
        </div>
        <div>
          <h2 class="font-bold">${element.author?.name}</h2>
          <p>${element.author?.designation || 'Unknown'}</p>
        </div>
      </div>
    </div>`

    latestPostContainer.appendChild(latestPost)
  }
}

// Spinner

const showSpinner = dataLoadStarted =>{
  const spinner = document.getElementById('spinner');
 
  if(dataLoadStarted){
    spinner.classList.remove('hidden')
  }
  else{
    spinner.classList.add('hidden')
  }
}

const showSpinner2 = dataLoadStarted =>{
  const spinner2 = document.getElementById('spinner2');
 
  if(dataLoadStarted){
    spinner2.classList.remove('hidden')
  }
  else{
    spinner2.classList.add('hidden')
  }
}



// showSpinner()