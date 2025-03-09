(function () {
  let skip = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; // Current vertical scroll position
    const windowHeight = window.innerHeight; // Viewport height
    const documentHeight = document.documentElement.scrollHeight; // Total document height

    if (scrollTop + windowHeight >= documentHeight) {
      skip += 10;
      getUserData(skip);
    }
  });

  // api call

  let userListSection = document.querySelector("#user-info-list");

  async function getUserData(skip) {
    try {
      let data = await fetchData(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );

      let userList = data.users;

      userList.forEach((user) => {
        const { firstName, email, image } = user;

        const listItem = document.createElement("li");
        listItem.classList.add("user-info-list-li");

        const userDetail = document.createElement("div");
        userDetail.classList.add("user-detail");

        const userImgSection = document.createElement("div");
        userImgSection.classList.add("user-img-section");

        const userImg = document.createElement("img");
        userImg.src = image;
        userImg.alt = firstName;

        const userInfoSection = document.createElement("div");
        userInfoSection.classList.add("user-info-section");
        const userName = document.createElement("h3");
        userName.textContent = firstName;
        const userEmail = document.createElement("p");
        userEmail.textContent = email;

        userInfoSection.appendChild(userName);
        userInfoSection.appendChild(userEmail);

        userImgSection.appendChild(userImg);
        userDetail.appendChild(userImgSection);
        userDetail.appendChild(userInfoSection);
        listItem.appendChild(userDetail);
        userListSection.appendChild(listItem);
      });
    } catch (error) {
      userListSection.innerHtml =
        "<p class='error-alert-text'>Something went wrong while fetching user data! </p>";
    }
  }

  getUserData(0);

  async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }
})();
