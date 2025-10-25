document.addEventListener("DOMContentLoaded", () => {
  // Dynamic Year in Footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Purchase Button
  const purchaseBtn = document.getElementById("purchaseBtn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", () => {
      alert("🎉 Purchase Successful!");
    });
  }

  // Contact Form Validation
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "2px solid red";
          valid = false;
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!valid) {
        alert("⚠️ Please fill in all required fields.");
        return;
      }

      alert("✅ Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }

  // Gift Card Quantity Controls
  function updateQuantity(btn, type) {
    const span = btn.parentElement.querySelector("span");
    let val = parseInt(span.textContent);

    if (type === "increase") {
      span.textContent = val + 1;
    } else if (type === "decrease" && val > 0) {
      span.textContent = val - 1;
    }
  }

  const giftCards = document.querySelectorAll(".gift-card .qty");
  if (giftCards.length > 0) {
    giftCards.forEach(qtyDiv => {
      const buttons = qtyDiv.querySelectorAll("button");
      buttons[0].addEventListener("click", () => updateQuantity(buttons[0], "decrease"));
      buttons[1].addEventListener("click", () => updateQuantity(buttons[1], "increase"));
    });
  }

  // Gallery Pagination
  const paginationLinks = document.querySelectorAll(".pagination a");
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  if (paginationLinks.length > 0 && galleryImages.length > 0) {
    paginationLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        galleryImages.forEach(img => img.style.display = "none");

        const start = index * 7;
        for (let i = start; i < start + 7; i++) {
          if (galleryImages[i]) galleryImages[i].style.display = "block";
        }
      });
    });
    paginationLinks[0].click();
  }

  // Image Modal (Gallery)
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `<span class="close">&times;</span>
                        <img src="${img.src}" class="modal-content">`;
      document.body.appendChild(modal);

      modal.querySelector(".close").onclick = () => modal.remove();
    });
  });

  // Back to Top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Menu Page Pagination
  const imagesPerPage = 1; // ✅ One image per page
  const gallery = document.getElementById("menu-gallery1");
  const images = Array.from(gallery.querySelectorAll("img"));
  const paginationContainer = document.querySelector(".pagination1");

  // Create pagination buttons dynamically
  const totalPages = Math.ceil(images.length / imagesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    btn.dataset.page = i;
    paginationContainer.appendChild(btn);
  }

  const buttons = document.querySelectorAll(".page-btn");

  function showPage(page) {
    // Hide all images
    images.forEach(img => img.style.display = "none");

    // Calculate range
    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;

    // Show only the current image
    for (let i = start; i < end && i < images.length; i++) {
      images[i].style.display = "inline-block";
    }

    // Highlight active button
    buttons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.page-btn[data-page='${page}']`).classList.add("active");
  }

  // Add event listeners
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.dataset.page);
      showPage(page);
    });
  });

  // Initialize first image
  showPage(1);
});

  const registerForm = document.querySelector("#registerform");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();

      // Check if email already exists
      if (localStorage.getItem(email)) {
        alert("User already registered! Please login.");
      } else {
        // Save user details in localStorage
        const user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));
        alert("Registration Successful!");
        window.location.href = "login.html";
      }
    });
  }

  // --- LOGIN FORM HANDLER ---
  const loginForm = document.querySelector("#loginform");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();

      const storedUser = localStorage.getItem(email);
      if (!storedUser) {
        alert("User not found! Please register first.");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user.password === password) {
        alert("Login Successful!");
        localStorage.setItem("loggedInUser", user.name);
        window.location.href = "index.html";
      } else {
        alert("Incorrect password! Try again.");
      }
    });
  }

  // --- DISPLAY LOGGED-IN USER ON HEADER ---
  const usernameDisplay = document.querySelector("#username");
  const loggedUser = localStorage.getItem("loggedInUser");
  if (usernameDisplay && loggedUser) {
    usernameDisplay.textContent = loggedUser;
  }
  // logout function
  const logoutBtn = document.querySelector("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully!");
      window.location.reload();
    });
  }
  //bookonline page function
    const timeContainer = document.getElementById("times");
    let selectedTime = null;

    const dayTimes = [
      "12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm",
      "01:00 pm", "01:15 pm", "01:30 pm", "01:45 pm",
      "02:00 pm", "02:15 pm", "02:30 pm", "02:45 pm",
      "03:00 pm", "03:15 pm", "03:30 pm", "03:45 pm",
      "04:00 pm", "04:15 pm", "04:30 pm", "04:45 pm",
      "05:00 pm"
    ];

    const eveningTimes = [
      "05:00 pm", "05:15 pm", "05:30 pm", "05:45 pm",
      "06:00 pm", "06:15 pm", "06:30 pm", "06:45 pm",
      "07:00 pm", "07:15 pm", "07:30 pm", "07:45 pm",
      "08:00 pm", "08:15 pm", "08:30 pm", "09:00 pm"
    ];

    function renderTimes(timesArray) {
      timeContainer.innerHTML = "";
      timesArray.forEach(time => {
        const div = document.createElement("div");
        div.textContent = time;
        div.className = "time-btn";
        div.onclick = () => {
          document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected-time"));
          div.classList.add("selected-time");
          selectedTime = time;
        };
        timeContainer.appendChild(div);
      });
    }

    // Initially show evening times
    renderTimes(eveningTimes);

    // Change time slots when session changes
    document.querySelectorAll('input[name="session"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedTime = null;
        if (e.target.value === "Day") {
          renderTimes(dayTimes);
        } else {
          renderTimes(eveningTimes);
        }
      });
    });

    // Counter logic
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const peopleInput = document.getElementById("people");

    minus.onclick = () => {
      let value = parseInt(peopleInput.value);
      if (value > 1) peopleInput.value = value - 1;
    };

    plus.onclick = () => {
      let value = parseInt(peopleInput.value);
      if (value < 10) peopleInput.value = value + 1;
    };

    // Submit function
    function submitBooking() {
      const date = document.getElementById("bookingDate").value;
      const people = document.getElementById("people").value;
      const session = document.querySelector('input[name="session"]:checked').value;

      if (!date) {
        alert("Please select a date!");
        return;
      }

      if (!selectedTime) {
        alert("Please select a time!");
        return;
      }

      alert(`Booking Confirmed:\nDate: ${date}\nSession: ${session}\nTime: ${selectedTime}\nPeople: ${people}`);
    }

