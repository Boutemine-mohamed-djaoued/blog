import {
  defineComponent,
  hElement,
  RouterLink,
} from "../../node_modules/sleepyo/dist/sleepyo.js";

const TOPICS = [
  {
    key: "sqlInjection",
    title: "sqlInjection",
  },
  {
    key: "test",
    title: "test",
  },
];

const sideNav = defineComponent({
  render() {
    return hElement("nav", { class: "side-nav" }, [
      hElement("h2", {}, ["Web Notes"]),
      hElement("ul", {}, [
        ...TOPICS.map((topic) => {
          return hElement("li", { key: topic.key }, [
            hElement(RouterLink, { to: `/notes/${topic.key}` }, [topic.title]),
          ]);
        }),
      ]),
    ]);
  },
});

export default sideNav;
