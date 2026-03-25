export const createElement = (
  element: string,
  classes: string | null,
  text: string | null,
) => {
  const el = document.createElement(element);
  if (classes != null) el.className = classes;
  if (text != null) el.textContent = text;
  return el;
};

const headerItems = [
  {
    title: "Home",
    href: "/index.html",
  },
  {
    title: "Sign Up",
    href: "/user/register.html",
  },
  {
    title: "Login",
    href: "/user/account.html",
  },
  {
    title: "Logout",
    href: "/index.html",
  },
];

export const renderHeader = () => {
  const pathName = window.location.pathname;
  console.log(pathName);

  let cookie = localStorage.getItem("user");
  const header = createElement("header", "w-full flex items-center mb-2", null);
  const nav = createElement("nav", null, null);
  const ul = createElement("ul", "flex flex-row gap-4", null);

  const filtered = cookie
    ? headerItems.filter((h) => h.title === "Logout")
    : headerItems.filter((h) => h.title !== "Logout");

  filtered.forEach((h) => {
    if (h.href === pathName) return;
    const listItem = createElement("li", "nav-link", null);
    const link = createElement("a", null, h.title) as HTMLAnchorElement;
    link.href = h.href;
    listItem.append(link);
    ul.append(listItem);
  });
  nav.append(ul);
  header.append(nav);
  document.body.append(header);
};
