import {
  defineComponent,
  hElement,
  RouterLink,
  hText,
} from "../../node_modules/sleepyo/dist/sleepyo.js";
import { fetchChallengeData } from "../../utils/parsers.js";

const Writeup = defineComponent({
  async onMounted() {
    const { challenge } = this.appContext.router.params;
    const res = await fetchChallengeData(`./public/writeups/${challenge}`);
    console.log(res);
    document.querySelector(".markdown-body").innerHTML = res.readme;
  },
  render() {
    return hElement("div", { class: "markdown-container" }, [
      hElement("div", { class: "markdown-body", id: "markdown-content" }),
    ]);
  },
});

export default Writeup;
