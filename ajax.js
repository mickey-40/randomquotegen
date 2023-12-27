const btn = document.querySelector(".get-quotes");

btn.addEventListener("click", getQuotes);

const number = document.getElementById("number");


function getQuotes(e) {
  e.preventDefault();

  if(number.value.length == 0){
    return alert("Please enter a number")
  } else {
    const http = new XMLHttpRequest();

    http.open("GET","https://type.fit/api/quotes", true);

    http.onload = function(){
      if (this.status === 200){
        // console.log(this.responseText);

        const response = shuffle(JSON.parse(this.responseText));

        let output = "";
        // response.forEach(quote => {
        //   output += `
        //     <li>Quote: ${quote.text}</li>
        //     <li>Author: ${quote.author}</li>
        //     <hr>
        //   `;
        // })
        for(let i = 0; i < response.length; i++){
          if(i == number.value){
            break;
          }
            output += `
              <li>Quote: ${response[i].text}</li>
              <li>Author: ${response[i].author}</li>
              <hr>
            `;
        }

        document.querySelector(".quotes").innerHTML = output;

      }
    }

  http.send();
  }

}

// function to shuffle the quotes

function shuffle(quotes){
  let CI = quotes.length, tempValue, randomIndex;

  // while elements exist in the array
  while (CI > 0){
    randomIndex = Math.floor(Math.random() * CI);
    // decrease CI by 1
    CI--;
    // swap the last element with CI
    tempValue = quotes[CI];
    quotes[CI] = quotes[randomIndex];
    quotes[randomIndex] = tempValue;
  }
  return quotes;
}