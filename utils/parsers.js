async function parseTypescriptFile(relativePath) {
  const response = await fetch(relativePath);
  const content = await response.text();
  const lines = content.split("\n");

  let title = "";
  const sections = [];
  let currentSection = null;
  let currentSubsection = null;
  let currentNote = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Extract title
    if (!title && !currentSection && trimmedLine.startsWith("// ")) {
      title = trimmedLine.substring(3).trim();
      continue;
    }

    // Handle section
    if (trimmedLine.startsWith("//! ")) {
      // Push previous section if exists
      if (currentSection) {
        if (currentSubsection) {
          if (currentNote) {
            currentSubsection.notes.push(currentNote);
            currentNote = null;
          }
          currentSection.subsections.push(currentSubsection);
          currentSubsection = null;
        }
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmedLine.substring(4).trim(),
        subsections: [],
      };
      continue;
    }

    // Handle subsection
    if (trimmedLine.startsWith("//* ")) {
      if (currentSubsection) {
        if (currentNote) {
          currentSubsection.notes.push(currentNote);
          currentNote = null;
        }
        currentSection.subsections.push(currentSubsection);
      }
      currentSubsection = {
        title: trimmedLine.substring(4).trim(),
        text: "",
        notes: [],
      };
      continue;
    }

    // Handle note title
    if (trimmedLine.startsWith("//? ") || trimmedLine.startsWith("// ? ")) {
      if (currentNote) {
        currentSubsection.notes.push(currentNote);
      }
      const noteTitle = trimmedLine
        .replace("//? ", "")
        .replace("// ? ", "")
        .trim();
      currentNote = {
        title: noteTitle,
        text: "",
      };
      continue;
    }

    // Handle content lines
    if (trimmedLine.startsWith("// ")) {
      const contentLine = trimmedLine.substring(3);

      if (currentNote) {
        // Note content
        currentNote.text += (currentNote.text ? "\n\n" : "") + contentLine;
      } else if (currentSubsection) {
        // Subsection content
        currentSubsection.text +=
          (currentSubsection.text ? "\n\n" : "") + contentLine;
      }
    }
  }

  // Finalize any open elements
  if (currentNote && currentSubsection) {
    currentSubsection.notes.push(currentNote);
  }
  if (currentSubsection && currentSection) {
    currentSection.subsections.push(currentSubsection);
  }
  if (currentSection) {
    sections.push(currentSection);
  }

  // Clean up empty notes arrays
  sections.forEach((section) => {
    section.subsections.forEach((subsection) => {
      if (subsection.notes && subsection.notes.length === 0) {
        delete subsection.notes;
      }
    });
  });

  return {
    title,
    sections,
  };
}

async function fetchChallengeData(folderPath) {
  try {
    const normalizedPath = folderPath.replace(/\/?$/, "/");

    const confResponse = await fetch(`${normalizedPath}conf.json`);
    if (!confResponse.ok) throw new Error("conf.json not found");
    const config = await confResponse.json();
    const readmeResponse = await fetch(`${normalizedPath}readme.md`);
    if (!readmeResponse.ok) throw new Error("readme.md not found");
    const markdown = await readmeResponse.text();
    const readmeHTML = marked.parse(markdown);
    return {
      ...config,
      readme: readmeHTML,
    };
  } catch (error) {
    console.error(`Error loading project data: ${error.message}`);
    return {
      error: true,
      message: error.message,
    };
  }
}

export { parseTypescriptFile, fetchChallengeData  };
