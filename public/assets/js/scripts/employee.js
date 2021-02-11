

var web3 = new Web3(Web3.givenProvider);

var instance;
var admin;
const smartcontract = process.env.SMARTCONTRACT;
$(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract( abi, smartcontract, {
            from: accounts[0],
            gasPrice: '20000000000'
        });
        // Sets variables
        admin = accounts[0];
        // @dev - logs the owner address in the console
        console.warn(`Smartcontract Owner is ${admin}`);
    });

    // listen for click from the submit_Button
    $("#submitButton").on("click", inputData);
});

function inputData() {
    var first = $("#first_input").val();
    var last = $("#last_input").val();
    var name = (`${first} ${last}`);
    var located = $("#location_input").val();
    var startDate = $("#startDate_input").val();
    var workerAddress = $("#account_input").val();
    var company = $("#company_input").val();
    var departmentAddress = $("#department_input").val();

    console.log(name, located, startDate, workerAddress, company, departmentAddress);

    instance.methods.createEmployee(name, located, startDate, workerAddress, company, departmentAddress).send({}, (error, txhash) => {
        if (error) {
            console.warn(error);
        } else {
            console.log(txHash);
            console.log(`New Worker: ${workerAddress} is connected to department address ${departmentAddress}.`);
            console.log(`Transaction Hash is: \ntxHash: ${txHash} .`);
        }
    })
    .on("transactionHash", function(hash) {
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr) {
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt) {
        console.log(receipt)
        alert("Done.");
    });
}