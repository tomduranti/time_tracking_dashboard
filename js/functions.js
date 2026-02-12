export let JSONDataset;

export async function getDataFromJSON() {
    await fetch('js/data.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            JSONDataset = data;
            isArray(JSONDataset);
        })
        .catch(error => {
            console.error(error);
        })
}

export function setDataToHTML(HTMLElement, cachedObject) {

    for (const obj of JSONDataset) {
        const cachedObjectTitle = cachedObject[obj.title.toLowerCase()];

        cachedObjectTitle.currentHours.textContent = pluralizeWord(obj.timeframes[HTMLElement.dataset.timeframe].current);
        cachedObjectTitle.previousHours.textContent = setPreviousTimeframe(HTMLElement.dataset.timeframe);
        cachedObjectTitle.timeframe.textContent = pluralizeWord(obj.timeframes[HTMLElement.dataset.timeframe].previous);
    }
}

function isArray(dataset) {
    if (!Array.isArray(dataset)) {
        console.warn("Internal error: JSONDataset is not available or invalid");
        return;
    }
}

function pluralizeWord(hour) {
    let time;
    hour <= 1 ? time = "hr" : time = "hrs";

    return hour + time;
}

function setPreviousTimeframe(timeframe) {
    const previousTimeframeNames = {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month",
    }

    return previousTimeframeNames[timeframe];
}