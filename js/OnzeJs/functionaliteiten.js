const apiQuotesObjectenArray = [];
const apiCharacterObjecten = [];
const apiMovieObjectenArray = [];

let random;

let bijhorenKarakterNaam;
let bijhorendKarakterNummer;
let bijhorendMovieNummer;
let bijhorendMovieNaam;

let bolnummer = 1;
let total = 0;

//oude key: 7M2ZPEmrLU2sUEaspIWL

//ALLES VAN API FETCHEN IN IN EIGEN GEMAAKTE ARRAYS STEKEN ZODAT SLECHTS 1 KEER VAN API GEFETCHT MOET WORDEN:
fetch('https://the-one-api.dev/v2/quote', { headers: { Authorization: 'Bearer wcCvEkTjHfvsY6dzd-ih' } })
    //fetch('https://raw.githubusercontent.com/VermeulenBen/fetch/main/quotes')
    .then(res => res.json())
    .then(res => res.docs.forEach(item => apiQuotesObjectenArray.push(item)))
    .then(res => {
        fetch('https://the-one-api.dev/v2/character', { headers: { Authorization: 'Bearer wcCvEkTjHfvsY6dzd-ih' } })
            //fetch('https://raw.githubusercontent.com/VermeulenBen/fetch/main/characters')
            .then(res => res.json())
            .then(res => res.docs.forEach(item => apiCharacterObjecten.push(item)))
            .then(res => {
                fetch('https://the-one-api.dev/v2/movie', { headers: { Authorization: 'Bearer wcCvEkTjHfvsY6dzd-ih' } })
                    //fetch('https://raw.githubusercontent.com/VermeulenBen/fetch/main/movies')
                    .then(res => res.json())
                    .then(res => res.docs.forEach(item => apiMovieObjectenArray.push(item)))
                    .then(res => randomQuoteTonen())
                    .then(res => drieKaraktersTonen())
                    .then(res => drieMoviessTonen());
            })
    });

//FUNCTIE OM RANDOM QUOTE TE TONEN:
const randomQuoteTonen = () => {
    if (bolnummer <= 10) {
        random = Math.floor(Math.random() * apiQuotesObjectenArray.length);

        //Deze kan je gebruiken om de id's te controleren zodat je kan zien of de quiz wel écht controleert op bijhorende chars/movies:
        //document.getElementById("quote").innerHTML = apiQuotesObjectenArray[random].character + " " + apiQuotesObjectenArray[random].movie;

        document.getElementById("quote").innerHTML = apiQuotesObjectenArray[random].dialog;

        bijhorendKarakterNummer = apiQuotesObjectenArray[random].character; //om later het juiste karakterNUMMER te kunnen gebruiken
        bijhorendMovieNummer = apiQuotesObjectenArray[random].movie; //om later de juiste movieNUMMER te kunnen gebruiken
    }
}

//FUNCTIE OM DRIE KARAKTERS TE TONEN BIJ RADIO BUTTONS
const drieKaraktersTonen = () => {
    const drieKaraktersArray = [];

    //1 BIJ QUOTE BIJHOREND karakterobject in drieKaraktersArray steken:
    for (let i = 0; i < apiCharacterObjecten.length; i++) {
        if (bijhorendKarakterNummer === apiCharacterObjecten[i]._id) {
            drieKaraktersArray.push(apiCharacterObjecten[i]);

            bijhorenKarakterNaam = apiCharacterObjecten[i].name; //om later de juiste karaketerNAAM te kunnen gebruiken
        }
    }

    //2 RANDOM karakterobjecten in drieKaraktersArray steken, die niet de bijhorenKarakterNummer zijn:
    let teller = 1;
    while (teller <= 2) {
        random = Math.floor(Math.random() * apiCharacterObjecten.length);
        if (!drieKaraktersArray.includes(apiCharacterObjecten[random])) {
            drieKaraktersArray.push(apiCharacterObjecten[random]);
            teller++;
        }
    }

    //shuffle van de array:
    for (let i = drieKaraktersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [drieKaraktersArray[i], drieKaraktersArray[j]] = [drieKaraktersArray[j], drieKaraktersArray[i]];
    }

    //geshuffelde array tonen:
    for (let i = 0; i <= 2; i++) {

        //Deze kan je gebruiken om de id's te controleren zodat je kan zien of de quiz wel écht controleert op bijhorende chars:
        //document.getElementById("char" + i).innerHTML = drieKaraktersArray[i]._id + " " + drieKaraktersArray[i].name;

        document.getElementById("char" + i).innerHTML = drieKaraktersArray[i].name;
    }
}

//FUNCTIE OM DRIE MOVIES TE TONEN BIJ RADIO BUTTONS
const drieMoviessTonen = () => {
    const drieMoviesArray = [];

    //1 BIJ QUOTE BIJHOREND movieobject in drieMoviessArray steken:
    for (let i = 0; i < apiMovieObjectenArray.length; i++) {
        if (bijhorendMovieNummer === apiMovieObjectenArray[i]._id) {
            drieMoviesArray.push(apiMovieObjectenArray[i]);

            bijhorendMovieNaam = apiMovieObjectenArray[i].name; //om later de juiste movieNAAM te kunnen gebruiken
        }
    }

    //2 RANDOM movieobjecten in drieMoviesArray steken, die niet de bijhorendMovieNummer zijn:
    let teller = 1;
    while (teller <= 2) {
        random = Math.floor(Math.random() * apiMovieObjectenArray.length);
        if (!drieMoviesArray.includes(apiMovieObjectenArray[random])) {
            drieMoviesArray.push(apiMovieObjectenArray[random]);
            teller++;
        }
    }

    //shuffle van de array
    for (let i = drieMoviesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [drieMoviesArray[i], drieMoviesArray[j]] = [drieMoviesArray[j], drieMoviesArray[i]];
    }

    //geshuffelde array tonen:
    for (let i = 0; i <= 2; i++) {
        //Deze kan je gebruiken om de id's te controleren zodat je kan zien of de quiz wel écht controleert op bijhorende movies:
        //document.getElementById("mov" + i).innerHTML = drieMoviesArray[i]._id + " " + drieMoviesArray[i].name;

        document.getElementById("mov" + i).innerHTML = drieMoviesArray[i].name;
    }
}

//FUNCTIE OM 
//- JUISTE TE JUISTE ANTWOORDEN TE CONTROLEREN
//- CONFIRM CHOICE EN TRY AGAIN TONEN
//- PAGINA HERLADEN
//- BOLLETJESUNCTIE UITVOEREN
const juistFout = () => {
    let juisteKarakterAangeklikt = false; //Als deze twee variabelen globaal staan, kloppen de groene/rode bolletjes niet altijd. Dus hier laten staan.
    let juisteMovieAangeklikt = false;

    if (document.getElementById("char0").innerHTML === /*bijhorendKarakterNummer + " " + */ bijhorenKarakterNaam && document.getElementById("kar0").checked) { juisteKarakterAangeklikt = true; }
    else if (document.getElementById("char1").innerHTML === /*bijhorendKarakterNummer + " " + */ bijhorenKarakterNaam && document.getElementById("kar1").checked) { juisteKarakterAangeklikt = true; }
    else if (document.getElementById("char2").innerHTML === /*bijhorendKarakterNummer + " " + */ bijhorenKarakterNaam && document.getElementById("kar2").checked) { juisteKarakterAangeklikt = true; }

    if (document.getElementById("mov0").innerHTML === /* bijhorendMovieNummer + " " + */ bijhorendMovieNaam && document.getElementById("movie0").checked) { juisteMovieAangeklikt = true; }
    else if (document.getElementById("mov1").innerHTML === /* bijhorendMovieNummer + " " + */ bijhorendMovieNaam && document.getElementById("movie1").checked) { juisteMovieAangeklikt = true; }
    else if (document.getElementById("mov2").innerHTML === /* bijhorendMovieNummer + " " + */ bijhorendMovieNaam && document.getElementById("movie2").checked) { juisteMovieAangeklikt = true; }

    if (juisteKarakterAangeklikt === true && juisteMovieAangeklikt === true) { document.getElementById("answer").innerHTML = "JUIST"; }
    else if (juisteKarakterAangeklikt === true) { document.getElementById("answer").innerHTML = `De bijhorende film was ${bijhorendMovieNaam}`; }
    else if (juisteMovieAangeklikt === true) { document.getElementById("answer").innerHTML = `Het bijhorende karakter was ${bijhorenKarakterNaam}`; }
    else { document.getElementById("answer").innerHTML = `Het bijhorende karakter was ${bijhorenKarakterNaam} <br/> De bijhorende film was ${bijhorendMovieNaam}`; }

    if (bolnummer < 10) {
        setTimeout(() => { /*Ik ga ervan uit dat niemand sneller dan 1 seconde op de "confirm choice"-knop zal duwen. Anders zal het niet werken om "try again" te zien als dat wel zo is.*/
            document.getElementById("answer").innerHTML = "Confirm choice";
        }, 3000);
    }
    else if (bolnummer === 10) {
        localStorage.clear();

        setTimeout(() => {
            document.getElementById("answer").innerHTML = "Try again";
            document.getElementById("answer").className = "bt blink";
        }, 3000);
    }
    else { window.location.reload(); }

    kleurbol(juisteKarakterAangeklikt, juisteMovieAangeklikt); //Ik kan deze niet rechtsreeks in de confirmChoiceButtonfunctie zetten door de 2 variabelen die niet globaal staan.
}

//FUNCTIE DIE UITGEVOERD WORDT ALS ER OP DE CONFIRMKNOP GEKLIKT WORDT
//- VOERT ALLEEN ANDERE FUNCTIES UIT
const confirmChoiceButton = () => {
    juistFout();
    randomQuoteTonen();
    drieKaraktersTonen();
    drieMoviessTonen();
    uncheckRadioButtons();
}

//FUNCTIE OM 
//- HET SCOREBORD IN TE VULLEN MET GEKLEURDE BOLLETJES
//- SCORE TONEN NA 10 RONDES
const kleurbol = (a, b) => {
    if (a === true && b === true) {
        document.getElementById(bolnummer).style.backgroundColor = "green";
        total += 10;
    }
    else if (b === true) {
        document.getElementById(bolnummer).style.background = "linear-gradient(-90deg, green, green 50%, red 50% )";
        total += 5;
    }
    else if (a === true) {
        document.getElementById(bolnummer).style.background = "linear-gradient(-90deg, red, red 50%, green 50% )";
        total += 5;
    }
    else { document.getElementById(bolnummer).style.backgroundColor = "red"; }

    if (bolnummer === 10) { document.getElementById("quote").innerHTML = `Uw score is ${total}!`; }

    bolnummer++;
}

//FUNCTIE OM RADIOBUTTONS DE DESELECTEREN PER RONDE
uncheckRadioButtons = () => {
    let radioButtons = ["character", "movie"];

    for (let i = 0; i <= radioButtons.length - 1; i++) {
        const radioButton = document.querySelectorAll(`input[name=${radioButtons[i]}]`);
        for (const selection of radioButton) {
            if (selection.checked) {
                selection.checked = false;
            }
        }
    }
}



/*
//HULP-pagina
//FUNCTIE OM DE VORIGE BEZOCHTE PAGINA'S TE ONTHOUDEN
const back = () => { window.history.back() }
*/

//VOORBEELDEN VAN HOE OBJECTEN BINNENKOMEN BIJ FETCH:
/*
    1000 quotes
    _id: '5cd96e05de30eff6ebcce7e9',
    dialog: 'Deagol!',
    movie: '5cd95395de30eff6ebccde5d',
    character: '5cd99d4bde30eff6ebccfe9e'
*/

/*
    8 movies
    _id: '5cd95395de30eff6ebccde56',
    name: 'The Lord of the Rings Series',
*/

/*
     933 characters
     _id: '5cd99d4bde30eff6ebccfbbe',
     name: 'Adanel',
 */

