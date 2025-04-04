// WELCOME SECTION -------------

// svg for fusion animation
gsap.to(".line1", {
    duration: 3,
    attr: { d: "M 0 100 Q 250 150, 500 100 T 1000 120" },
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

gsap.to(".line2", {
    duration: 3,
    attr: { d: "M 0 120 Q 250 90, 500 140 T 1000 130" },
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});
// HEADER SECTION ------------------------------------

// hamburger menu, screens < 768px, on click

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navigation-list");

hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
});

// FOOTER --------------------------------------------

// footer buttons, screens < 768, on click

const accoBtns = document.querySelectorAll(".accordionBtn");
// func to update status of aria hidden in footer
function updateAriaVisibility() {
  accoBtns.forEach((btn) => {
    if (window.innerWidth < 768) {
      btn.removeAttribute("aria-hidden"); // attr hidden removed
      btn.setAttribute("aria-expanded", "false"); // panel closed
    } else {
      btn.setAttribute("aria-hidden", "true"); // > 768px ignore
    }
  });
}
// initialized at site load & when site is resized 
updateAriaVisibility();
window.addEventListener("resize", updateAriaVisibility);

// click func for footer accordion
accoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling.querySelector(".panel");
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    panel.style.display = isExpanded ? "none" : "block";
  });
});

// MENU SECTION --------------------------

// add event for: play video only on hover

const videos = document.querySelectorAll('.video');
videos.forEach(video => {
  video.addEventListener('mouseenter', function() {
    video.play(); // start
  });

  video.addEventListener('mouseleave', function() {
    video.pause(); // pause
  });
});

// play button for mobile 
document.querySelectorAll(".playBtn").forEach(button => {
  button.addEventListener("click", function() {
      let video = this.previousElementSibling; 
      
      if (video && video.tagName === "VIDEO") {
          video.play();
          this.style.display = "none"; // only this button hidden
      }
  });
});

// func show playBtn on screen < 768px

function updatePlayBtnVisibility() {
  const playBtns = document.querySelectorAll(".playBtn");
  if (window.innerWidth < 768) {
      playBtns.forEach(btn => btn.removeAttribute("aria-hidden"));
  } else {
      playBtns.forEach(btn => btn.setAttribute("aria-hidden", "true"));
  }
}

// initialised on site load & when window is resized
updatePlayBtnVisibility();
window.addEventListener("resize", updatePlayBtnVisibility);

// CONTACT US SECTION ------------------------------

// FORM - function validate value guest number

function checkNumGuests() {
  // parseInt converts to whole numbers -> no decimals allowed
  let numberG = parseInt(document.getElementById("numGuests").value);
  console.log(numberG); // delete when working
  if(numberG >= 1 && numberG <= 25){
    return true;
  }
  else {
    alert("Please enter valid number of guests 1 -25.")
    return false;
  }
}
// function validate date and time

function validDateAndTime () {
  let reserveD = document.getElementById("resDate").value;
  console.log(reserveD); // delete when working
  
  // get value from date input & convert to object
  let inputDate = new Date(document.getElementById("resDate").value);
  // check if date is valid
  if (isNaN(inputDate.getTime())) { // getTime() method
    alert("The entered date is invalid.");
    return false;
  }
  let currentDate = new Date(); // current Date is empty object
  currentDate.setHours(0,0,0,0); // sets time to midnight

  if(inputDate < currentDate){ // entered date is in the past
    alert("Please choose a valid date.");
    return false;
  }
  
  if(inputDate.getDay() === 1){   // 1 = Monday, 2 = Tuesday, monday (closed day)
    alert("The Restaurant is closed on Mondays.");
    return false;
  }
  // validate for correct minute value

  let timeValue = document.getElementById("timeRes").value; // get value
  console.log(timeValue);
  if (!timeValue) { // check if timeValue is empty
    alert("Please select a valid time.");
    return false;
  } 
  let [hours, minutes] = timeValue.split(":");

  console.log("Hours:", hours); // log hours
  console.log("Minutes:", minutes); // log minutes

  // validate hours between 0-23
  if (parseInt(hours) < 0 || parseInt(hours) > 23) {
    alert("Bitte geben Sie eine gültige Stunde (0-23) ein.");
    return false;
  }

  // validate minutes between 0-59
  if (parseInt(minutes) < 0 || parseInt(minutes) > 59) {
    alert("Bitte geben Sie gültige Minuten (0-59) ein.");
    return false; // Stop function if invalid
  }

  // define time: opening & close hours

  let firstOpenTime = new Date(inputDate); // tuesday - thur
  firstOpenTime.setHours(11,0,0,0);  

  let firstCloseTime = new Date(inputDate); // tuesday - thur
  firstCloseTime.setHours(23,0,0,0);

  let secondOpenTime = new Date(inputDate); // fri - sun
  secondOpenTime.setHours(14,0,0,0);

  let secondCloseTime = new Date(inputDate);
  secondCloseTime.setHours(23,59,59,999); // close to midnight

  let closeAfterMidnight = new Date(inputDate);
  closeAfterMidnight.setDate(closeAfterMidnight.getDate()+1);
  closeAfterMidnight.setHours(1,0,0,0);

  console.log("First Open Time: ", firstOpenTime);
  console.log("First Close Time: ", firstCloseTime);
  console.log("Second Open Time: ", secondOpenTime);
  console.log("Second Close Time: ", secondCloseTime);

  // check if input time is within opening hours
  let timeComparison = new Date(inputDate);
  timeComparison.setHours(hours, minutes, 0, 0); // set input time

  console.log("Time Comparison: ", timeComparison); // control log

  if (
    (timeComparison >= firstOpenTime && timeComparison <= firstCloseTime) ||
    (timeComparison >= secondOpenTime && timeComparison <= secondCloseTime)
  ) {
    return true; // valid reservation time
    }
    else {
      alert("Please choose a time within our opening hours.");
      return false; 
    }
}

// function: on submit calls helper functions to check correct input

document.getElementById("details").addEventListener("submit", function(event) {
  event.preventDefault(); //prevents default behavior of sending

  let guests = checkNumGuests(); // functions not directly in if  
  let dateTime = validDateAndTime(); // -> variable

  if(guests === true && dateTime === true) {
    document.getElementById("message").style.display = "block";
    setTimeout(() => {
      document.getElementById("message").style.display = "none";
  }, 5000);
  }
  document.getElementById("details").reset();
  
});

// FAB functions ------------------------------------------

window.addEventListener('scroll', function() {
  let header = document.querySelector('header');
  let backToTop = document.getElementById('backToTop');
  let contactBtn = document.getElementById('contactBtn');

  // checks if header is out of viewport
  if (window.scrollY > header.offsetHeight) {
    backToTop.classList.add('show'); // if yes -> show
    contactBtn.classList.add('show');
  } else {
    backToTop.classList.remove('show'); //if no -> hide/remove
    contactBtn.classList.remove('show');
  }
});

// function to scroll back to top on click
document.getElementById('backToTop').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// sends mail on click
document.getElementById('contactBtn').addEventListener('click', function() {
  window.location.href = 'mailto:cstoll2006@gmail.com';  // example email
});




