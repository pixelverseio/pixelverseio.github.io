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

let username = localStorage.getItem("pixeluser"); //localStorage جلب اسم المستخدم المسجل دخوله من 
console.log("username = ", username);

const container = document.getElementById("wishlist-container"); //بنجيب الديف الي الكلاس بتاعها دا

for (let i = 0; i < users[username].wishlist.length; i++) { 
    let game_key = users[username].wishlist[i]; // جلب مفتاح اللعبة (الاسم/المعرف) عند الفهرس i
    console.log("gamesData[users[username].wishlist[i]] = ", gamesData[users[username].wishlist[i]]);
    let gameOb = gamesData[users[username].wishlist[i]]; // جلب كائن اللعبة الكامل من gamesData باستخدام المفتاح
    console.log("gameOb = ", gameOb);

    const card = document.createElement("div"); // بنعمل ديف جديد في المتغير دا
    card.className = "game-card"; // game-card تعيين كلاس 
    card.id = game_key; // تعيين اي دي باسم اللعبة
    // بناء HTML الداخلي للبطاقة مع الشارة وزر الحذف والصورة والاسم والسعر وزر الشراء
    card.innerHTML = `
        <span class="badge">${gameOb.badge}</span>
        <span class="cross" onclick="event.stopPropagation(); removeFromWishlist('${game_key}')" style="color: #ff3b3b">✖</span>
        <img src="${gameOb.image}">
        <h3 style="margin: 15px 10px 5px;">${gameOb.game_name}</h3>
        <p style="margin: 0 10px 10px; color: #d1ff05; font-weight: bold;">$${gameOb.price}</p>
        <button class="action-btn" onclick="libraryAvtive(${game_key})">
        Buy
        </button>
        `;

    container.appendChild(card); //containerإضافة البطاقة إلى ديف ا

    // الانتقال إلى صفحة اللعبة الخاصة عند النقر على البطاقة
    card.addEventListener("click", function () {
        window.location.href = `${game_key}.html`;
    });
}

// إزالة لعبة معينة من قائمة الأمنيات عن طريق اسمها/مفتاحها
function removeFromWishlist(gameName) {
    console.log("gameName = ", gameName);
    document.getElementById(`${gameName}`).remove(); //html إزالة عنصر بطاقة اللعبة من ال 

    let wishlistArray = userData.wishlist; 
    userData.wishlist = wishlistArray.filter(function (game) { //بنشيل اللعبة من مصفوفة ال wishlist
        return game != gameName;
    });

    localStorage.removeItem("users"); // localStorageحذف بيانات المستخدمين القديمة من 
    localStorage.setItem("users", JSON.stringify(users)); // localStorageحفظ بيانات المستخدمين الجديدة في 
}
