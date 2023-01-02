const images_data = [
  "./assets/images/p_1.jpg",
  "./assets/images/p_1_2.jpg",
  "./assets/images/p_1_3.jpg",
  "./assets/images/p_1_4.jpg",
  "./assets/images/p_1_5.jpg",
  "./assets/images/p_1_6.jpg",
];

const $ = document;

const modalOverlay = $.querySelector(".modal-overlay");
const iconClose = $.querySelector(".fa-close");
const otherPic = $.querySelector(".other-pic");
const orgPic = $.getElementById("org-pic");
const orgPicGallery = $.getElementById("org-pic-gallery");
const otherPicGallery = $.querySelector(".other-pic-gallery");
const orgPicContainer = $.querySelector(".org-pic-container");
const swiperWrapper = $.querySelector(".swiper-wrapper");
const nextBtn = $.getElementById("next");
const prevBtn = $.getElementById("prev");

function renderImages() {
  orgPic.src = images_data[0];

  if(images_data.length > 4){
    let splice_data = images_data.slice(0, 5);
    splice_data.forEach(function (img, i) {
      let imgElem = `
      <div class="image last" onclick="openGallery(${i});">
              <img src="${img}" alt="" />
            </div>
      `;
      otherPic.insertAdjacentHTML("beforeend", imgElem);
    });
    console.log("hi");
  }else{
    images_data.forEach(function (img, i) {
      let imgElem = `
      <div class="image" onclick="openGallery(${i});">
              <img src="${img}" alt="" />
            </div>
      `;
      otherPic.insertAdjacentHTML("beforeend", imgElem);
    });
  }
 

  images_data.forEach(function (img) {
    let swipeSlide = `
    <div class="swiper-slide">
              <img src="${img}" >
            </div>
    `;
    swiperWrapper.insertAdjacentHTML("beforeend", swipeSlide);
  });
}

renderImages();

let index_img = 0;
function openGallery(index) {
  if (index === 0) {
    prevBtn.classList.add("hidden");
    prevBtn.classList.remove("show");
  } else {
    prevBtn.classList.remove("hidden");
    prevBtn.classList.add("show");
  }
  if (index === images_data.length - 1) {
    nextBtn.classList.add("hidden");
    nextBtn.classList.remove("show");
  } else {
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("show");
  }
  otherPicGallery.innerHTML = "";
  console.log("OPEN");
  modalOverlay.classList.remove("hidden");
  modalOverlay.classList.add("show");
  console.log(index);
  index_img = index;
  orgPicGallery.src = images_data[index];
  // orgPicGallery.dataset.src = images_data[index];

  images_data.forEach(function (img, i) {
    let imgElem = `
        <div class="image-gallery" onclick="selectedPicture(${i})">
          <img src="${img}" data-src="${img}" />
        </div>
    `;
    otherPicGallery.insertAdjacentHTML("beforeend", imgElem);
  });
  const imageGallery = $.querySelectorAll(".image-gallery");
  imageGallery.forEach(function (img) {
    if (img.children[0].src === orgPicGallery.src) {
      img.classList.add("image-gallery--active");
    } else {
      img.classList.remove("image-gallery--active");
    }
  });
}

nextBtn.addEventListener("click", function () {
  prevBtn.classList.remove("hidden");
  prevBtn.classList.add("show");
  index_img++;
  console.log(index_img);
  orgPicGallery.src = images_data[index_img];
  if (index_img === images_data.length - 1) {
    nextBtn.classList.add("hidden");
    nextBtn.classList.remove("show");
  } else {
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("show");
  }
  selectedPicture(index_img);
  // orgPicGallery.style.transform = "translateX(100px)"
});
prevBtn.addEventListener("click", function () {
  nextBtn.classList.remove("hidden");
  nextBtn.classList.add("show");
  index_img--;
  console.log(index_img);
  orgPicGallery.src = images_data[index_img];
  if (index_img === 0) {
    prevBtn.classList.add("hidden");
    prevBtn.classList.remove("show");
  } else {
    prevBtn.classList.remove("hidden");
    prevBtn.classList.add("show");
  }
  selectedPicture(index_img);
});

function selectedPicture(indexImg) {
  // console.log(indexImg);
  index_img = indexImg
  const imageGallery = $.querySelectorAll(".image-gallery");
  orgPicGallery.src = images_data[indexImg];
  imageGallery.forEach(function (img, i) {
    if (indexImg === i) {
      img.classList.add("image-gallery--active");
    } else {
      img.classList.remove("image-gallery--active");
    }
    if (indexImg === 0) {
      prevBtn.classList.add("hidden");
      prevBtn.classList.remove("show");
    } else {
      prevBtn.classList.remove("hidden");
      prevBtn.classList.add("show");
    }
    if (indexImg === images_data.length - 1) {
      nextBtn.classList.add("hidden");
      nextBtn.classList.remove("show");
    } else {
      nextBtn.classList.remove("hidden");
      nextBtn.classList.add("show");
    }
  });
}

function closeGallery() {
  console.log("CLOSE");
  modalOverlay.classList.remove("show");
  modalOverlay.classList.add("hidden");
}

orgPicContainer.addEventListener("mousemove", function (event) {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  orgPic.style.transformOrigin = `${x}px ${y}px`;
  orgPic.style.transform = "scale(1.5)";
  orgPic.style.cursor = "crosshair";
});
orgPicContainer.addEventListener("mouseleave", function () {
  orgPic.style.transformOrigin = "center";
  orgPic.style.transform = "scale(1)";
  orgPic.style.cursor = "default";
});

iconClose.addEventListener("click", closeGallery);
modalOverlay.addEventListener("click", function (event) {
  if (event.target.className === "modal-overlay show") {
    closeGallery();
  }
});

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});
