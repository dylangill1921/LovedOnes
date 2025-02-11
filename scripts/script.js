/*
Valentines Day Card
Name: Dylan Gill
File: index.html
Date: February 10, 2025
Description: Valentine's Day Card for my Girlfriend!
*/

/* Funtion to open the envelope */
const wrapper = document.querySelector(".wrapper");

wrapper.addEventListener("click", () => {
  wrapper.classList.toggle("open");
});

/* Funtion for the hearts to display and drop and multiply on the screen */
function hearts() {

  const container = document.querySelector('.container');

  const create = document.createElement('div');
  create.classList.add('love');
  create.innerHTML = '❤️';

create.style.left = Math.random() * window.innerWidth + 'px';
create.style.animationDuration = Math.random() * 3 + 2 + 's';
  
  container.appendChild(create)
  setTimeout(() => {
    create.remove();
  }, 3000);

}

setInterval(hearts, 100);

/* function to toggle visibility of images when button is clicked */
document.getElementById('showIMGS').addEventListener('click', function() {
  var container = document.getElementById('imageContainer');
  var images = document.querySelectorAll('#imageContainer img');

  // Toggle the visibility of the container
  if (container.style.display === 'none') {
      container.style.display = 'block'; 
      images.forEach(img => {
          img.style.display = 'block'; 
          img.style.opacity = '1'; 
      });
  } else {
      images.forEach(img => {
          img.style.opacity = '0'; 
      });
      // Hide the container after the fade-out animation completes
      setTimeout(() => {
          container.style.display = 'none';
      }, 1500); 
  }
});

/* Function for handling the background music */
document.addEventListener("DOMContentLoaded", function() {
  var playButton = document.getElementById('playButton');
  var stopButton = document.getElementById('stopButton');
  var audio = document.getElementById('backgroundMusic');

  playButton.addEventListener('click', function() {
      audio.play();
  });

  stopButton.addEventListener('click', function() {
      audio.pause();
      audio.currentTime = 0;
  });
});