import {
  defineComponent,
  hElement,
  RouterLink,
  hText,
} from "../../node_modules/sleepyo/dist/sleepyo.js";

const Challenge = defineComponent({
  render() {
    const { ctf, challenge, description, tags, year, difficulty } =
      this.props.challenge;

    return hElement(
      "div",
      {
        class: "challenge-card",
        on: {
          click: () => {
            this.appContext.router.navigateTo(`/writeups/${challenge}`);
          },
        },
      },
      [
        hElement("div", { class: "card-header" }, [
          hElement("div", { class: "ctf-name" }, [ctf]),
          hElement("div", { class: "year" }, [year]),
        ]),

        hElement("h2", { class: "challenge-name" }, [challenge]),

        hElement("p", { class: "description" }, [description]),

        hElement("div", { class: "card-footer" }, [
          hElement("div", { class: "tags" }, [
            ...tags.map((tag) => hElement("span", { class: "tag" }, [tag])),
          ]),
          hElement("div", { class: `difficulty ${difficulty}` }, [difficulty]),
        ]),
      ]
    );
  },
});

export default Challenge;
