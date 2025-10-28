document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("receptionForm");
  const purposeSelect = document.getElementById("purpose");
  const otherPurposeGroup = document.getElementById("otherPurposeGroup");

  const appointmentSelect = document.getElementById("appointment");
  const appointmentDetailsGroup = document.getElementById("appointmentDetailsGroup");
  const whomToMeetInput = document.getElementById("reference");
  const appointmentDateTimeInput = document.getElementById("appointmentDateTime");

  // Replace with your deployed web app URL
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyNPH913darrWoU9f3wVCMjPS0nbVewzh68stIPbALxwK27mEc1oD9yVf1jVt7WuYy8/exec";

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
      formType: "reception",
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
      // Send JSON properly as application/json
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check HTTP status
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${text}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save data");
      }

      // SUCCESS: show confirmation and reset form (no redirects)
      alert("✅ Reception data saved!");
      form.reset();
      otherPurposeGroup.classList.add("hidden");
      appointmentDetailsGroup.classList.add("hidden");
      whomToMeetInput.required = false;
      appointmentDateTimeInput.required = false;

    } catch (error) {
      console.error("Error submitting reception data:", error);
      alert("❌ Error submitting data: " + (error.message || "Unknown error"));
    }
  });

});
