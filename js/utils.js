const getFormatDate = (value) => {
  return new Date(value)
    .toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace("pukul", "")
    .replace(".", ":");
};

const showErrorToast = ({ title, description }) => {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastDescription = document.getElementById("toast-description");

  toast.classList.add("modal-show");
  toast.classList.remove("modal-hide");
  toastTitle.innerHTML = title || "Error";
  toastDescription.innerHTML = description || "505: Unknown Error";

  setTimeout(() => {
    toast.classList.remove("modal-show");
    // Show Close Animation before hide
    toast.classList.add("modal-close-animation");
    setTimeout(() => {
      toast.classList.add("modal-hide");
      toast.classList.remove("modal-close-animation");
    }, 500);
  }, 3000);
};
