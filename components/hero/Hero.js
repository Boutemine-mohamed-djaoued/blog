import { defineComponent, hElement, RouterLink } from "../../public/sleepyo.js";

const HeroSection = defineComponent({
  render() {
    return hElement("section", { class: "hero" }, [
      hElement("div", { class: "hero-content" }, [
        hElement("h1", {}, ["Welcome to My Blog"]),
        hElement("p", {}, [
          "I hope that i can help you learn more about Web Exploitation !",
        ]),
        hElement(
          RouterLink,
          {
            to: "/notes/accessControl",
            class: "cta-button",
          },
          ["Check my web notes"]
        ),
      ]),
      hElement("img", { class: "hero-img", src: "./public/assets/cyber.jpg" }, []),
    ]);
  },
});

export default HeroSection;
