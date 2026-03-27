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
  let cookie = localStorage.getItem("user");

  const headerEl = createElement(
    "header",
    "w-full flex items-center mb-2",
    null,
  );
  const navEl = createElement("nav", null, null);
  const logo = createElement("p", "logo-header", "FitTrack");
  const ulEl = createElement("ul", "flex flex-row gap-4", null);
  if (cookie) ulEl.append(logo);

  const filtered = cookie
    ? headerItems.filter((h) => h.title === "Logout")
    : headerItems.filter((h) => h.title !== "Logout");

  filtered.forEach((h) => {
    if (h.href === pathName) return;

    const listItem = createElement("li", "nav-link", null);

    if (h.title === "Logout") {
      const logoutBtn = createElement(
        "button",
        "btn btn-secondary",
        h.title,
      ) as HTMLButtonElement;
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");
        window.location.href = "/index.html";
      });
      listItem.append(logoutBtn);
    } else {
      const link = createElement("a", null, h.title) as HTMLAnchorElement;
      link.href = h.href;
      listItem.append(link);
    }

    ulEl.append(listItem);
  });

  navEl.append(ulEl);
  headerEl.append(navEl);
  document.body.append(headerEl);
};
