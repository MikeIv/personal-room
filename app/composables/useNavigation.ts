export interface NavigationItem {
  key: string;
  path: string;
}

/**
 * Универсальный композабл для навигации
 * При добавлении новой страницы достаточно добавить её в этот массив
 */
export const useNavigation = () => {
  const navItems: NavigationItem[] = [
    { key: "portf", path: "/portfolio" },
    { key: "tools", path: "/tools" },
    { key: "components", path: "/components" },
    { key: "useful", path: "/useful" },
    { key: "sandbox", path: "/sandbox" },
    { key: "contacts", path: "/contacts" },
  ];

  return {
    navItems,
  };
};

