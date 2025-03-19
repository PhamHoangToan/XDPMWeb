export function setupMenuLogic(setIsMenuOpen) {
  return {
    toggleMenu: () => setIsMenuOpen((prev) => !prev),
  };
}
