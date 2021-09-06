//Called function by clicking on search on the main view to see all countries matching
function getCountryByName(){
    let name = document.getElementById('CountryNameInput').value
    const url=`https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountries(data))
}

//Function to display (show) countries matching on the main page
function displayCountries(countries){
  
    //Check control to see if we're on a big or small resolution an choosing the right way to display data 
    if (window.matchMedia("(max-width: 990px)").matches) {
        let countriesList = document.getElementById("countries-mobile"); 
        let lists = PhoneView(countries)
        countriesList.innerHTML=lists;
      } else {
        let countriesList = document.getElementById("countries");
        let countriesListDetails = document.getElementById("countriesDetails");
        let {lists, listsDetails}=LaptopView(countries)
        countriesList.innerHTML = lists;
        countriesListDetails.innerHTML = listsDetails;
    }
 
}

//Function that shows countries on big resolutions
function LaptopView(countries){
    let lists="";
    let listsDetails="";

    countries.forEach(country => {
        lists+=
        `<button class="nav-link" id="v-pills-${country.alpha3Code}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${country.alpha3Code}" type="button" role="tab" aria-controls="v-pills-${country.alpha3Code}" aria-selected="false"><div class="card">
        <div class="card-body country-tab">
        <small>${country.alpha2Code}</small> <br>
        ${country.name}
        </div>
        </div>
        </button>`;

        listsDetails+=
        `<div class="tab-pane fade" id="v-pills-${country.alpha3Code}" role="tabpanel" aria-labelledby="v-pills-${country.alpha3Code}-tab">
            <div class="card mt-2">
                    <div class="card-body">
                        <img src="${country.flag}" class="img-flag mb-2" alt="Flag">
                        <h5 class="card-title text-center">${country.name}</h5>
                        <ul>
                            <li>Name : ${country.name} </li>
                            <li> Native Name : ${country.nativeName} </li>
                            <li> Capital : ${country.capital} </li>
                            <li> Population : ${country.population} </li>
                            <li> Timezones :`
                            +country.timezones.map(timezone => `${timezone}`).join(", ")
                            +`</li>
                            <li> Currencies :`
                            +country.currencies.map(currency => `${currency.code} (${currency.symbol})`).join(", ")
                            +`</li>
                            <li> Languages :`
                            +country.languages.map(lang => `${lang.name}`).join(", ")
                            +`</li>
                            <li> Border countries :`
                            +country.borders.map(border => `${border}`).join(", ")
                            +`</li>
                        <ul>
                    </div>
            </div>
        </div>`
    });

    return {lists, listsDetails}
}

//Function that shows countries on small resolutions
function PhoneView(countries){
    let lists="";


    countries.forEach(country => {
        lists+=
        ` <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          ${country.alpha2Code} 
          <br/>
          <br/>
           ${country.name}
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <img src="${country.flag}" class="img-flag mb-2" alt="Flag">
            <h5 class="card-title text-center">${country.name}</h5>
            <ul>
                <li>Name : ${country.name} </li>
                <li> Native Name : ${country.nativeName} </li>
                <li> Capital : ${country.capital} </li>
                <li> Population : ${country.population} </li>
                <li> Timezones :`
                +country.timezones.map(timezone => `${timezone}`).join(", ")
                +`</li>
                <li> Currencies :`
                +country.currencies.map(currency => `${currency.code} (${currency.symbol})`).join(", ")
                +`</li>
                <li> Languages :`
                +country.languages.map(lang => `${lang.name}`).join(", ")
                +`</li>
                <li> Border countries :`
                +country.borders.map(border => `${border}`).join(", ")
                +`</li>
            <ul>
          </div>
        </div>
      </div>`;

        
    });

    return lists
}