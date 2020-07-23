// ==UserScript==
// @name         Chegg tutor earning helper.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Chegg tutor earning helper.
// @author       remiliacn
// @match        https://www.chegg.com/tutors/*
// @grant        none
// ==/UserScript==

(function() {
    function addPriceTotal() {
        let priceSum = 0.0;
        // Get price tags
        const priceList = document.querySelectorAll('span._6zAgqawnLfo40Z0WHSMP');
        if (priceList.length == 0) {
            return;
        }

        for (var i = 0; i < priceList.length; i++) {
            let moneyString = priceList[i].innerText.trim().substring(1);
            let money = parseFloat(moneyString);
            // If is void or something that is not a price, record it as 0 otherwise record the price.
            priceSum += (isNaN(money)) ? 0.0 : money;
        }

        priceSum = priceSum.toFixed(2);

        // Add the total price below "View lessons (live and written) you've completed"
        const parentBox = document.querySelector('div.Q0ecAeFkl5uajoN_SHQpI');
        let moneySummaryDiv = document.createElement('div');
        moneySummaryDiv.innerHTML = `<div class="_1ERasUwfH0YFc4vBMuowT5">Money earned total: ${priceSum}</div>`;
        parentBox.appendChild(moneySummaryDiv);
    }

    // Wait for page to fully load and then calculate the total.
    window.addEventListener('load', function () {
        addPriceTotal();
    })

})();
