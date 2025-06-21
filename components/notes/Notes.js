import {
  defineComponent,
  hElement,
  RouterLink,
} from "../../node_modules/sleepyo/dist/sleepyo.js";
import sideNav from "../layout/SideNav.js";
import Topic from "./Topic.js";
import { parseTypescriptFile } from "../../utils/parsers.js";

const Notes = defineComponent({
  state() {
    return {
      currentTopic: null,
      handleChange: null,
    };
  },
  async onMounted() {
    const handleChange = async () => {
      const currentTopicTitle = this.appContext.router.params.title;
      if (!currentTopicTitle) return;
      const data = await parseTypescriptFile(
        `./public/notes/${currentTopicTitle}.ts`
      );
      this.updateState({ currentTopic: data });
    };
    this.updateState({ handleChange });
    this.appContext.router.subscribe(handleChange);
    await handleChange();
  },
  async onUnmounted() {
    this.appContext.router.unsubscribe(this.state.handleChange);
  },
  render() {
    if (!this.state.currentTopic) {
      return hElement("div", { class: "loading" }, ["Loading..."]);
    }
    return hElement("div", { class: "notes-page" }, [
      hElement(sideNav, {}),
      hElement(Topic, { topic: this.state.currentTopic }),
    ]);
  },
});

export default Notes;
