---
title: Pinhole and Dollhouse shaders for action RPG's
date: 2023-07-31
tags: [graphics, gamedev, godot]
layout: blog_post
image_url: "/assets/diablo.webp"
excerpt: Games such as diablo and various action RPG's with isometric or top-down cameras often fade out objects that are occluding any actors on screen. this effect can be achieved through a number of means, ray casting, depth testing, etc. In this article I go through several simple demos showing how to implement these features in a game using the godot engine.
---

<script lang="ts" setup>
    import GameContainer from '../.vitepress/theme/components/GameContainer.vue';
</script>

![diablo screen grab](/assets/diablo.webp)


Action rpg's use a few visual tricks to make their top down camera less frustrating. Today I'm going to focus on three methods of dollhousing, or turning objects inbetween the player and camera transparent. 

## Raycasting

The first way I'll be demonstrating to achieve this effect is by simply casting rays into the scene from the camera origin towards any actors and applying an effect to any collided objects. I've provided a sample [godot project with a rough implementation here](https://github.com/mobile-bungalow/TransparencyDemo1). You can play it in browser below. The method below was achieved with simple raycasting in a semi-circle from the camera to the player and with single raycasts towards NPCs, using logic to toggle the raycasting off if the you wish to hide the NPC. On Ray collision, an instance shader parameter is animated on the effect mesh.

<GameContainer mobile_compat="false" src="/game_packages/Demo_1_blog_1/index.html"/> 

### Common Augmentations and Issues

For Player characters often one ray will not be enough to provide sufficient spread for small clusters of props. In the example above the player Character projects three rays, two to the right and left of the original at a configurable radius. This leads us to a problem, A ray should only effect a surface if the player is on the other side of that surface. So how do we go about deciding whether or not the collision is on the same side of the collider as our player?

The answer is stupidly simple. Any points on the same side of a plane have the same sign when run through it's equation as defined by it's surface normal. 

![an explanatory graphic about the previous paragraph](/assets/asat.png)

We simply discard any collisions which fulfill the above criteria. This means that the ray collider for this type of scene must be a plane, you can likely get away with a box for shorter, stockier props such as colums or crates - but will encounter some unwanted dollhousing when approaching such objects from the front. another option is to use a plane that automatically orients towards the players location with a width reaching to the extent of the prop. 

## Z Cheating

This method involves doing a second pass with a depth shader, and simply redrawing all occluded actors in a bright color on top of the props. In my opinion, this is the not very immersive unless your game includes some aspect of x-ray vision or extra sensory perception, in which case it should be stylized to reflect that. An example is playable below.


<GameContainer mobile_compat="false" src="/game_packages/Demo_2_blog_1/index.html"/> 

### Common Augmentations and Issues

Besides being fairly immersion breaking, jumbles of things behind walls become hard to distinguish if all rendered in the same color. per instance color variables, distance falloff and matching the color to contrast with the environment are all important ways of making this technique less sloppy.


## Pinhole Shaders

Another option, often best combined with other methods, is the pinhole shader. This takes the screen space coordinates of all actors and passes them to the mesh shader, then any fragments in a circle (or any SDF compatible shape) are either discarded or have their alpha's appropriately attenuated. An example is playable below. 

<GameContainer mobile_compat="false" src="/game_packages/Demo_3_blog_1/index.html"/> 

### Common Augmentations and Issues

To support a large number of onscreen items you must pass the screen space coordinates in a texture. updating every frame. This is not prohibitively slow if you don't reallocate, but becomes complex if you want to include more data than just the position for each actor. In the example above the projected distance along the ground is also passed to the shader and used to scale the fading effect. additionally a radius, or fade strength flag could be passed in the alpha channel of the texture. which leads me to the largest downfall of this method, most of the dollhousable items on screen will be transparent most of the time! This is the case in battlerite, where the effect is used to remove ornaments from the scene, but so aggressively that those ornaments are almost never visible unless the effect is toggled off.

## Conclusion

Dollhousing techniques should probably be combined or used with conditional logic to provide a seemless isometric experience. There is a difficulty to balance inremoving items prom clogging up the viewport while simultaenously not breaking immersion by showing parts of the map the player character may not have access to. Used sparingly and accounting for many, many corner cases dollhousing can be a compelling way to make densley packed areas easily navigable by a player



