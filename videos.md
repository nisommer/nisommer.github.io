---
layout: page
title: Videos
---

### Grasp control using EMG decoding and tactile sensors for active compliance 


The goal here is to complement the "**teleoperation**" mode of control (decoding joint angles from EMG sensors on the arm) with an **active compliance algorithm** which uses tactile sensors to maximize the contact in surface with the object, while controlling for contact forces.

EMG decoding: Katie Zhuang
<br>
Active compliance: Nicolas Sommer

The index and pinky fingers are mapped to the two fingers of the robotic hand (*the third finger of the robot is broken in this video*).


<!-- <iframe width="500" height="500" src="https://www.youtube.com/embed/wv5XozeIrUw" frameborder="0" allowfullscreen></iframe> -->



**In the video:** <a id="content"></a>
<br>
<a id="emg1" title="I"
 href="#content" onclick="seekToj(0);return false;">I) Teleoperation.</a>
<br>
<a id="emg2" title="II"
 href="#content" onclick="seekToj(27);return false;">II) Grasping with teleoperation only.</a>
<br>
<a id="emg3" title="III"
 href="#content" onclick="seekToj(38);return false;">III) Grasping with teleoperation and compliant control.</a>

<!-- ############## -->
<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->

<div id="player"></div>

<script>
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '500',
      width: '500',
      videoId: 'wv5XozeIrUw',
      // events: {
      //   'onReady': onPlayerReady,
      //   'onStateChange': onPlayerStateChange
      // }
    });
  }

 
  function seekToj(sec) {
    player.playVideo();
    player.seekTo(sec, true);
  }

</script>
<!-- ############## -->

This video demos an early prototype of the system.

---
### Externally Modulated Dynamical System (EMDS): 

Navigation between obstacles using *tactile sensing*, based on *demonstrations*:

<iframe width="800" height="450" src="https://www.youtube.com/embed/1W0VpyfakBI" frameborder="0" allowfullscreen></iframe>    

<br>
Comparison **with** and **without** the learned behaviour:
<iframe width="800" height="450" src="https://www.youtube.com/embed/Aiz3dUADcbw" frameborder="0" allowfullscreen></iframe>  


---

### `Page in progress, more videos will be added soon`

In the meantime, more videos can be found on my YouTube page: 
<!-- <a class="fa fa-youtube fa-fw sidebar-nav-item" href="{{ site.author.youtube }}">Videos</a> -->
<a class="sidebar-nav-item" href="{{ site.author.youtube }}"><i class="fa fa-youtube fa-fw" aria-hidden="true"></i>YouTube</a>

<!-- <a class="sidebar-nav-item" href="{{ site.author.youtube }}">Youtube page</a>  -->
