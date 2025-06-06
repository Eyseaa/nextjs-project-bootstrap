<template>
  <nav>
    <h1 @click="scrollToSection('home')">THE GOAT BEARD</h1>
    <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu" v-if="isMobile">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
    <div :class="['menu', { 'mobile-open': menuOpen || !isMobile }]">
      <a href="#home" @click.prevent="scrollToSection('home')">Home</a>
      <a href="#services" @click.prevent="scrollToSection('services')">Services</a>
      <a href="#team" @click.prevent="scrollToSection('team')">Our Team</a>
      <a href="#gallery" @click.prevent="scrollToSection('gallery')">Gallery</a>
      <a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a>
    </div>
  </nav>

  <section id="home" class="hero">
    <div class="hero-content">
      <h1>THE GOAT BEARD<br />BARBER SHOP</h1>
      <p>Experience luxury grooming with unrivaled style. Where precision meets perfection.</p>
      <button @click="scrollToSection('booking')">Book Appointment</button>
    </div>
  </section>

  <section id="services" class="services container">
    <h2>Our Services</h2>
    <div class="grid-3">
      <div v-for="service in services" :key="service.name" class="service-card">
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        <p>{{ service.price }}</p>
      </div>
    </div>
  </section>

  <section id="team" class="team container">
    <h2>Meet Our Expert Barbers</h2>
    <div class="grid-3">
      <div v-for="barber in barbers" :key="barber.name" class="team-member">
        <div class="avatar" :style="{ backgroundImage: 'url(' + barber.image + ')' }"></div>
        <h3>{{ barber.name }}</h3>
        <p>{{ barber.specialty }}</p>
      </div>
    </div>
  </section>

  <section id="gallery" class="gallery container">
    <h2>Our Gallery</h2>
    <div class="gallery-grid">
      <img v-for="(image, index) in galleryImages" :key="index" :src="image" :alt="'Gallery image ' + (index + 1)" />
    </div>
  </section>

  <section id="booking" class="booking container">
    <h2>Book Your Appointment</h2>
    <form @submit.prevent="submitBooking" class="booking-form">
      <div v-if="step === 1" class="step-1">
        <label for="date">Select Date</label>
        <input type="date" id="date" v-model="date" required />

        <label for="worker">Select Worker</label>
        <select id="worker" v-model="formData.worker" required>
          <option value="" disabled>Choose a worker</option>
          <option v-for="barber in barbers" :key="barber.name" :value="barber.name">{{ barber.name }}</option>
        </select>

        <label for="service">Select Service</label>
        <select id="service" v-model="formData.service" required>
          <option value="" disabled>Choose a service</option>
          <option v-for="service in services" :key="service.name" :value="service.name">
            {{ service.name }} - {{ service.price }} ({{ service.duration }} min)
          </option>
        </select>

        <button type="button" @click="nextStep">Next</button>
      </div>

      <div v-if="step === 2" class="step-2">
        <label for="name">Full Name</label>
        <input type="text" id="name" v-model="formData.name" required />

        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required />

        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" v-model="formData.phone" required />

        <label for="notes">Additional Notes</label>
        <textarea id="notes" v-model="formData.notes" rows="4" placeholder="Any special requests or requirements..."></textarea>

        <div class="form-buttons">
          <button type="button" @click="prevStep">Back</button>
          <button type="submit">Confirm Booking</button>
        </div>
      </div>
    </form>
  </section>

  <section id="contact" class="contact container">
    <h2>Contact Us</h2>
    <form @submit.prevent="handleContactSubmit" class="contact-form">
      <label for="contact-name">Name</label>
      <input type="text" id="contact-name" v-model="contactForm.name" required />

      <label for="contact-email">Email</label>
      <input type="email" id="contact-email" v-model="contactForm.email" required />

      <label for="contact-message">Message</label>
      <textarea id="contact-message" v-model="contactForm.message" rows="4" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </section>

  <footer class="footer">
    <p>© {{ new Date().getFullYear() }} THE GOAT BEARD BARBER SHOP. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      step: 1,
      date: new Date().toISOString().substr(0, 10),
      formData: {
        name: "",
        email: "",
        phone: "",
        service: "",
        worker: "",
        time: "",
        notes: "",
      },
      contactForm: {
        name: "",
        email: "",
        message: "",
      },
      services: [
        { name: "Classic Haircut", price: "$35", duration: 30, description: "Precision cut tailored to your style and preference" },
        { name: "Beard Grooming", price: "$25", duration: 30, description: "Expert beard trimming and styling service" },
        { name: "Hot Towel Shave", price: "$40", duration: 30, description: "Traditional straight razor shave with hot towel treatment" },
        { name: "Hair + Beard Combo", price: "$55", duration: 60, description: "Complete grooming package with haircut and beard styling" },
        { name: "Full Service Package", price: "$75", duration: 60, description: "Premium package including haircut, beard grooming, and hot towel treatment" },
      ],
      barbers: [
        { name: "John Smith", specialty: "Master Barber", image: "https://images.pexels.com/photos/1804638/pexels-photo-1804638.jpeg" },
        { name: "Michael Johnson", specialty: "Beard Specialist", image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg" },
        { name: "David Williams", specialty: "Style Expert", image: "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg" },
      ],
      galleryImages: [
        "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg",
        "https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg",
        "https://images.pexels.com/photos/1804638/pexels-photo-1804638.jpeg",
        "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg",
        "https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg",
        "https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg",
        "https://images.pexels.com/photos/1805405/pexels-photo-1805405.jpeg",
        "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
      ],
    };
  },
  methods: {
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      this.menuOpen = false;
    },
    nextStep() {
      if (!this.formData.worker || !this.formData.service || !this.date) {
        alert("Please select date, worker, and service to continue.");
        return;
      }
      this.step = 2;
    },
    prevStep() {
      this.step = 1;
    },
    async submitBooking() {
      if (!this.formData.name || !this.formData.email || !this.formData.phone) {
        alert("Please fill in all required personal information.");
        return;
      }
      try {
        const response = await fetch("/api/reservation-handler.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.formData, date: this.date }),
        });
        if (!response.ok) {
          throw new Error("Failed to submit reservation");
        }
        alert("Reservation submitted successfully!");
        this.resetForm();
      } catch (error) {
        alert(error.message || "Something went wrong");
      }
    },
    resetForm() {
      this.formData = {
        name: "",
        email: "",
        phone: "",
        service: "",
        worker: "",
        time: "",
        notes: "",
      };
      this.date = new Date().toISOString().substr(0, 10);
      this.step = 1;
    },
    async handleContactSubmit() {
      alert("Contact form submitted!");
      this.contactForm = { name: "", email: "", message: "" };
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 12rem;
  height: 12rem;
  border-radius: 9999px;
  background-size: cover;
  background-position: center;
  margin: 0 auto 1.5rem;
}
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}
</style>
