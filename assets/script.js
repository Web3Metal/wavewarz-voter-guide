(function () {
  var storageKey = "wavewarz-voter-progress-v1";
  var contentPath = "content.json";

  function getValue(source, path) {
    return path.split(".").reduce(function (value, key) {
      return value && value[key];
    }, source);
  }

  function makeElement(tag, className, text) {
    var element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    return element;
  }

  function appendText(parent, tag, className, text) {
    var element = makeElement(tag, className, text);
    parent.appendChild(element);
    return element;
  }

  function applyButtonData(link, item) {
    link.className = "button " + (item.variant || "secondary");
    link.href = item.href || "#";
    link.textContent = item.label || "";

    if (item.urlKey) {
      link.setAttribute("data-url-placeholder", item.urlKey);
    }
  }

  function renderActions(parent, actions) {
    if (!parent || !actions) {
      return;
    }

    parent.textContent = "";
    actions.forEach(function (item) {
      var link = document.createElement("a");
      applyButtonData(link, item);
      parent.appendChild(link);
    });
  }

  function renderScreenshot(section, data) {
    if (!data.screenshotLabel && !data.screenshotCaption) {
      return;
    }

    var figure = makeElement("figure", "screenshot-placeholder");
    appendText(figure, "div", null, data.screenshotLabel);
    figure.firstChild.setAttribute("aria-hidden", "true");
    appendText(figure, "figcaption", null, data.screenshotCaption);
    section.appendChild(figure);
  }

  function renderHeading(section, data) {
    var heading = makeElement("div", "section-heading");
    appendText(heading, "p", "step-label", data.step);
    appendText(heading, "p", "time-estimate", data.time);
    appendText(heading, "h2", null, data.title);
    appendText(heading, "p", null, data.body);
    section.appendChild(heading);
  }

  function renderCards(section, cards) {
    if (!cards) {
      return;
    }

    var grid = makeElement("div", "lesson-grid");
    cards.forEach(function (card) {
      var article = makeElement("article", "info-card" + (card.variant ? " " + card.variant : ""));
      appendText(article, "h3", null, card.title);
      appendText(article, "p", null, card.body);
      grid.appendChild(article);
    });
    section.appendChild(grid);
  }

  function renderInstructions(section, instructions, variant) {
    if (!instructions) {
      return;
    }

    var list = makeElement("div", "instruction-list" + (variant ? " " + variant : ""));
    instructions.forEach(function (item) {
      var row = document.createElement("div");
      appendText(row, "span", "number", item.number);
      var copy = document.createElement("p");

      if (item.lead) {
        var strong = makeElement("strong", null, item.lead);
        copy.appendChild(strong);
        copy.appendChild(document.createTextNode(" "));
      }

      copy.appendChild(document.createTextNode(item.body || ""));
      row.appendChild(copy);
      list.appendChild(row);
    });
    section.appendChild(list);
  }

  function renderCallout(section, callout) {
    if (!callout) {
      return;
    }

    var element = makeElement("div", "callout" + (callout.variant ? " " + callout.variant : ""));
    appendText(element, "h3", null, callout.title);
    appendText(element, "p", null, callout.body);
    section.appendChild(element);
  }

  function renderSplitPanels(section, panels) {
    if (!panels) {
      return;
    }

    var wrapper = makeElement("div", "split-panel");
    panels.forEach(function (panel) {
      var item = document.createElement("div");
      appendText(item, "h3", null, panel.title);
      appendText(item, "p", null, panel.body);
      wrapper.appendChild(item);
    });
    section.appendChild(wrapper);
  }

  function renderCompletion(section, completion) {
    if (!completion) {
      return;
    }

    var label = makeElement("label", "complete-row");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("data-progress", completion.id);
    label.appendChild(checkbox);
    appendText(label, "span", null, completion.label);
    section.appendChild(label);
  }

  function renderMissionList(section, missions) {
    if (!missions) {
      return;
    }

    var list = makeElement("div", "mission-list");
    missions.forEach(function (mission) {
      var label = document.createElement("label");
      var checkbox = document.createElement("input");
      var text = document.createElement("span");
      checkbox.type = "checkbox";
      checkbox.setAttribute("data-progress", mission.id);
      appendText(text, "strong", null, mission.title);
      text.appendChild(document.createTextNode(mission.body ? " " + mission.body : ""));
      label.appendChild(checkbox);
      label.appendChild(text);
      list.appendChild(label);
    });
    section.appendChild(list);
  }

  function renderFaq(section, items) {
    if (!items) {
      return;
    }

    var list = makeElement("div", "faq-list");
    items.forEach(function (item) {
      var details = document.createElement("details");
      if (item.open) {
        details.open = true;
      }
      appendText(details, "summary", null, item.question);
      appendText(details, "p", null, item.answer);
      list.appendChild(details);
    });
    section.appendChild(list);
  }

  function renderSection(section, data) {
    section.textContent = "";
    renderHeading(section, data);

    if (data.actions) {
      var actions = makeElement("div", "section-actions");
      section.appendChild(actions);
      renderActions(actions, data.actions);
    }

    renderScreenshot(section, data);
    renderCards(section, data.cards);
    renderInstructions(section, data.instructions, data.instructionVariant);
    renderCallout(section, data.callout);
    renderSplitPanels(section, data.splitPanels);
    renderMissionList(section, data.missions);
    renderFaq(section, data.items);
    renderCompletion(section, data.completion);
  }

  function renderContent(content) {
    document.title = content.meta.title;

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", content.meta.description);
    }

    document.querySelectorAll("[data-content]").forEach(function (element) {
      element.textContent = getValue(content, element.getAttribute("data-content")) || "";
    });

    document.querySelectorAll("[data-aria-label]").forEach(function (element) {
      element.setAttribute("aria-label", getValue(content, element.getAttribute("data-aria-label")) || "");
    });

    document.querySelectorAll("[data-list]").forEach(function (element) {
      var items = getValue(content, element.getAttribute("data-list")) || [];
      element.textContent = "";

      if (element.classList.contains("top-nav")) {
        items.forEach(function (item) {
          var link = document.createElement("a");
          link.href = item.href;
          link.textContent = item.label;
          element.appendChild(link);
        });
        return;
      }

      if (element.classList.contains("hero-actions")) {
        renderActions(element, items);
        return;
      }

      if (element.classList.contains("trust-strip")) {
        items.forEach(function (item) {
          appendText(element, "p", null, item);
        });
      }
    });

    Object.keys(content.sections).forEach(function (key) {
      var section = document.querySelector('[data-section="' + key + '"]');
      if (section) {
        renderSection(section, content.sections[key]);
      }
    });

    applyUrls(content.urls || {});
  }

  function applyUrls(urls) {
    document.querySelectorAll("[data-url-placeholder]").forEach(function (link) {
      var key = link.getAttribute("data-url-placeholder");
      var url = urls[key];

      if (url) {
        link.href = url;
        link.removeAttribute("aria-disabled");
      } else {
        link.href = "#";
        link.setAttribute("aria-disabled", "true");
      }
    });
  }

  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function writeProgress(progress) {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }

  function updateProgress() {
    var boxes = Array.prototype.slice.call(document.querySelectorAll("[data-progress]"));
    var progressPercent = document.getElementById("progressPercent");
    var completed = boxes.filter(function (box) {
      return box.checked;
    }).length;
    var percent = boxes.length ? Math.round((completed / boxes.length) * 100) : 0;

    if (progressPercent) {
      progressPercent.textContent = percent + "%";
    }
  }

  function hydrateProgress() {
    var progress = readProgress();
    var boxes = Array.prototype.slice.call(document.querySelectorAll("[data-progress]"));
    var resetButton = document.getElementById("resetProgress");

    boxes.forEach(function (box) {
      var id = box.getAttribute("data-progress");
      box.checked = Boolean(progress[id]);

      box.addEventListener("change", function () {
        var nextProgress = readProgress();
        nextProgress[id] = box.checked;
        writeProgress(nextProgress);
        updateProgress();
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        localStorage.removeItem(storageKey);
        boxes.forEach(function (box) {
          box.checked = false;
        });
        updateProgress();
      });
    }

    updateProgress();
  }

  function loadContent() {
    return fetch(contentPath).then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load content.json");
      }
      return response.json();
    });
  }

  loadContent()
    .then(function (content) {
      renderContent(content);
      hydrateProgress();
    })
    .catch(function (error) {
      console.error(error);
      document.body.classList.add("content-load-error");
    });
})();
