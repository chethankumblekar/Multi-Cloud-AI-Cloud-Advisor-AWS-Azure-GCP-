export function useTheme() {
  const toggle = () => {
    const current = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme =
      current === "dark" ? "light" : "dark";
  };

  return { toggle };
}
