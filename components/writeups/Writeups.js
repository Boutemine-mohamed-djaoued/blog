import { defineComponent, hElement } from "../../public/sleepyo.js";
import { fetchChallengeData } from "../../utils/parsers.js";
import Challenge from "./Challenge.js";
const CHALLENGES = [];

const Writeups = defineComponent({
  state() {
    return {
      challenges: null,
    };
  },
  async onMounted() {
    const res = await Promise.all(
      CHALLENGES.map((challenge) =>
        fetchChallengeData(`./public/writeups/${challenge}`)
      )
    );
    this.updateState({ challenges: res });
  },
  render() {
    if (!this.state.challenges || this.state.challenges.length === 0) {
      return hElement("div", { class: "empty" }, [
        "There are No Writeups Currently",
      ]);
    }

    return hElement("div", { class: "challenges-container" }, [
      ...this.state.challenges.map((challenge) =>
        hElement(Challenge, { challenge })
      ),
    ]);
  },
});

export default Writeups;
