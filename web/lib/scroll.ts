export function scrollToEstimationForm() {
  const el = document.getElementById("estimation-form");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
