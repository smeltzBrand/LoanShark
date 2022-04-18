// get the loans from the page

function getValues() {
    //step 1 get values from the page
    let lamount = document.getElementById("lamount").value;

    let lterm = document.getElementById("lterm").value;

    let lrate = document.getElementById("lrate").value;


    //check for NaN
    if (isNaN(lamount)){
        alert("Enter a valid amount. Must be a number");
        document.getElementById("lamount").focus();
    } else if (isNaN(lterm)){
        alert("Enter a valid payment term. Must be the number of monthly payments for the loan.");
        document.getElementById("lterm").focus();
    } else if (isNaN(lrate)){
        alert("Enter a valid loan interest rate. Must be a valid number.");
        document.getElementById("lrate").focus();
    } else {
        // convert the annual rate to monthly rate
    let mrate = calcRate(lrate);

    //calculate the monthly payment
    let lpayment = calcPayment(lamount,mrate,lterm);

    //build our schedule
    let payments = buildSchedule(lamount,lrate,lterm,lpayment);

    //call display data
    displayData(payments,lamount,payment);
    }
    
    //isNaN()

    //step 2 - caluclate the payment
    //call buildSchedule

    // let payments = buildSchedule(amount, rate, term, payment);

    //call display data
    //displayData(payments,...arguments);

}

//builds an amortization schedule
function buildSchedule(amount, rate, term, payment){
    let payments = [];

    let balance = amount;
    let totalInterest = 0;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyTotalInterest = 0;


    for (let month = 0; month <= term; month++) {

        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;

        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balanace: balance
        }
        
        payments.push(curPayment);
    }

   

    //return an array of payments objects
    return payments;
}

//displaya the table of payments
//add the summary info at the top of the page
function displayData(payments, lamount, payment) {

    let tableBody = document.getElementById("scheduleBody");
    let template = document.getElementById("scheduleTemplate");

    //clear the table of previous values
    tableBody.innerHTML = "";

    for (let i = 0; i < payments.length; i++) {
        
        //clone the template
        let paymentRow = template.importNode(template.content,true);
        //get an array of columns
        let paymentCols = paymentRow.querySelectorAll("td");

        paymentCols[0].textContent = payments[i].month;
        paymentCols[1].textContent = payments[i].payment.toFixed(2);
        paymentCols[2].textContent = payments[i].principal.toFixed(2);
        paymentCols[3].textContent = payments[i].interest.toFixed(2);
        paymentCols[4].textContent = payments[i].totalInterest.toFixed(2);
        paymentCols[5].textContent = payments[i].balance.toFixed(2);

        tableBody.appendChild(paymentRow);
        
    }
}

//helper functions
function calcPayment(amount, rate, term) {
    let payment = 0;

    payment = (amount * rate) / (1 - Math.pow(1 + rate, -term));

    return payment;
}

//mothly rate for the loan
function calcRate(rate) {
  return rate = rate / 1200
}

//current balance and monthly rate
function calcInterest(balance, rate) {
    return balance * rate;
}