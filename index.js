var form = document.querySelector("form");

function query() {
  event.preventDefault();
  let keyword = form.movieQuery.value;
  loadMovie(keyword);
  form.movieQuery.value = null;
}

async function loadMovie(keyword) {
  const URL = await fetch(
    `http://www.omdbapi.com/?s=${keyword}&page=1&apikey=cd31925c`
  );
  const data = await URL.json();

  if (data.Response === "True") {
    // Sending to the main DOM constructor
        buildPage(data.Search);
    }
  else {
    // Watch the design inspiration from Streaming platforms
    // Use HTML DOM to show the error in animated format
    document.getElementById("container").innerHTML = null;
    let result = document.createElement("div");
    result.setAttribute("id", "error");
    let imge = document.createElement("img");
    imge.src = "https://i.giphy.com/media/14uQ3cOFteDaU/giphy.webp";
    result.append(imge);
    document.getElementById("container").append(result);
  }
}

//LET'S DESIGN THE DOM CONSTRUCTOR
function buildPage(movies) {
  document.getElementById("container").innerHTML = null;
  movies.map(function (ele) {
    let data;
    let x = ele.imdbID;

    async function fetchRatings(x) {
      const sent = await fetch(
        `http://www.omdbapi.com/?apikey=cd31925c&i=${x}`
      );
      data = await sent.json();

      // LET'S BUILD THE HTML DOM
      let box = document.createElement("div");
      box.setAttribute("class", "box reveal");

      let imgBox = document.createElement("div");
      imgBox.setAttribute("class", "imgBox");
      let img = document.createElement("img");
      if (ele.Poster == "N/A") {
        img.src =
          "./MovieBuzz.png";
        img.style.filter = 'none'
      } else {
        img.src = ele.Poster;
      }
      imgBox.append(img);

      let content = document.createElement("div");
      content.setAttribute("class", "contentBox");

      let ctBox = document.createElement("div");
      content.append(ctBox);

      let name = document.createElement("h2");      
      name.textContent = ele.Title;

      let holder = document.createElement("div");
      holder.setAttribute("class", "holder");

      let release = document.createElement("p");
      let i2 = document.createElement('i');
      i2.setAttribute('class', 'fa-solid fa-calendar')
      let sp2 =  document.createElement('span');
      let sp22 = document.createElement('span'); 
      sp2.textContent =  "Release : " ; 
      sp22.textContent = data.Released; 
      release.append(i2, sp2, sp22)

      let time = document.createElement("p"); 
      let i3 = document.createElement('i');
      i3.setAttribute('class', 'fa-solid fa-clock')
      let sp3 =  document.createElement('span');
      let sp33 = document.createElement('span'); 
      sp3.textContent =  "Duration : " ; 
      sp33.textContent = data.Runtime; 
      time.append(i3, sp3, sp33)
      holder.append(release, time);

      let carrier = document.createElement("div");
      carrier.setAttribute("class", "carrier");
      let genre = document.createElement("p");
      let i4 = document.createElement('i'); 
      i4.setAttribute('class', 'fa-solid fa-film') 
      let sp4 =  document.createElement('span');
      let sp44 = document.createElement('span'); 
      sp4.textContent =  "Genre : "  ; 
      sp44.textContent = data.Genre; 
      genre.append(i4, sp4, sp44)

      let country = document.createElement("p");
      let i5 = document.createElement('i');
      i5.setAttribute('class', 'fa-solid fa-earth-africa')
      let sp5 =  document.createElement('span');
      let sp55 = document.createElement('span'); 
      sp5.textContent =  "Country : "   ; 
      sp55.textContent =  data.Country; 
      country.append(i5, sp5, sp55)
      carrier.append(genre, country);

      let actors = document.createElement("p"); 
      let i6 =  document.createElement('i');
      i6.setAttribute('class', 'fa-solid fa-user')
      let sp6 =  document.createElement('span');
      let sp66 = document.createElement('span'); 
      sp6.textContent =  "Actors : "  ; 
      sp66.textContent =  data.Actors; 
      actors.append(i6, sp6, sp66)

      let plot = document.createElement("p");
      let i7 =  document.createElement('i');
      i7.setAttribute('class', 'fa-solid fa-book')
      let sp7 =  document.createElement('span');
      let sp77 = document.createElement('span'); 
      sp7.textContent =  "Plot : "   ; 
      sp77.textContent =  data.Plot; 
      plot.append(i7 ,sp7, sp77)

      let lang = document.createElement("p");
      let i8 =  document.createElement('i');
      i8.setAttribute('class', 'fa-solid fa-language')
      let sp8 =  document.createElement('span');
      let sp88 = document.createElement('span'); 
      sp8.textContent = "Language : "  ; 
      sp88.textContent =  data.Language; 
      lang.append(i8, sp8, sp88)

      let writers = document.createElement("p");
      let i9 = document.createElement('i');
      i9.setAttribute('class', 'fa-solid fa-marker')
      let sp9 =  document.createElement('span');
      let sp99 = document.createElement('span'); 
      sp9.textContent = "Writers : "  ; 
      sp99.textContent =  data.Writer; 
      writers.append(i9, sp9, sp99)

      let awards = document.createElement("p");
      let i10 = document.createElement('i');
      i10.setAttribute('class', 'fa-solid fa-award')
      let sp10 =  document.createElement('span');
      let sp101 = document.createElement('span'); 
      sp10.textContent = "Awards : "   ; 
      sp101.textContent =  data.Awards; 
      awards.append(i10,sp10, sp101)

      let ratings = document.createElement("p");
      let i12 = document.createElement('i');
      i12.setAttribute('class', 'fa-solid fa-thumbs-up');
      let sp12 =  document.createElement('span');
      let sp122 = document.createElement('span'); 
      sp12.textContent = "Ratings : "  ; 
      sp122.textContent =  data.imdbRating + ' ★★★'; 
      ratings.append(i12, sp12, sp122)

      if (data.imdbRating > 8.5) {
        let recommend = document.createElement("h4");
        recommend.textContent = "Recommended";
        recommend.setAttribute("class", "recommendation");

        ctBox.append(
          name,
          holder,
          carrier,
          actors,
          plot,
          lang,
          writers,
          awards,
          ratings,
          recommend
        );
      } else {
        ctBox.append(
          name,
          holder,
          carrier,
          actors,
          plot,
          lang,
          writers,
          awards,
          ratings
        );
      }

      content.append(ctBox);

      box.append(imgBox, content);

      document.getElementById("container").append(box);
    }
    fetchRatings(x);
  });
}

function refresh() {
  window.location.reload();
}
