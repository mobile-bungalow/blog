---
title: Pinhole and Dollhouse shaders for action RPG's
date: 2023-08-01
tags: [graphics, gamedev, godot]
layout: blog_post
image_url: "/assets/diablo.webp"
excerpt: Games such as diablo and various action RPG's with isometric or top-down cameras often fade out objects that are occluding any actors on screen. this effect can be achieved through a number of means, ray casting, depth testing, etc. In this article I go through several simple demos showing how to implement these features in a game using the godot engine.
---
<script lang="ts" setup>
    import GameContainer from '../.vitepress/theme/components/GameContainer.vue';
</script>

![diablo screen grab](/assets/diablo.webp)
<p class=fig_caption>Behold, time waster of the early 00's</p>


3D Action rpg's use a few visual tricks to make their top down camera less frustrating. Often times actors are occluded by static objects in a scene, forcing the game designer to make decisions about how to indicate the player position. I've collected a few simple methods that can be composed and modified to suit most action rpg requirements. The methods I've picked are generalizable to multiple, dynamic, camera angles and require very little scene preparation and scripting to be leveraged effectively.

## Ray Casting

One solution is to check if a ray cast between the player and camera intersects any props, and then reducing the opacity on those props through a variable passed into their materials. This is a simple and inexpensive operation in most game engines. I've provided a sample [godot project with a rough implementation here](https://github.com/mobile-bungalow/TransparencyDemo1). You can play it in 
browser below.

<GameContainer :mobile_compat=false src="/game_packages/Demo_1_blog_1/index.html"/> 

This method is fraught, however. One ray is often times not enough for an oddly shaped player character. [Shape casting](https://docs.godotengine.org/en/stable/classes/class_shapecast3d.html) or casting multiple rays in an enclosing shape provides a superior player experience. But like most programming problems - edge cases arise.

With a third person fixed camera it is virtually ensured that any collision between the camera and player represents an occlusion. However Rays cast around the player do not have the same guarantee. They can collide with non occluding props at broad angles, creating false positives.

<div class="row">
<img src='/assets/single_cast.png'>
<img src='/assets/multi.png'>
</div>

To solve this we need to employ some logic to determine whether or not a collision point is on the same side of the prop as the actor. 

![an explanatory graphic about the previous paragraph](/assets/asat.png)

We simply discard any collisions which fulfill the above criteria. This means that the ray collider for this type of scene must be a plane, you can likely get away with a box for shorter, stockier props such as columns or crates - but will encounter some unwanted doll housing when approaching such objects from the front. 

The ray casting method also requires a lot of logic for non-player characters and items which should be optionally show to the player based on their occlusion state. This method  really only works reliably with fixed, third person camera angles and requires an unsustainable amount of edge case logic in most other scenarios to provide a reliably polished feel. Some potential edge cases exclude from ray casting:

 - The actor is outside of the camera clip.
 - The actor is not occluded by the prop, but the ray cast clips it because you have a wide field of view configured.
 - You want the actor to be hidden inside certain structures, or only when the player is outside of a certain structure.


## X-Ray Vision

Another method involves doing a second pass with a depth sensitive shader, and simply redrawing all occluded actors in a bright color on top of the props. In my opinion, this is the not very immersive unless your game includes some aspect of x-ray vision or extra sensory perception, in which case it should be stylized to reflect that. An example is playable below with the [source code linked here](https://github.com/mobile-bungalow/TransparencyDemo1/tree/x-ray).


<GameContainer :mobile_compat=false src="/game_packages/Demo_2_blog_1/index.html"/> 

The shader code for such and effect is simple, add a second pass to any material you wish to display and discard fragments which are occluded by the depth pass. see the following.

```glsl
shader_type spatial;
render_mode blend_mix, depth_test_disabled, unshaded;

uniform sampler2D depth_texture : source_color, hint_depth_texture;

void fragment () {
  // the depth the character pixel would be drawn at
	float z = FRAGCOORD.z;
	// the depth of the pixel from the previous render pass that 
	// was closest to the screen
	float depth = texture(depth_texture, SCREEN_UV).x;
	// if that is the character pixel or something behind it 
	// then NOP out. You should probably threshold your difference here.
	if (z <= depth ) discard;
	// if the character pixel is occluded render it in bright yellow.
	ALBEDO = vec3(1.0, 1.0, 0.0);
}
```
It's important to note that the depth texture is non linear! For far away objects you should multiply both the depth texture Z and your fragcoord Z by some large number, or define a threshold value which the difference must exceed or else be subject to floating point error. 


## Pinhole Shaders

Another option, often best combined with other methods, is a pinhole shader. This takes the screen space coordinates of all actors and passes them to the mesh shader, then any fragments in a circle (or any SDF compatible shape) are either discarded or have their alpha's appropriately attenuated. An example is playable below [with source available here](https://github.com/mobile-bungalow/TransparencyDemo1/tree/pinhole). 

<GameContainer :mobile_compat=false src="/game_packages/Demo_3_blog_1/index.html"/> 

### Common Augmentations and Issues

To support a large number of onscreen items you must pass the screen space coordinates in a texture. updating every frame. This is not prohibitively slow if you don't reallocate the texture to support tons of actors, but becomes complex if you want to include more data than just the position for each actor. Here is some example code of brute forcing this info into a texture. In game engines where [SSBO's](https://www.khronos.org/opengl/wiki/Shader_Storage_Buffer_Object) are exposed you should use those instead, but this is the cursed Godot method.

```gdscript
extends Node3D

var OnScreenActors: int = 0
var ActorImage: Image
var ActorCoordsTex: ImageTexture
@onready var CameraWorld = $"%Camera3D"

# assuming we will only ever have 255 actors on screen at once
const TEXWIDTH : int = 255

func _ready():
  # create a data texture to write screen space positions into
	ActorImage = Image.create(TEXWIDTH, 1, false, Image.FORMAT_RGBAF)
	ActorCoordsTex = ImageTexture.new()
	ActorCoordsTex.set_image(ActorImage)
	# create a globally accesible shader variable indicating how many actors to pull from the data texture.
	RenderingServer.global_shader_parameter_set("max_actors_on_screen", TEXWIDTH)

# loop over all actors, packing their positions into the
# data texture
func _update_shader_params():
	var actors = get_tree().get_nodes_in_group("actors")	
	OnScreenActors = actors.size()
	var skipped = 0;
	for i in actors.size():
		var body = actors[i]
		if (body is NPC && body.is_inside_hidden):
			skipped += 1
			continue;
		var sp = CameraWorld.unproject_position(body.global_position)
		# red is x, blue is y, green and alpha can smuggle other data if needed
		ActorImage.set_pixel(i - skipped, 0, Color(sp.x, sp.y, 0))
	
	ActorCoordsTex.update(ActorImage)
	RenderingServer.global_shader_parameter_set("screen_fade_coords", ActorCoordsTex)
	RenderingServer.global_shader_parameter_set("run_length", OnScreenActors - skipped)

func _process(_delta):
	_update_shader_params()

```

Then in your material for any props that should occlude actors run a screen space distance check.


```glsl
// ... other fragment shader logic
for (int i = 0; i < run_length; i++) {
	// target texel center
	// max_onscreen is the texture width and max data length
	vec2 pixel_coords = vec2(float(i) + .5, 0.5) / float(max_actors_on_screen);
	// data texture mapped from ActorImage
	vec4 char_coord = texture(data_texture, pixel_coords);

	dist = length(char_coord.xy - FRAGCOORD.xy);
	// Choose some arbitrary radius to discard around
	if (dist > 10.0 ) discard;

}		
			
```

 The largest problem with this method is that most of the scene is transparent unless it is combined with some other form of occlusion checking. This is the case in Battlerite, where the effect is used to remove ornaments from the scene, but so aggressively that those ornaments are almost never visible unless the effect is toggled off. This effect is best reserved for small props such as flags or awnings that are purely visual, as it is hard to garner the fine grained control you can over the other methods.

## Conclusion

Doll housing techniques should probably be combined or used with conditional logic to provide a seamless isometric experience. There is a difficulty to balance in removing items prom clogging up the view port while simultaneously not breaking immersion by showing parts of the map the player character may not have access to. Used sparingly and accounting for many, many corner cases doll housing can be a compelling way to make densely packed areas easily navigable by a player
