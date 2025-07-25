// Import your framework functions
import HeroSection from "./components/hero/Hero.js";
import Navbar from "./components/layout/Navbar.js";
import Notes from "./components/notes/Notes.js";
import Writeup from "./components/writeups/Writeup.js";
import Writeups from "./components/writeups/Writeups.js";
import {
  createApp,
  defineComponent,
  HashRouter,
  hElement,
  RouterOutlet,
} from "./public/sleepyo.js";

const routes = [
  { path: "/", component: HeroSection },
  { path: "/notes/:title", component: Notes },
  { path: "/writeups", component: Writeups },
  { path: "/writeups/:challenge", component: Writeup },
];

const router = new HashRouter(routes);

const App = defineComponent({
  render() {
    return hElement("div", { class: "container" }, [
      hElement(Navbar),
      hElement(RouterOutlet),
      hElement("footer", { class: "site-footer" }, [
        // Footer content
      ]),
    ]);
  },
});

createApp({
  rootComponent: App,
  options: { router },
}).mount(document.getElementById("app"));
