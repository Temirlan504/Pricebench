document.addEventListener('DOMContentLoaded', () => {
    // Topbar Currency Selector
    const currencySelect = document.querySelector('.currency');

    // -----------------------------------------------------------------
    // Section 2: Parts & Expenses (+ Add Button)
    // -----------------------------------------------------------------
    const addPartBtn = document.getElementById('add-part');
    const partsList = document.getElementById('parts-list');

    if (addPartBtn && partsList) {
        addPartBtn.addEventListener('click', () => {
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

            partsList.appendChild(nameRow);
            partsList.appendChild(costRow);
        });
    }

    // -----------------------------------------------------------------
    // Section 3: Marketplace Fees (+ Add Button & Toggles)
    // -----------------------------------------------------------------
    const addFeeBtn = document.getElementById('add-fee');
    const feesList = document.getElementById('fees-list');

    if (addFeeBtn && feesList) {
        addFeeBtn.addEventListener('click', () => {
            const expenseRow = document.createElement('div');
            expenseRow.className = 'expense-row';

            // Expense Name Column
            const feeNameRow = document.createElement('div');
            feeNameRow.className = 'form-row';

            const feeNameInput = document.createElement('input');
            feeNameInput.type = 'text';
            feeNameInput.placeholder = 'e.g. eBay fee';
            feeNameRow.appendChild(feeNameInput);

            // Expense Amount Column
            const feeAmountRow = document.createElement('div');
            feeAmountRow.className = 'form-row';

            const amountControl = document.createElement('div');
            amountControl.className = 'amount-control';

            const feeValueInput = document.createElement('input');
            feeValueInput.type = 'number';
            feeValueInput.min = '0';
            feeValueInput.step = '0.01';
            feeValueInput.placeholder = '0.00';

            // $ / % Toggle
            const amountToggle = document.createElement('div');
            amountToggle.className = 'amount-toggle';
            amountToggle.setAttribute('role', 'group');
            amountToggle.setAttribute('aria-label', 'Expense calculation type');

            const fixedBtn = document.createElement('button');
            fixedBtn.type = 'button';
            fixedBtn.className = 'amount-toggle__option is-active';
            fixedBtn.dataset.type = 'fixed';
            fixedBtn.setAttribute('aria-pressed', 'true');
            fixedBtn.textContent = '$';

            const percentBtn = document.createElement('button');
            percentBtn.type = 'button';
            percentBtn.className = 'amount-toggle__option';
            percentBtn.dataset.type = 'percentage';
            percentBtn.setAttribute('aria-pressed', 'false');
            percentBtn.textContent = '%';

            amountToggle.appendChild(fixedBtn);
            amountToggle.appendChild(percentBtn);

            amountControl.appendChild(feeValueInput);
            amountControl.appendChild(amountToggle);

            feeAmountRow.appendChild(amountControl);

            expenseRow.appendChild(feeNameRow);
            expenseRow.appendChild(feeAmountRow);

            feesList.appendChild(expenseRow);
        });

        // Toggle listener for dynamic & existing rows in Section 3
        feesList.addEventListener('click', (e) => {
            const toggleOption = e.target.closest('.amount-toggle__option');
            if (!toggleOption) return;

            const toggleGroup = toggleOption.closest('.amount-toggle');
            toggleGroup.querySelectorAll('.amount-toggle__option').forEach((btn) => {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-pressed', 'false');
            });

            toggleOption.classList.add('is-active');
            toggleOption.setAttribute('aria-pressed', 'true');
        });
    }

    // -----------------------------------------------------------------
    // Section 4: Your Profit ($ / % Toggle)
    // -----------------------------------------------------------------
    const profitToggle = document.querySelector('.profit-control__row .amount-toggle');

    if (profitToggle) {
        profitToggle.addEventListener('click', (e) => {
            const toggleOption = e.target.closest('.amount-toggle__option');
            if (!toggleOption) return;

            profitToggle.querySelectorAll('.amount-toggle__option').forEach((btn) => {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-pressed', 'false');
            });

            toggleOption.classList.add('is-active');
            toggleOption.setAttribute('aria-pressed', 'true');
        });
    }

    // -----------------------------------------------------------------
    // Topbar Currency Switching
    // -----------------------------------------------------------------
    if (currencySelect) {
        currencySelect.addEventListener('change', (event) => {
            const selectedCurrency = event.target.value;
            document.querySelectorAll('.form-row-currency').forEach((span) => {
                span.textContent = selectedCurrency;
            });
        });
    }
});
