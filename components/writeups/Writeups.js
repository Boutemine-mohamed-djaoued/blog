import {
  defineComponent,
  hElement,
  RouterLink,
} from "../../node_modules/sleepyo/dist/sleepyo.js";
import { fetchChallengeData } from "../../utils/parsers.js";
import Challenge from "./Challenge.js";
const CHALLENGES = ["scraper", "test2"];

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
    if (!this.state.challenges) {
      return hElement("div", { class: "loading" }, [
        "There No Challenges Currently",
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

