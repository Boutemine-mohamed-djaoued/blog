import { defineComponent, hElement, RouterLink } from "../../public/sleepyo.js";

const TOPICS = [
  { key: "accessControl", title: "Access Control" },
  { key: "auth", title: "Authentication" },
  { key: "cachPoinsoning", title: "Cache Poisoning" },
  { key: "cashDeception", title: "Cash Deception" },
  { key: "cmdInjectoin", title: "Command Injection" },
  { key: "encoding", title: "Obfuscating using encodings" },
  { key: "fileUpload", title: "File Upload" },
  { key: "graphql", title: "GraphQL" },
  { key: "hostHeader", title: "Host Header Injection" },
  { key: "httpReqSmuggling", title: "HTTP Request Smuggling" },
  { key: "infoDisclosure", title: "Information Disclosure" },
  { key: "jwt", title: "JWT" },
  { key: "noSqlInjection", title: "NoSQL Injection" },
  { key: "OAuth", title: "OAuth" },
  { key: "prototypePolution", title: "Prototype Pollution" },
  { key: "raceConditions", title: "Race Conditions" },
  { key: "random", title: "Random" },
  { key: "serializers", title: "Insecure Serializers" },
  { key: "sqlInjection", title: "SQL Injection" },
  { key: "ssrf", title: "SSRF" },
  { key: "ssti", title: "SSTI" },
  { key: "xss", title: "XSS " },
  { key: "xxe", title: "XXE" },
];

const sideNav = defineComponent({
  render() {
    return hElement(
      "nav",
      { class: `side-nav ${this.props.openNav ? "open-nav" : null}` },
      [
        hElement("div", { class: "side-nav-header" }, [
          hElement("h2", {}, ["All Topics"]),
          hElement("i", {
            class: "fas fa-times",
            on: {
              click: () => this.emit("toggleSideNav"),
            },
          }),
        ]),
        hElement("ul", {}, [
          ...TOPICS.map((topic) => {
            return hElement("li", { key: topic.key }, [
              hElement(
                RouterLink,
                {
                  to: `/notes/${topic.key}`,
                  on: {
                    click: () => console.log("ehll"),
                  },
                },
                [topic.title]
              ),
            ]);
          }),
        ]),
      ]
    );
  },
});

export default sideNav;
