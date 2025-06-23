import { defineComponent, hElement, RouterLink } from "../../public/sleepyo.js";
import { fetchChallengeData } from "../../utils/parsers.js";

const Writeup = defineComponent({
  state() {
    return {
      challenge: null,
    };
  },
  async onMounted() {
    const { challenge } = this.appContext.router.params;
    const res = await fetchChallengeData(`./public/writeups/${challenge}`);
    this.updateState({ challenge: res });
    document.querySelector(".markdown-body").innerHTML = res.readme;
  },
  render() {
    if (!this.state.challenge) return hElement("div", {}, []);
    const { ctf, challenge, description, tags, year, difficulty } =
      this.state.challenge;
    return hElement("div", { class: "markdown-container" }, [
      hElement("div", { class: "challenge-content" }, [
        hElement(RouterLink, { to: "/writeups" }, [
          hElement("p", { class: "back" }, ["< Back"]),
        ]),
        hElement("div", { class: "card-header" }, [
          hElement("div", { class: "ctf-name" }, [ctf, " / ", year]),
        ]),

        hElement("h2", { class: "challenge-name" }, [challenge]),

        hElement("p", { class: "description" }, [description]),

        hElement("div", { class: "card-footer" }, [
          hElement("div", { class: "tags" }, [
            ...tags.map((tag) => hElement("span", { class: "tag" }, [tag])),
            hElement("div", { class: `difficulty ${difficulty}` }, [
              difficulty,
            ]),
          ]),
        ]),
      ]),
      hElement("div", { class: "markdown-body", id: "markdown-content" }),
    ]);
  },
});

export default Writeup;
