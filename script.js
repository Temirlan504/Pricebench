const currencySelector = document.querySelector(".currency");
const partsList = document.querySelector("#parts-list");
const addPartButton = document.querySelector("#add-part");
const calculateButton = document.querySelector("#calculate-button");

const currencyLabels = document.querySelectorAll(
    ".form-row-currency, #result-currency, .results-metric__currency, #suggested-price-currency"
);

const fixedAmountToggles = document.querySelectorAll(
    '.amount-toggle__option[data-type="fixed"]'
);

const currencySymbols = {
    CAD: "CA$",
    USD: "US$",
    EUR: "€",
    GBP: "£"
};

// Update the displayed currency symbols.
function updateCurrencyDisplay() {
    const selectedCurrency = currencySelector.value;

    const currencySymbols = {
        CAD: "CA$",
        USD: "US$",
        EUR: "€",
        GBP: "£"
    };

    const symbol = currencySymbols[selectedCurrency] ?? selectedCurrency;

    const currencyLabels = document.querySelectorAll(
        ".form-row-currency, #result-currency, .results-metric__currency, #suggested-price-currency"
    );

    currencyLabels.forEach((label) => {
        label.textContent = symbol;
    });

    const fixedAmountToggles = document.querySelectorAll(
        '.amount-toggle__option[data-type="fixed"]'
    );

    fixedAmountToggles.forEach((button) => {
        button.textContent = symbol;
    });
}

// Listen for changes to the currency selector.
currencySelector.addEventListener("change", updateCurrencyDisplay);

// Set the correct symbols when the page first loads.
updateCurrencyDisplay();

// Test that the Calculate button responds to a click.
calculateButton.addEventListener("click", () => {
    console.log("Calculate button clicked.");
});

let partCount = 0;

addPartButton.addEventListener("click", () => {
    partCount++;

    const rowWrapper = document.createElement("div");
    rowWrapper.className = "form-fields";

    const nameRow = document.createElement("div");
    nameRow.className = "form-row";
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = `part-name-${partCount}`;
    nameInput.placeholder = "Enter item name";
    nameRow.appendChild(nameInput);

    const costRow = document.createElement("div");
    costRow.className = "form-row";

    const costInput = document.createElement("input");
    costInput.type = "number";
    costInput.id = `part-cost-${partCount}`;
    costInput.min = "0";
    costInput.step = "0.01";
    costInput.placeholder = "0.00";

    const currencyWrapper = document.createElement("div");
    currencyWrapper.className = "input-currency";

    const currencyLabel = document.createElement("span");
    currencyLabel.className = "form-row-currency";

    currencyWrapper.append(costInput, currencyLabel);
    costRow.appendChild(currencyWrapper);

    rowWrapper.append(nameRow, costRow);
    partsList.appendChild(rowWrapper);

    updateCurrencyDisplay();
    console.log(`Part ${partCount} added.`);
});
