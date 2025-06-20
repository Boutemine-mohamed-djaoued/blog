import { defineComponent, hElement, RouterLink } from "../../node_modules/sleepyo/dist/sleepyo.js";

const Navbar = defineComponent({
  render() {
    return hElement("nav", { class: "navbar" }, [
      hElement("div", { class: "navbar-logo" }, ["Wep Nap"]),

      hElement("ul", { class: "navbar-links" }, [
        hElement("li", {}, [hElement(RouterLink, { to: "/" }, ["Home"])]),
        hElement("li", {}, [hElement(RouterLink, { to: "/notes/sqlInjection" }, ["Web Notes"])]),
        hElement("li", {}, [hElement(RouterLink, { to: "/writeups" }, ["write-ups"])]),
        hElement("li", {}, [hElement("a", { href: "https://www.linkedin.com/in/djawad-boutemine-96141529a/" }, ["in"])]),
      ]),
    ]);
  },
});

export default Navbar;
