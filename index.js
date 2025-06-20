// Import your framework functions
import { createApp, defineComponent, hElement, hFragment, hText, HashRouter, RouterLink, RouterOutlet } from "./node_modules/sleepyo/dist/sleepyo.js";
import Navbar from "./components/layout/Navbar.js";
import HeroSection from "./components/hero/Hero.js";
import Notes from "./components/notes/Notes.js";
import { parseTypescriptFile } from "./utils/parsers.js";

const res = await parseTypescriptFile("./public/notes/sqlInjection.ts");
console.log(res);

const HomePage = defineComponent({
  render() {
    return hElement("div", {}, [
      hElement(HeroSection),
      hElement("section", { class: "featured-posts" }, [
        // Featured posts content
      ]),
    ]);
  },
});

const BlogPage = defineComponent({
  render() {
    return hElement("div", { class: "blog-page" }, [
      hElement("h1", {}, ["Web Exploitation Blog"]),
      // Blog posts list
    ]);
  },
});

const AboutPage = defineComponent({
  render() {
    return hElement("div", { class: "about-page" }, [
      hElement("h1", {}, ["About Us"]),
      // About content
    ]);
  },
});

const ResourcesPage = defineComponent({
  render() {
    return hElement("div", { class: "resources-page" }, [
      hElement("h1", {}, ["Learning Resources"]),
      // Resources content
    ]);
  },
});
const routes = [
  { path: "/", component: HomePage },
  { path: "/notes/:title", component: Notes },
  { path: "/about", component: AboutPage },
  { path: "/resources", component: ResourcesPage },
];

// Create router instance
const router = new HashRouter(routes);

// Navbar Component

// Hero Section Component

// Page Components

// Main App Component
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

// Create and mount the app
createApp({
  rootComponent: App,
  options: { router },
}).mount(document.getElementById("app"));
