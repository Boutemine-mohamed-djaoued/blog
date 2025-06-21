// topic title
//! section1
//* subsection1
// normal text  normal text  normal text
// normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text
//? note title
// note text note text
// note text
//* subsection2
// normal text  normal text  normal text
//? note title2
// note text note text
// note text
//* subsection3
// normal text  normal text  normal text
//! section2
//* subsection1
// normal text  normal text  normal text
// ? note title
// note text note text
// note text
//! section3
//* subsection1
// normal text  normal text  normal text
// ? note title
// note text note text

const topic =  {
  title : "topic title",
  sections : [
    {
      title: "section1",
      subsections: [
        {
          title: "subsection1",
          text: "normal text  normal text  normal text\nnormal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text  normal text",
          notes: [
            {
              title: "note title",
              text: "note text note text\nnote text"
            }
          ]
        },
        {
          title: "subsection2",
          text: "normal text  normal text  normal text",
          notes: [
            {
              title: "note title2",
              text: "note text note text\nnote text"
            }
          ]
        },
        {
          title: "subsection3",
          text: "normal text  normal text  normal text"
        }
      ]
    },
    {
      title: "section2",
      subsections: [
        {
          title: "subsection1",
          text: "normal text  normal text  normal text",
          notes: [
            {
              title: "note title",
              text: "note text note text\nnote text"
            }
          ]
        }
      ]
    },
    {
      title: "section3",
      subsections: [
        {
          title: "subsection1",
          text: "normal text  normal text  normal text",
          notes: [
            {
              title: "note title",
              text: "note text note text"
            }
          ]
        }
      ]
    }
  ]
}
