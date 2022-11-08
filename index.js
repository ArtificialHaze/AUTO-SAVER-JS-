document.addEventListener("DOMContentLoaded", () => {
  const savingMessages = "Saving..";
  const savedMessage = "Saved.";

  document
    .querySelectorAll(".autosave-message")
    .forEach((element) => (element.textContent = savedMessage));

  document.querySelectorAll("[data-autosave-url]").forEach((dataAttr) => {
    dataAttr.addEventListener("change", async () => {
      const nameElement = dataAttr.getAttribute("name");
      const value = dataAttr.value;
      const url = dataAttr.dataset.autosaveUrl;
      const autoSaveMessageElement = dataAttr
        .closest(".container")
        .querySelector(".autosave-message");

      const formData = new FormData();
      formData.append(nameElement, value);

      autoSaveMessageElement.classList.add("autosave-message--saving");
      autoSaveMessageElement.textContent = savingMessages;

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.status >= 400) {
        const h1 = document.createElement("h1");
        h1.textContent = "Error, go back and try again";
        document.body.appendChild(h1);
      }

      autoSaveMessageElement.classList.remove("autosave-message--saving");
      autoSaveMessageElement.textContent = savedMessage;
    });
  });
});
