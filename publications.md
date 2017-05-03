---
layout: page
title: Publications
---

Here are my publications in chronological order.
You can also find me on [google scholar](https://scholar.google.ch/citations?user=itb4r4gAAAAJ) or on the [LASA website]({{ site.author.lasa_profile }}).

### Journals

1. **Multi-contact haptic exploration and grasping with tactile sensors**
*Robotics and Autonomous Systems*, 2016.
Nicolas Sommer, Aude Billard.
[[PDF](/pubs/ras_2016.pdf)]

### Conferences

1. **Bimanual compliant tactile exploration for grasping unknown objects**
*ICRA*, 2014.
Nicolas Sommer, Miao Li, Aude Billard.
[[PDF](/pubs/icra_2014.pdf)]

1. **Stretchable capacitive tactile skin on humanoid robot fingers - first experiments and results**
*Humanoids*, 2014.
Aaron Gerratt, Nicolas Sommer, Stephanie Lacour, Aude Billard.
[[PDF](/pubs/humanoids_2014.pdf)]

1. **Face Classification Using Touch with a Humanoid Robot Hand**
*Humanoids*, 2012.
Nicolas Sommer, Aude Billard.
[[PDF](/pubs/humanoids_2012.pdf)]



### Thesis

**Multi-contact tactile exploration and interaction with unknown objects.**
Nicolas Sommer, May 19th, 2017
[[PDF](/pubs/main_electronic_sommer.pdf)]

**Abstract:**

Humans rely on the sense of touch in almost every aspect of daily life, whether to tie shoelaces, place fingertips on a computer keyboard or find keys inside a bag. 
With robots moving into human-centered environment, tactile exploration becomes more and more important as vision may be occluded easily by obstacles or fail because of different illumination conditions.
Traditional approaches mostly rely on position control for manipulating objects and are adapted to single grippers and known objects. 
New sensors make it possible to extend the control to tackle problems unsolved before: handling unknown objects and discovering local features on their surface. 
This thesis tackles the problem of controlling a robot which makes multiple contacts with an unknown environment. 
Generating and keeping multiple contacts points on different parts of the robot fingers during exploration is an essential feature that distinguishes our work from other haptic exploration work in the literature, where contacts are usually limited to one or more fingertips.

In the first part of this thesis, we address the problem of exploring partially known surfaces and objects for modeling and identification. 
In multiple scenarios, control and exploration strategies are developed to compliantly follow the surface or contour of a surface with robotic fingers.

Whereas the methods developed in the first part of this thesis perform well on objects with limited size and variation in shape, the second part of the thesis is devoted to the development of a controller that maximizes contact with unknown surfaces of any shape and size. 
Maximizing contact allows to gather information more rapidly and also to create stable grasps.
To this end, we develop an algorithm based on the task-space formulation to quickly handle the control in torque of an actively compliant robot while keeping constraints, particularly on contact forces. 
We also develop a strategy to maximize the surface in contact, given only the current state of contact, i.e. without prior information on the object or surface.

In the third part of the thesis, we develop a new way to teach robots how to react to sensing information while performing a task, by modulating Dynamical Systems (DS) using external signals.
We extend existing approaches to locally modulate DS to enable sensing-based modulation, so as to change the dynamics of motion depending on an external signal.
The problem of autonomous grasping using only tactile data is tackled using this algorithm.
We apply our approach by using the data collected from the tactile sensors with a particle filter for object state estimation, which is used to modulate the dynamics of the robot motion accordingly, changing from exploratory to grasping motions depending on task progress. 
This allows to generate fast and autonomous object localization and grasping in one flexible framework.
We also apply this algorithm to teach a robot how to react to collisions in order to navigate between obstacles while reaching.


