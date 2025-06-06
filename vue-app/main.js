const { createApp, ref, reactive, computed } = Vue;

const app = createApp({
  setup() {
    const menuOpen = ref(false);
    const step = ref(1);
    const date = ref(new Date().toISOString().substr(0, 10));
    const formData = reactive({
      name: "",
      email: "",
      phone: "",
      service: "",
      worker: "",
      time: "",
      notes: "",
    });

    const services = [
      { name: "Classic Haircut", price: "$35", duration: 30 },
      { name: "Beard Grooming", price: "$25", duration: 30 },
      { name: "Hot Towel Shave", price: "$40", duration: 30 },
      { name: "Hair + Beard Combo", price: "$55", duration: 60 },
      { name: "Full Service Package", price: "$75", duration: 60 },
    ];

    const barbers = [
      { name: "John Smith" },
      { name: "Michael Johnson" },
      { name: "David Williams" },
    ];

    const timeSlots = [];
    for (let i = 0; i < 15; i++) {
      const hour = Math.floor(i / 2) + 10;
      const minute = (i % 2) * 30;
      if (hour < 17) {
        timeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
      }
    }

    const nextStep = () => {
      if (!formData.worker || !formData.service || !date.value) {
        alert("Please select date, worker, and service to continue.");
        return;
      }
      step.value = 2;
    };

    const prevStep = () => {
      step.value = 1;
    };

    const submitBooking = async () => {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in all required personal information.");
        return;
      }
      // Submit form data to backend API
      try {
        const response = await fetch("/api/reservation-handler.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, date: date.value }),
        });
        if (!response.ok) {
          throw new Error("Failed to submit reservation");
        }
        alert("Reservation submitted successfully!");
        // Reset form
        formData.name = "";
        formData.email = "";
        formData.phone = "";
        formData.service = "";
        formData.worker = "";
        formData.time = "";
        formData.notes = "";
        date.value = new Date().toISOString().substr(0, 10);
        step.value = 1;
      } catch (error) {
        alert(error.message || "Something went wrong");
      }
    };

    return {
      menuOpen,
      step,
      date,
      formData,
      services,
      barbers,
      timeSlots,
      nextStep,
      prevStep,
      submitBooking,
    };
  },
});

app.mount("#app");
