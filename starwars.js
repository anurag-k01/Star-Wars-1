// `http://www.omdbapi.com/?s=${querryy}&apikey=e2dc73e1`
let movies_div = document.getElementById("movies");

var timerId;
async function searchMovies() {
  let querryy = document.getElementById("query").value;
  if (querryy.length <= 0) {
    return false;
  } else {
    let res = await fetch(`https://swapi.dev/api/people/?search=${querryy}`);
    let data = await res.json();
    console.log(data);
    return data.results;
  }
}
function throttleFunction() {
  if (timerId) {
    return false;
  }

  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 1000);
}

function appendMovies(d) {
  movies_div.innerHTML = null;
  let print_div = document.createElement("div");
  print_div.style.background = "rgb(45,47,48)";
  print_div.style.paddingTop = "30px";
  print_div.style.paddingLeft = "10px";
  print_div.style.paddingBottom = "10px";
  print_div.style.paddingRight = "10px";
  print_div.style.borderRadius = "0px 0px 20px 20px";

  d.forEach(({ name, gender, birth_year }) => {
    let search_div = document.createElement("div");
    let p = document.createElement("span");
    p.style.color = "yellow";
    p.innerText = name;
    let g = document.createElement("span");
    g.style.color = "gray";
    let year = document.createElement("p");
    year.style.color = "gray";
    year.setAttribute("class", "year");
    year.innerText = birth_year;
    g.setAttribute("class", "genderr");

    g.innerText = gender;
    search_div.addEventListener("mouseover", function () {
      search_div.style.background = "Yellow";
      p.style.color = "black";
      g.style.color = "black";
      year.style.color = "black";
    });
    search_div.addEventListener("mouseout", function () {
      search_div.style.background = "rgb(45,47,48)";
      p.style.color = "Yellow";
      g.style.color = "gray";
      year.style.color = "gray";
    });
    search_div.append(p, g, year);
    print_div.append(search_div);
    movies_div.append(print_div);
  });
}

async function main() {
  let moviess = await searchMovies();
  appendMovies(moviess);
}
