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
