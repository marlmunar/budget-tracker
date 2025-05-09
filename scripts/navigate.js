const routes = {
  "/": { view: "/views/home.html", title: "Home" },
  "/tracker": { view: "/views/tracker.html", title: "Tracker" },
  "/profile": { view: "/views/profile.html", title: "Profile" },
  "/signin": { view: "/views/signIn.html", title: "Sign In" },
  "/register": {
    view: "/views/register.html",
    title: "Register",
    script: "/scripts/register.js",
  },
  "/logout": { path: "" },
};

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

async function router() {
  const path = window.location.pathname;
  const route = routes[path] || "<h1>404 Not Found</h1>";
  console.log(routes[path]);

  if (!route.view) {
    return;
  }
  try {
    const res = await fetch(route.view);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    document.title = `Expense Tracker - ${route.title}`;

    if (route.script) {
      const script = document.createElement("script");
      script.src = route.script;
      script.defer = true;
      document.body.appendChild(script);
    }
  } catch (err) {
    document.getElementById("app").innerHTML = "<h1>Error loading page</h1>";
    document.title = "Error";
  }
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-navigate]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
