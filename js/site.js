
//get the loans from page
function getValues() {
    //step 1 get values from the page
    let loanTotal = parseInt(document.getElementById("loanAmount").value, 10);
    let numPays = parseInt(document.getElementById("loanPayment").value, 10);
    let intRate = parseInt(document.getElementById("loanRate").value, 10);

    //step 2 - calculate payment
    let monPay = loanTotal*(intRate/1200)/(1 -(1+intRate/1200)**(-numPays))

    //call buildschedule
    let payments = buildSchedule(loanTotal, intRate, numPays, monPay);

    //call display data
    displayData(payments);

}

//build an amortization schedule
function buildSchedule(amount, rate, term, monPayment) {
    let payments = [];
    // let curPayment = {
    //     month: 0,
    //     payment: 0,
    //     principal: 0,
    //     interest: 0,
    //     totalInterest: 0,
    //     balance: 0
    // }
    let loanBal = amount;
    let totInt = 0;
    //let loanInt = loanBal*rate/1200;
    //let loanPrincipal = monPayment - loanInt;

    for (let i = 1; i <= term; i++) {
        // do all calculations then push the object of results into the array
        
        // loanInt would not recalculate if placed outside of for loop
        // as loanPrincipal dends on loanInt, it too had to be brought in
        let loanInt = loanBal * rate / 1200;
        let loanPrincipal = monPayment - loanInt;
        
        let curPayment = {
        month: i,
        payment: monPayment,
        principal: monPayment - loanInt, 
        interest: loanInt,
        totalInterest: totInt += loanInt,
        balance: loanBal -= loanPrincipal,
        };

        payments.push(curPayment);
        
    }

    //return an array of payment objects
    return payments;

}

function displayData(payments) {
    event.preventDefault();
    let amortBody = document.getElementById("amortBody");
    let template = document.getElementById("amort-template");

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    
    //amortBody.innerHTML = "";

    for (let i = 0; i < payments.length; i++) {
        let amortRow = document.importNode(template.content, true);
        let amortCols = amortRow.querySelectorAll("td");

        amortCols[0].textContent = payments[i].month;
        amortCols[1].textContent = dollarUS.format(payments[i].payment);
        amortCols[2].textContent = dollarUS.format(payments[i].principal);
        amortCols[3].textContent = dollarUS.format(payments[i].interest);
        amortCols[4].textContent = dollarUS.format(payments[i].totalInterest);
        amortCols[5].textContent = dollarUS.format(payments[i].balance);

        amortBody.appendChild(amortRow);
        
    }

    

    let loanTotal = parseInt(document.getElementById("loanAmount").value, 10);
    let totPrinc = document.getElementById("totalPrinc");
    totPrinc.innerHTML = dollarUS.format(loanTotal);

    let numPays = parseInt(document.getElementById("loanPayment").value, 10);
    let totInt = document.getElementById("totalInt");
    totInt.innerHTML = dollarUS.format(payments[numPays -1].totalInterest);

    let totCost = document.getElementById("totalCost");
    totCost.innerHTML = dollarUS.format(loanTotal + payments[numPays -1].totalInterest);

}