// using the fluid method in the videojs options
// source: https://www.tutorialspoint.com/creating-a-responsive-video-player-using-video-js
var player = videojs("my-video", {
  fluid: true,
});
// using the fluid method to the player reference
// creating using videojs
var player2 = videojs("my-video2");
player2.fluid(true);
player2.aspectRatio("16:9");
