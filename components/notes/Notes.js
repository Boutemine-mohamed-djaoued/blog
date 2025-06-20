import { defineComponent, hElement, RouterLink } from "../../node_modules/sleepyo/dist/sleepyo.js";
import sideNav from "../layout/SideNav.js";
import Topic from "./Topic.js";
import { parseTypescriptFile } from "../../utils/parsers.js";
const Notes = defineComponent({
  state() {
    return {
      currentTopic: null,
    };
  },
  async onMounted() {
    const currentTopicTitle = this.appContext.router.params.title;
    const data = await parseTypescriptFile(`./public/notes/${currentTopicTitle}.ts`);
    this.updateState({ currentTopic: data });
  },
  render() {
    if (!this.state.currentTopic) {
      return hElement("div", { class: "loading" }, ["Loading..."]);
    }
    return hElement("div", { class: "notes-page" }, [hElement(sideNav, {}), hElement(Topic, { topic: this.state.currentTopic })]);
  },
});

export default Notes;
