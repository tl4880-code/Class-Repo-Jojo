/*
 * PROJECT 1 — INITIAL PROTOTYPE
 *
 * The perspective controls below are kept in JavaScript so the same
 * interaction can later be connected to JSON and Fetch data.
 */

const perspectives = {
    science: {
        title: "SPECIMEN",
        description:
            "For a natural history museum, preserved skin can become scientific evidence used for classification, research, and education."
    },
    ethics: {
        title: "BODY",
        description:
            "From an animal ethics perspective, the skin remains part of a once-living and sentient body."
    },
    memory: {
        title: "MEMORIAL",
        description:
            "For a pet owner, preserved fur or skin may become a physical connection to a lost companion."
    },
    trophy: {
        title: "TROPHY",
        description:
            "Within hunting culture, the preserved animal may represent ownership, achievement, or remembrance."
    }
};

const result = document.querySelector(".result");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const perspectiveButtons = document.querySelectorAll("[data-view]");

/**
 * Change the text shown for the selected perspective.
 * This function is also exposed globally for compatibility with inline HTML.
 *
 * @param {string} view - One of the keys in the perspectives object.
 */
function changeView(view) {
    const selectedPerspective = perspectives[view];

    if (!selectedPerspective || !resultTitle || !resultDescription) {
        return;
    }

    if (result) {
        result.classList.add("is-updating");
    }

    window.setTimeout(() => {
        resultTitle.textContent = selectedPerspective.title;
        resultDescription.textContent = selectedPerspective.description;

        perspectiveButtons.forEach((button) => {
            const isSelected = button.dataset.view === view;
            button.classList.toggle("is-active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        if (result) {
            result.classList.remove("is-updating");
        }
    }, 120);
}

// Connect every perspective button to the shared changeView function.
perspectiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeView(button.dataset.view);
    });
});

// Allow the perspective controls to be used with the keyboard as well.
perspectiveButtons.forEach((button, index) => {
    button.addEventListener("keydown", (event) => {
        let nextIndex = index;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % perspectiveButtons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + perspectiveButtons.length) % perspectiveButtons.length;
        } else {
            return;
        }

        event.preventDefault();
        perspectiveButtons[nextIndex].focus();
        changeView(perspectiveButtons[nextIndex].dataset.view);
    });
});
