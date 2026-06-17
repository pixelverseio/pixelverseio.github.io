let goUpBtn = document.createElement("div");
goUpBtn.className = "goUp";
goUpBtn.innerHTML = `    
    <i class="fa-solid fa-angles-up"></i> 
`;
document.body.append(goUpBtn);
goUpBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
window.onscroll = function () {
  if (window.scrollY >= 600) {
    goUpBtn.style.display = "block";
  } else {
    goUpBtn.style.display = "none";
  }
};

// 1. SELECTING ALL ELEMENTS
const addPostBtn = document.getElementById('addPostBtn');
const postModal = document.getElementById('postModal');
const closeBtn = document.querySelector('.close-btn');
const submitPostBtn = document.getElementById('submitPostBtn');
const postsFeed = document.getElementById('postsFeed');
const titleInput = document.getElementById('postTitleInput');
const bodyInput = document.getElementById('postBodyInput');

// 2. INITIALIZE PAGE
window.onload = function () {
    displaySavedPosts();
};

// 3. OPEN AND CLOSE THE POST FORM

// 3. OPEN AND CLOSE THE POST FORM
addPostBtn.onclick = () => {
    // check if user is logged in -> if not redirect him to sign in page
    if (login == "user") {
        addPostBtn.addEventListener('click', function () {
            postModal.style.display = 'block';
        });
    }
    else {
        window.location.href = "signin.html";
    }
}

//closes the post form
closeBtn.addEventListener('click', function () {
    postModal.style.display = 'none';
});

// 4. SAVE POST LOGIC
submitPostBtn.addEventListener('click', function () {
    const newTitle = titleInput.value.trim();  // .trim() -> clears the spaces in the beginning and the end of the text
    const newBody = bodyInput.value.trim();

    // Validation
    if (newTitle === "" || newBody === "") {
        alert("Please fill in both the title and the body of your post.");  // if the useer did not input any texts -> prompt the user to input validat data
        return;
    }

    // Create a data object
    const postData = {
        title: newTitle,
        body: newBody,
        author: localStorage.getItem("pixeluser"),  //gets the user name
        date: new Date().toLocaleDateString()
    };

    // Get the current data from LocalStorage (or empty array if first time)
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];

    // Add the new post to the list
    savedPosts.push(postData);

    // Save the updated list back to the browser memory
    localStorage.setItem('communityPosts', JSON.stringify(savedPosts));

    // Refresh the screen and reset the form
    displaySavedPosts();
    titleInput.value = '';
    bodyInput.value = '';
    postModal.style.display = 'none';
});

// 5. DISPLAYING THE POSTS
function displaySavedPosts() {
    //clear the container to prevent any duplicates posts 
    postsFeed.innerHTML = "";
    
    // convert the data into code again from the JSON
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];

    // in case there are no posts yet, show a message 
    if (savedPosts.length === 0) {
        postsFeed.innerHTML = "<p style='color: #888;'>No discussions yet. Be the first to post!</p>";
        return;
    }

    // Loop through the savedPosts and create the HTML for each post
    savedPosts.forEach(post => {
        const newPostCard = document.createElement('div');
        newPostCard.className = 'post-card';

        newPostCard.innerHTML = `
            <h4 class="post-title">${post.title}</h4>
            <p class="post-body">${post.body}</p>
            <div class="post-meta">
                <span>Posted by: ${post.author}</span> | <span>${post.date}</span>
            </div>
        `;

        // prepend -> puts the newest post at the top of the list
        postsFeed.prepend(newPostCard);
    });
}
