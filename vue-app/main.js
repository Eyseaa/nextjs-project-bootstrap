document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const bookBtn = document.getElementById("book-appointment");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("mobile-open");
  });

  bookBtn.addEventListener("click", () => {
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });

  // Data
  const services = [
    { name: "Classic Haircut", price: "$35", duration: 30, description: "Precision cut tailored to your style and preference" },
    { name: "Beard Grooming", price: "$25", duration: 30, description: "Expert beard trimming and styling service" },
    { name: "Hot Towel Shave", price: "$40", duration: 30, description: "Traditional straight razor shave with hot towel treatment" },
    { name: "Hair + Beard Combo", price: "$55", duration: 60, description: "Complete grooming package with haircut and beard styling" },
    { name: "Full Service Package", price: "$75", duration: 60, description: "Premium package including haircut, beard grooming, and hot towel treatment" },
  ];

  const barbers = [
    { name: "John Smith", specialty: "Master Barber", image: "https://images.pexels.com/photos/1804638/pexels-photo-1804638.jpeg" },
    { name: "Michael Johnson", specialty: "Beard Specialist", image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg" },
    { name: "David Williams", specialty: "Style Expert", image: "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg" },
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg",
    "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg",
    "https://images.pexels.com/photos/1804638/pexels-photo-1804638.jpeg",
    "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg",
    "https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg",
    "https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg",
    "https://images.pexels.com/photos/1805405/pexels-photo-1805405.jpeg",
    "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
  ];

  // Populate services
  const servicesList = document.getElementById("services-list");
  services.forEach(service => {
    const div = document.createElement("div");
    div.className = "service-card";
    div.innerHTML = `
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <p>${service.price}</p>
    `;
    servicesList.appendChild(div);
  });

  // Populate team
  const teamList = document.getElementById("team-list");
  barbers.forEach(barber => {
    const div = document.createElement("div");
    div.className = "team-member";
    div.innerHTML = `
      <div class="avatar" style="background-image: url('${barber.image}')"></div>
      <h3>${barber.name}</h3>
      <p>${barber.specialty}</p>
    `;
    teamList.appendChild(div);
  });

  // Populate gallery
  const galleryList = document.getElementById("gallery-list");
  galleryImages.forEach(image => {
    const div = document.createElement("div");
    div.className = "aspect-square";
    div.innerHTML = `<img src="${image}" alt="Gallery image" />`;
    galleryList.appendChild(div);
  });

  // Booking form multi-step logic
  const bookingForm = document.getElementById("booking-form");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const nextStepBtn = document.getElementById("next-step");
  const backStepBtn = document.getElementById("back-step");

  nextStepBtn.addEventListener("click", () => {
    const date = document.getElementById("date").value;
    const worker = document.getElementById("worker").value;
    const service = document.getElementById("service").value;
    if (!date || !worker || !service) {
      alert("Please select date, worker, and service to continue.");
      return;
    }
    step1.style.display = "none";
    step2.style.display = "block";
  });

  backStepBtn.addEventListener("click", () => {
    step2.style.display = "none";
    step1.style.display = "block";
  });

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (!name || !email || !phone) {
      alert("Please fill in all required personal information.");
      return;
    }
    const formData = {
      date: document.getElementById("date").value,
      worker: document.getElementById("worker").value,
      service: document.getElementById("service").value,
      name,
      email,
      phone,
      notes: document.getElementById("notes").value.trim(),
    };
    try {
      const response = await fetch("/api/reservation-handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }
      alert("Reservation submitted successfully!");
      bookingForm.reset();
      step2.style.display = "none";
      step1.style.display = "block";
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Contact form submitted!");
    contactForm.reset();
  });
});
