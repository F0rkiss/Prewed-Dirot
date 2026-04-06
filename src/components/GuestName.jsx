function toTitleCase(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get("to") || "Guest").replace(/\+/g, " ").trim();

  if (!raw) {
    return "Guest";
  }

  const normalized = raw
    .replace(/\s+(and|dan)\s+/gi, " & ")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();

  const guests = normalized.split(" & ").map(toTitleCase).filter(Boolean);

  if (guests.length >= 2) {
    return `${guests[0]}\n&\n${guests.slice(1).join(" & ")}`;
  }

  return toTitleCase(normalized);
}

export default getGuestName;