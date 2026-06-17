// 1. SELECTING ALL ELEMENTS
let addPostBtn = document.getElementById("addPostBtn"),
  postModal = document.getElementById("postModal"),
  closeBtn = document.querySelector(".close-btn"),
  submitPostBtn = document.getElementById("submitPostBtn"),
  postsFeed = document.getElementById("postsFeed"),
  titleInput = document.getElementById("postTitleInput"),
  bodyInput = document.getElementById("postBodyInput"),
  title = document.querySelector(".modal-title");

// 2. INITIALIZE PAGE
window.onload = function () {
  displaySavedPosts();
};

// 3. OPEN AND CLOSE THE POST FORM

// 3. OPEN AND CLOSE THE POST FORM
addPostBtn.onclick = () => {
  // check if user is logged in -> if not redirect him to sign in page
  if (login == "user") {
    addPostBtn.addEventListener("click", function () {
      postModal.style.display = "block";
    });
  } else {
    window.location.href = "signin.html";
  }
};

//closes the post form
closeBtn.addEventListener("click", function () {
  postModal.style.display = "none";
});

let mustfill = document.createElement("p");
mustfill.className = "error";
mustfill.innerHTML = `
  <i class="fa-solid fa-triangle-exclamation"></i> All Fields should be filled!
`;
title.after(mustfill);
mustfill.style.display = "none";

// 4. SAVE POST LOGIC
submitPostBtn.addEventListener("click", function () {
  const newTitle = titleInput.value.trim(); // .trim() -> clears the spaces in the beginning and the end of the text
  const newBody = bodyInput.value.trim();

  // Validation
  if (newTitle === "" || newBody === "") {
    mustfill.style.display = "block";
    setTimeout(() => {
      mustfill.style.display = "none";
    }, 2500);
    return;
  }

  // Create a data object
  const postData = {
    title: newTitle,
    body: newBody,
    author: localStorage.getItem("pixeluser"), //gets the user name
    date: new Date().toLocaleDateString(),
  };

  // Get the current data from LocalStorage (or empty array if first time)
  const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];

  // Add the new post to the list
  savedPosts.push(postData);

  // Save the updated list back to the browser memory
  localStorage.setItem("communityPosts", JSON.stringify(savedPosts));

  // Refresh the screen and reset the form
  displaySavedPosts();
  titleInput.value = "";
  bodyInput.value = "";
  postModal.style.display = "none";
});

// 5. DISPLAYING THE POSTS
function displaySavedPosts() {
  //clear the container to prevent any duplicates posts
  postsFeed.innerHTML = "";

  // convert the data into code again from the JSON
  const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];

  // in case there are no posts yet, show a message
  if (savedPosts.length === 0) {
    postsFeed.innerHTML =
      "<p style='color: #888;'>No discussions yet. Be the first to post!</p>";
    return;
  }

  // Loop through the savedPosts and create the HTML for each post
  savedPosts.forEach((post, index) => {
    let newPostCard = document.createElement("div");
    newPostCard.className = "post-card";

    newPostCard.innerHTML = `
    <h4 class="post-title">${post.title}</h4>
    <p class="post-body">${post.body}</p>
    <div class="post-meta">
      <span>Posted by: ${post.author}</span> |
      <span>${post.date}</span>
      <i class="fa-solid fa-trash-can"></i>
    </div>
  `;

    let deleteBtn = newPostCard.querySelector(".fa-trash-can");

    deleteBtn.onclick = function () {
      let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

      posts.splice(index, 1);

      localStorage.setItem("communityPosts", JSON.stringify(posts));

      displaySavedPosts();
    };

    postsFeed.prepend(newPostCard);
  });
}
