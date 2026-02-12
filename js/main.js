import { getDataFromJSON, setDataToHTML } from "./functions.js";

document.addEventListener("DOMContentLoaded", async () => {

    const periodSelectors = document.querySelectorAll(".period_selectors");
    const defaultStateOnLoad = document.getElementById("default_data_onload");
    let cachedHTMLElements = {};

    //associate to each data-activity name its corresponding HTML element
    document.querySelectorAll("[data-activity]").forEach(element => {

        cachedHTMLElements[element.dataset.activity] =
        {
            currentHours: element.querySelector(".current_hours"),
            previousHours: element.querySelector(".previous_hours"),
            timeframe: element.querySelector(".previous_events"),
        }
    })

    await getDataFromJSON();

    //default state on page load
    defaultStateOnLoad?.classList.add("js_focus_visible"); //disable :focus-visible ring on initial page load
    defaultStateOnLoad.focus();
    setDataToHTML(defaultStateOnLoad, cachedHTMLElements);

    //set data after click
    periodSelectors.forEach((periodSelector) => {
        periodSelector.addEventListener("click", () => {

            defaultStateOnLoad.classList.remove("js_focus_visible"); //enable :focus-visible ring on initial page load
            setDataToHTML(periodSelector, cachedHTMLElements);

        })
    })
})