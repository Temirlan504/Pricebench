document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // Section 1: Topbar Currency Selector
    // -----------------------------------------------------------------
    const currencySelect = document.querySelector('.currency');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', (event) => {
            const selectedCurrency = event.target.value;
            // Update all currency labels dynamically
            document.querySelectorAll('.form-row-currency, #result-currency, #suggested-price-currency, .results-metric__currency')
                .forEach((span) => {
                    span.textContent = selectedCurrency;
                });
        });
    }

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
    // Section 5: Math & Calculation Engine
    // -----------------------------------------------------------------
    const calculateBtn = document.getElementById('calculate-button');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            
            // 1. Gather Base Costs (Purchase Cost + Parts)
            const purchaseCost = parseFloat(document.getElementById('product-purchase-cost').value) || 0;
            
            let partsCost = 0;
            document.querySelectorAll('#parts-list .input-currency input[type="number"]').forEach(input => {
                partsCost += (parseFloat(input.value) || 0);
            });
            const totalBaseCost = purchaseCost + partsCost;

            // 2. Gather Marketplace Fees
            let fixedFees = 0;
            let pctFees = 0; // Stored as a decimal (e.g. 10% = 0.10)

            document.querySelectorAll('#fees-list .expense-row').forEach(row => {
                const valInput = row.querySelector('input[type="number"]');
                const typeBtn = row.querySelector('.amount-toggle__option.is-active');
                
                const val = parseFloat(valInput.value) || 0;
                if (val !== 0) {
                    if (typeBtn && typeBtn.dataset.type === 'percentage') {
                        pctFees += (val / 100);
                    } else {
                        fixedFees += val;
                    }
                }
            });

            // 3. Gather Target Profit
            const profitInput = document.getElementById('profit-margin');
            const profitTypeBtn = document.querySelector('.profit-control__input-group .amount-toggle__option.is-active');
            
            let targetProfitVal = parseFloat(profitInput.value) || 0;
            let profitType = profitTypeBtn ? profitTypeBtn.dataset.type : 'percentage';

            // 4. Variables for Final Math
            let sellingPrice = 0;
            let estimatedProfit = 0;
            let breakEven = 0;

            if (pctFees >= 1) {
                alert("Marketplace fees cannot be 100% or more.");
                return;
            }

            // --- The Math Engine ---
            if (profitType === 'percentage') {
                // Margin is treated as Gross Margin (% of final selling price)
                const marginPct = targetProfitVal / 100;
                const combinedPct = pctFees + marginPct;

                if (combinedPct >= 1) {
                    alert("Combined percentage fees and profit margin equal or exceed 100%. Please adjust percentages.");
                    return;
                }

                sellingPrice = (totalBaseCost + fixedFees) / (1 - combinedPct);
                estimatedProfit = sellingPrice * marginPct;
            } else {
                // Fixed dollar profit logic
                sellingPrice = (totalBaseCost + fixedFees + targetProfitVal) / (1 - pctFees);
                estimatedProfit = targetProfitVal;
            }

            // Break Even = Base Cost + Fixed Fees + (Percentage Fees calculated against the final Selling Price)
            breakEven = totalBaseCost + fixedFees + (pctFees * sellingPrice);

            // 5. Update the UI Output
            const formatCurrency = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            document.getElementById('estimated-profit').textContent = formatCurrency(estimatedProfit);
            document.getElementById('target-profit-value').textContent = formatCurrency(estimatedProfit);
            document.getElementById('suggested-price').textContent = formatCurrency(sellingPrice);
            
            // In this breakdown context, Break-Even is identical to Total Costs
            document.getElementById('break-even-price').textContent = formatCurrency(breakEven);
            document.getElementById('total-costs').textContent = formatCurrency(breakEven);
            document.getElementById('your-selling-price').textContent = formatCurrency(sellingPrice);
        });
    }
});
