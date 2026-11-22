// Tema antes de pintar (evita el parpadeo): lo elegido o, si no, lo del sistema.
try {
  var t = localStorage.getItem("nexus-theme");
  if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.add(t);
} catch (e) { document.documentElement.classList.add("light"); }
