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
addPostBtn.addEventListener('click', function () {
    postModal.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    postModal.style.display = 'none';
});

// 4. SAVE POST LOGIC
submitPostBtn.addEventListener('click', function () {
    const newTitle = titleInput.value.trim();
    const newBody = bodyInput.value.trim();

    // Validation
    if (newTitle === "" || newBody === "") {
        alert("Please fill in both the title and the body of your post.");
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

    // Add the new post to our list
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

    postsFeed.innerHTML = "";
    // convert the data into code again from the JSON
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];

    // in case there are no posts yet, show a message 
    if (savedPosts.length === 0) {
        postsFeed.innerHTML = "<p style='color: #888;'>No discussions yet. Be the first to post!</p>";
        return;
    }

    // Loop through our savedPosts and create the HTML for each post
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
