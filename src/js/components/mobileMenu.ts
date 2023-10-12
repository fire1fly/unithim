export function mobileMenu() {
  const menuOverlayEl = document.querySelector('.menu-overlay');
  const menuBtn = document.querySelector('.menu-btn');

  menuBtn?.addEventListener("click", () => {
    menuOverlayEl?.classList.toggle("_active");
    menuBtn?.classList.toggle("_active");
    document.body.classList.toggle("_menu-open");
  });

  menuOverlayEl?.addEventListener("click", e => {
    const menu = (e.target as HTMLElement).closest(".menu");
    if (!menu) {
      menuOverlayEl?.classList.remove("_active");
      menuBtn?.classList.remove("_active");
      document.body.classList.remove("_menu-open");
    }
  });
}