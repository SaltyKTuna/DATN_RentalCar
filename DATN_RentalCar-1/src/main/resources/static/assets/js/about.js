//Chuyển động đoạn Rentalcar
document.addEventListener("DOMContentLoaded", function () {
    const aboutUsHead = document.querySelector(".aboutus-head");
    function handleScroll() {
      const elementPosition = aboutUsHead.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (elementPosition < windowHeight - 100) {
        aboutUsHead.classList.add("visible");
        window.removeEventListener("scroll", handleScroll);
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.querySelector(".m-container img");
    
    // Thêm lớp 'visible' để kích hoạt hiệu ứng chuyển động
    imgElement.classList.add("visible");
  });
  
  
  //intro container
  document.addEventListener("DOMContentLoaded", function () {
    const imgContainer = document.querySelector(".intro-container__img");
  
    window.addEventListener("scroll", function () {
      const containerPosition = imgContainer.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
  
      if (containerPosition < screenPosition) {
        imgContainer.classList.add("visible");
      }
    });
  });
  
  
  //adv-section
  
  document.addEventListener("DOMContentLoaded", function () {
    const advItems = document.querySelectorAll(".adv-item");
  
    window.addEventListener("scroll", function () {
      advItems.forEach((item) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
  
        if (itemPosition < screenPosition) {
          item.classList.add("visible");
        }
      });
    });
  });
  