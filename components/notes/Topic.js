import { defineComponent, hElement } from "../../public/sleepyo.js";

const Topic = defineComponent({
  render() {
    const { title, sections } = this.props.topic;
    return hElement("main", { class: "topic" }, [
      hElement("div", { class: "topic-header" }, [
        hElement("h1", {}, [title]),
        hElement(
          "button",
          {
            class: "burger",
            on: {
              click: () => this.emit("toggleSideNav"),
            },
          },
          [hElement("i", { class: "fas fa-bars" })]
        ),
      ]),
      hElement("div", { class: "topic-sections" }, [
        ...sections.map(({ title, subsections }) => {
          return hElement("div", { class: "topic-section", key: title }, [
            hElement("h2", {}, [title]),
            ...subsections.map(({ title, text, notes = [] }) => {
              return hElement(
                "div",
                { class: "topic-subsection", key: title },
                [
                  hElement("h3", {}, [title]),
                  hElement("pre", {}, [hElement("code", {}, [text])]),
                  ...notes.map(({ title, text }) => {
                    return hElement("div", { class: "note" }, [
                      hElement("h4", {}, [title]),
                      hElement("p", {}, [text]),
                    ]);
                  }),
                ]
              );
            }),
          ]);
        }),
      ]),
    ]);
  },
});

export default Topic;
