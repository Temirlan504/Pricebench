document.addEventListener('DOMContentLoaded', () => {
    const addPartBtn = document.getElementById('add-part');
    const partsList = document.getElementById('parts-list');
    const currencySelect = document.querySelector('.currency');

    if (addPartBtn && partsList) {
        addPartBtn.addEventListener('click', () => {
            // Read currently selected currency from topbar
            const activeCurrency = currencySelect ? currencySelect.value : 'CAD';

            // Item Name Column
            const nameRow = document.createElement('div');
            nameRow.className = 'form-row';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Enter item name';
            nameRow.appendChild(nameInput);

            // Item Cost Column
            const costRow = document.createElement('div');
            costRow.className = 'form-row';

            const inputCurrency = document.createElement('div');
            inputCurrency.className = 'input-currency';

            const costInput = document.createElement('input');
            costInput.type = 'number';
            costInput.placeholder = '0.00';
            costInput.min = '0';
            costInput.step = '0.01';

            const currencySpan = document.createElement('span');
            currencySpan.className = 'form-row-currency';
            currencySpan.textContent = activeCurrency;

            inputCurrency.appendChild(costInput);
            inputCurrency.appendChild(currencySpan);
            costRow.appendChild(inputCurrency);

            // Append both columns directly into the grid container
            partsList.appendChild(nameRow);
            partsList.appendChild(costRow);
        });
    }

    // Keep all currency indicators synced when the topbar dropdown changes
    if (currencySelect) {
        currencySelect.addEventListener('change', (event) => {
            const selectedCurrency = event.target.value;
            document.querySelectorAll('.form-row-currency').forEach((span) => {
                span.textContent = selectedCurrency;
            });
        });
    }
});
