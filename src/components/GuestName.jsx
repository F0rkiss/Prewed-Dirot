function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("to") || "Guest";
  return raw
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" & ");
}

export default getGuestName;