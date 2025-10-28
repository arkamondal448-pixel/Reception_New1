document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("receptionForm");

  const purposeSelect = document.getElementById("purpose");
  const otherPurposeGroup = document.getElementById("otherPurposeGroup");

  const appointmentSelect = document.getElementById("appointment");
  const appointmentDetailsGroup = document.getElementById("appointmentDetailsGroup");
  const whomToMeetInput = document.getElementById("reference");
  const appointmentDateTimeInput = document.getElementById("appointmentDateTime");
  const referenceByInput = document.getElementById("referenceBy");

  // ✅ Replace this with your OWN deployed Web App URL (must end with /exec)
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyHuDndFgLkMwhgC7JXt67DlWK4Y3pPpqjj6eTs5KYM_arsOTAF7xAkUd_EjRZEYolEeA/exec";

  // Show/hide "Other Purpose" input field
  purposeSelect.addEventListener("change", () => {
    otherPurposeGroup.classList.toggle("hidden", purposeSelect.value !== "other");
  });

  // Show/hide Appointment details (Whom to Meet, Date/Time, Reference By)
  appointmentSelect.addEventListener("change", () => {
    const show = appointmentSelect.value === "Yes";
    appointmentDetailsGroup.classList.toggle("hidden", !show);
    whomToMeetInput.required = show;
    appointmentDateTimeInput.required = show;
    referenceByInput.required = show;
  });

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      visitorName: document.getElementById("visitorName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      purpose: purposeSelect.value.trim(),
      otherPurpose: document.getElementById("otherPurpose").value.trim(),
      department: document.getElementById("department").value.trim(),
      appointment: appointmentSelect.value.trim(),
      reference: whomToMeetInput.value.trim(),
      appointmentDateTime: appointmentDateTimeInput.value.trim(),
      referenceBy: referenceByInput.value.trim(),
    };

    try {
      // Send form data to Google Apps Script Web App
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // 👈 Enables anonymous cross-origin requests
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData),
      });

      // Since no-cors doesn’t allow reading JSON, assume success
      alert("✅ Reception data submitted successfully!");
      form.reset();
      otherPurposeGroup.classList.add("hidden");
      appointmentDetailsGroup.classList.add("hidden");

    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("❌ Failed to submit data. Please try again.");
    }
  });
});
