import { defineComponent, hElement } from "../../public/sleepyo.js";
import { parseTypescriptFile } from "../../utils/parsers.js";
import sideNav from "../layout/SideNav.js";
import Topic from "./Topic.js";

const Notes = defineComponent({
  state() {
    return {
      currentTopic: null,
      handleChange: null,
      openNav: false,
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
  handleNavChange() {
    this.updateState({ openNav: !this.state.openNav });
  },
  render() {
    if (!this.state.currentTopic) {
      return hElement("div", { }, [""]);
    }
    return hElement(
      "div",
      {
        class: "notes-page",
      },
      [
        hElement(sideNav, {
          openNav: this.state.openNav,
          on: {
            toggleSideNav: this.handleNavChange,
          },
        }),
        hElement(Topic, {
          topic: this.state.currentTopic,
          on: {
            toggleSideNav: this.handleNavChange,
          },
        }),
      ]
    );
  },
});

export default Notes;
