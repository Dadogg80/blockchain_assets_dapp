
const Connect = window.uportconnect;
const uport = new Connect('Medical Center', {
  network: "rinkeby",
  profileImage: {"/": "/ipfs/QmcUmjxgjsqZ6nVJJ8283jknNfrN7x6sRhMBT7jxHobTeS"},
  bannerImage: {"/": "/ipfs/QmafiedVx2CZn132AUstbHDCmRQmVWySG3tG645kyXZfVw"},
  description: "This app will send a VC that the patient is vaccinated for the Covid-19 Virus. "
});

const req = { requested: ['name', 'country'],
              notifications: true };
const reqID = 'disclosureReq';
              

$(function() {
     // listen for click from the submit_Button
     $("#verifyButton").on("click", verify);
     $("#sendVC").on("click", sendVaccinationVerification);

})


function verify() {
    //Ask the user for their address information
    //by using default disclosure behavior.
    uport.requestDisclosure(req, reqID);
    uport.onResponse(reqID).then(res => {
    const did = res.payload.did;
    const name = res.payload.name;
    console.log( name, did );
    json = JSON.stringify(res.payload);
    console.log( json );
    document.querySelector('#msg1').innerHTML = (`
        <div>
          <h2>Welcome,${name}</h2>
          <hr>
        <div>
        `);
    document.querySelector('#msg2').innerHTML = (`
        <div>
          <h4>Thank you for verifying your Identity.</h4>
          <p>We have registered the following information:<p>
          <p>Name: <b>${name}</b></p>
          <p>DID: <b>${did}</b></p> 
        <div>
      `);
    document.querySelector('#msg3').innerHTML = (`
        <div>
          <h4>You can now proceed into the doctor's office</h4>
          <p><b>Have a nice day</b></p>
        <div>
        <div>
          <button class="btn btn-primary pull-right" onclick="sendVaccinationVerification()" type="button" id="SendVC">Send Vaccination Proof</button>
        </div>
        `);
      
    });
}

function sendVaccinationVerification() {
  uport.sendVerification({exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
    claim: {
       'Vaccinations' : [{
          'Covid-19' : {
            'Vaccinated' : {
              'Phase 1 of 3' : (`${true} : ${new Date()}`),
              'Phase 2 of 3' : (`${false}`),
              'Phase 3 of 3' : (`${false}`)
            }
          },
          'Seasonal Flue' : {
            'Vaccinated' : {
              'Completed' : (`${true} : ${new Date()}`)
            }
          }
        }]
        
    }
  })
}
