document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("receptionForm");
  const purposeSelect = document.getElementById("purpose");
  const otherPurposeGroup = document.getElementById("otherPurposeGroup");

  const appointmentSelect = document.getElementById("appointment");
  const appointmentDetailsGroup = document.getElementById("appointmentDetailsGroup");
  const whomToMeetInput = document.getElementById("reference");
  const appointmentDateTimeInput = document.getElementById("appointmentDateTime");

  // Your deployed Google Apps Script web app URL
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwV6MPUsPS6-laaJV4zwsSort0J1qwZKj3wPy5dhOiNC-LD0G7Pu9We9tu_7S7ePJUu/exec";

  purposeSelect.addEventListener("change", () => {
    otherPurposeGroup.classList.toggle("hidden", purposeSelect.value !== "other");
  });

  appointmentSelect.addEventListener("change", () => {
    const isAppointmentYes = appointmentSelect.value === "Yes";
    appointmentDetailsGroup.classList.toggle("hidden", !isAppointmentYes);
    whomToMeetInput.required = isAppointmentYes;
    appointmentDateTimeInput.required = isAppointmentYes;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      visitorName: document.getElementById("visitorName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      purpose: document.getElementById("purpose").value.trim(),
      otherPurpose: document.getElementById("otherPurpose").value.trim(),
      department: document.getElementById("department").value.trim(),
      appointment: appointmentSelect.value.trim(),
      reference: whomToMeetInput.value.trim(),
      appointmentDateTime: appointmentDateTimeInput.value.trim(),
      referenceBy: document.getElementById("referenceBy").value.trim()
    };

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${text}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save data");
      }

      alert("✅ Reception data saved successfully!");
      form.reset();
      otherPurposeGroup.classList.add("hidden");
      appointmentDetailsGroup.classList.add("hidden");

    } catch (error) {
      console.error("Error submitting reception data:", error);
      alert("❌ Error submitting data: " + (error.message || "Unknown error"));
    }
  });
});
