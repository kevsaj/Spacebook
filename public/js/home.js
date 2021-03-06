const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const btnWeatherSearch = document.querySelector('#weatherSearch');

$(document).ready(() => {
  // Javascript for the Hamburger toggle menu
  btnHamburger.addEventListener('click', () => {
    console.log('click hamburger');

    if (header.classList.contains('open')) { // Close Hamburger Menu
      body.classList.remove('noscroll');
      header.classList.remove('open');
      fadeElems.forEach((element) => {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
      });

    }
    else { // Open Hamburger Menu
      body.classList.add('noscroll');
      header.classList.add('open');
      fadeElems.forEach((element) => {
        element.classList.remove('fade-out');
        element.classList.add('fade-in');
      });
    }
  });

  $.get("/api/user_data").then(user => {
    $("#name-top-right").text(user.first_name);
  });

  const postButton = document.getElementById("post-button");
  const postTitle = document.getElementById("post-title")
  const postText = document.getElementById("post-body");
  postButton.addEventListener("click", (e) => {
    e.preventDefault();
    const postObj = {
      title: postTitle.value.trim(),
      body: postText.value.trim(),
    }

    fetch("/posts", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj)
    }).then((response) => {
      console.log(response)
      location.reload();
    }).catch(err => {
      console.log(err)
    })
  })
})

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded! 🚀");


  const deleteButtons = document.querySelectorAll(".delete-button")
  if (deleteButtons) {
    $.get("/api/user_data").then(user => {
      const userId = user.id;
      deleteButtons.forEach((button) => {
        if (button.getAttribute("data-UserId") == userId) {
          console.log(userId)
          button.classList.remove("hidden");
        }
        button.addEventListener("click", (e) => {
          console.log(e.target)
          const postId = e.target.getAttribute("data-id");
          console.log("clicked", postId)
          fetch("/delete_post/" + postId, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((res) => {
            location.reload()
          })
        })
      })
    });
    
  }

  const profileButton = document.getElementById("profile-button");
  profileButton.addEventListener("click", (e) => {
    e.preventDefault();
    $.get("/api/user_data").then(user => {
      location.replace("/user/" + user.id);
    });

  })

  const postButton = document.getElementById("post-button");
  const postText = document.getElementById("about");
  postButton.addEventListener("click", (e) => {
    e.preventDefault();
    const postObj = {
      title: "Title",
      body: postText.value.trim(),
    }

    fetch("/posts", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj)
    }).then((response) => {
      console.log(response)
      location.reload();
    }).catch(err => {
      console.log(err)
    })
  })
})
var weatherSearch = document.getElementById("weatherSearch");
var input = document.getElementById("city-name");
    $(input).keypress(function (e) { 
        var key = e.which;
        if(key == 13) {
            weatherSearch.click();
        }
    });
//This function initiates the process of collecting the data from "The Weather APIs" to display on the page 
$("#weatherSearch").on("click", function () {
  const inputCityName = document.getElementById("city-name");
  cityPost = inputCityName.value.trim();
  $.get("/weather/" + cityPost).then(result => {
    $("#current-city").text(JSON.stringify(result.name));
    $("#temperature").text(JSON.stringify(result.temperature));
    $("#humidity").text(JSON.stringify(result.humidity));
    $("#windspeed").text(JSON.stringify(result.windspeed));
    inputCityName.value = "";
  });
    // console.log(weather)
    // const cityName = document.getElementById("current-city");
    // cityName.textContent = result;
    // const cityTemp = document.getElementById("temperature");
    // cityTemp.textContent = result;
    // const cityHumid = document.getElementById("humidity");
    // cityHumid.textContent = result;
    // const cityWind = document.getElementById("windspeed");
    // cityWind.textContent = result;
    // location.reload();
})