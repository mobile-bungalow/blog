GDPC                0                                                                         T   res://.godot/exported/133200997/export-24b8ba76a47820369429766a537f359e-img_temp.res             R�F�OqI�B���fIl�    P   res://.godot/exported/133200997/export-3070c538c03ee49b7677ff960a3f5195-main.scnP      �^      =��?��3����n��    T   res://.godot/exported/133200997/export-bf6024a317b3832b39f8221d1604ebc0-party.res   �}      �      �̱b&ڏDjF��	�    ,   res://.godot/global_script_class_cache.cfg   �      p      K�D/OV�n�o�>��    D   res://.godot/imported/icon.svg-218a8f2b3041327d8a5756f3a245f83b.ctex�	      ^      2��r3��MgB�[79       res://.godot/uid_cache.bin  �      t       �$�^��X�i��?1�
       res://BoxDemo.gd        Z      �G�:�1y��7       res://NPC.gd |      J      �/�Vl�����Q       res://Obstacle.gd   P}      b       �i�����b�z����1       res://Player.gd �      �	      g���B�D�?(��       res://dissolve.gdshader `      �      74>�j��侶��T�       res://icon.svg  ��      N      ]��s�9^w/�����       res://icon.svg.import   P      �       P.h��EO�x�z        res://img_temp.tres.remap   Л      e       ]����9��*j�p�0R       res://main.gd         5      �_˚ހy4��Z       res://main.tscn.remap   @�      a       �J�Sw� ������       res://party.tres.remap  ��      b       D"+��%���&�����       res://pinhole.gdshader  ��      H       ��̓�&�VͲ
��LQ       res://project.binary`�      �      ��6��,�޶�^<:!       res://z_cheat.gdshader  Џ      �      T�`�#OcԚԐ����/    A������extends Node3D

@onready var area : Area3D = $"Vis"
@onready var decal : Decal = $"Decal"
var inside = []
var player_in_room = false;
# Called when the node enters the scene tree for the first time.

func body_exited(b):
	if (b is player):
		decal.show()
		player_in_room = false;
		for item in inside:
			item.hide()
			item.is_inside_hidden = true;
	if (b is NPC):
		b.is_inside_hidden = false;
		inside.remove_at(inside.find(b))
		if (!player_in_room):
			b.show()


func body_entered(b):
	if (b is player):
		decal.hide()
		player_in_room = true;
		for item in inside:
			item.show()
			item.is_inside_hidden = false;
	if (b is NPC):
		b.is_inside_hidden = true;
		inside.push_back(b)
		if (!player_in_room):
			b.hide()


func _ready():
	area.body_entered.connect(body_entered)
	area.body_exited.connect(body_exited)
	pass # Replace with function body.
ӝ-K�Rshader_type spatial;
render_mode blend_mix, depth_prepass_alpha, depth_draw_opaque, cull_back, diffuse_burley,specular_schlick_ggx;

uniform vec4 albedo : source_color;
uniform sampler2D texture_albedo : source_color,filter_linear_mipmap,repeat_enable;
uniform float point_size : hint_range(0,128);
uniform float roughness : hint_range(0,1);
uniform sampler2D texture_metallic : hint_default_white,filter_linear_mipmap,repeat_enable;
uniform vec4 metallic_texture_channel;
uniform sampler2D texture_roughness : hint_roughness_r,filter_linear_mipmap,repeat_enable;
uniform float specular;
uniform float metallic;
uniform vec3 uv1_scale;
uniform vec3 uv1_offset;
uniform vec3 uv2_scale;
uniform vec3 uv2_offset;

uniform sampler2D emission_color;

uniform sampler2D noise_texture;
instance uniform float fade : hint_range(0,1) = 1;

void vertex() {
	UV=UV*uv1_scale.xy+uv1_offset.xy;
}

void fragment() {
	vec2 base_uv = UV;
	vec4 albedo_tex = texture(texture_albedo,base_uv);
	
	float sample = texture(noise_texture, UV).r;
	float fade_i  = 1.0 - fade;
	ALPHA = sample < fade_i ? 0.0 : 1.0;
	float emission_value = 1.0 - smoothstep(fade_i, fade_i * 1.2, sample);
	EMISSION = emission_value * texture(emission_color, vec2(fade_i, 1)).rgb;
	
	// add black rim
	ALBEDO = emission_value > 0.0001 ? vec3(0): albedo.rgb * albedo_tex.rgb;
	float metallic_tex = dot(texture(texture_metallic,base_uv),metallic_texture_channel);
	METALLIC = metallic_tex * metallic;
	vec4 roughness_texture_channel = vec4(1.0,0.0,0.0,0.0);
	float roughness_tex = dot(texture(texture_roughness,base_uv),roughness_texture_channel);
	ROUGHNESS = roughness_tex * roughness;
	SPECULAR = specular;

}

��/Y�{��LXGST2   �   �      ����               � �        &  RIFF  WEBPVP8L  /������!"2�H�l�m�l�H�Q/H^��޷������d��g�(9�$E�Z��ߓ���'3���ض�U�j��$�՜ʝI۶c��3� [���5v�ɶ�=�Ԯ�m���mG�����j�m�m�_�XV����r*snZ'eS�����]n�w�Z:G9�>B�m�It��R#�^�6��($Ɓm+q�h��6�4mb�h3O���$E�s����A*DV�:#�)��)�X/�x�>@\�0|�q��m֋�d�0ψ�t�!&����P2Z�z��QF+9ʿ�d0��VɬF�F� ���A�����j4BUHp�AI�r��ِ���27ݵ<�=g��9�1�e"e�{�(�(m�`Ec\]�%��nkFC��d���7<�
V�Lĩ>���Qo�<`�M�$x���jD�BfY3�37�W��%�ݠ�5�Au����WpeU+.v�mj��%' ��ħp�6S�� q��M�׌F�n��w�$$�VI��o�l��m)��Du!SZ��V@9ד]��b=�P3�D��bSU�9�B���zQmY�M~�M<��Er�8��F)�?@`�:7�=��1I]�������3�٭!'��Jn�GS���0&��;�bE�
�
5[I��=i�/��%�̘@�YYL���J�kKvX���S���	�ڊW_�溶�R���S��I��`��?֩�Z�T^]1��VsU#f���i��1�Ivh!9+�VZ�Mr�טP�~|"/���IK
g`��MK�����|CҴ�ZQs���fvƄ0e�NN�F-���FNG)��W�2�JN	��������ܕ����2
�~�y#cB���1�YϮ�h�9����m������v��`g����]1�)�F�^^]Rץ�f��Tk� s�SP�7L�_Y�x�ŤiC�X]��r�>e:	{Sm�ĒT��ubN����k�Yb�;��Eߝ�m�Us�q��1�(\�����Ӈ�b(�7�"�Yme�WY!-)�L���L�6ie��@�Z3D\?��\W�c"e���4��AǘH���L�`L�M��G$𩫅�W���FY�gL$NI�'������I]�r��ܜ��`W<ߛe6ߛ�I>v���W�!a��������M3���IV��]�yhBҴFlr�!8Մ�^Ҷ�㒸5����I#�I�ڦ���P2R���(�r�a߰z����G~����w�=C�2������C��{�hWl%��и���O������;0*��`��U��R��vw�� (7�T#�Ƨ�o7�
�xk͍\dq3a��	x p�ȥ�3>Wc�� �	��7�kI��9F}�ID
�B���
��v<�vjQ�:a�J�5L&�F�{l��Rh����I��F�鳁P�Nc�w:17��f}u}�Κu@��`� @�������8@`�
�1 ��j#`[�)�8`���vh�p� P���׷�>����"@<�����sv� ����"�Q@,�A��P8��dp{�B��r��X��3��n$�^ ��������^B9��n����0T�m�2�ka9!�2!���]
?p ZA$\S��~B�O ��;��-|��
{�V��:���o��D��D0\R��k����8��!�I�-���-<��/<JhN��W�1���(�#2:E(*�H���{��>��&!��$| �~�+\#��8�> �H??�	E#��VY���t7���> 6�"�&ZJ��p�C_j����	P:�~�G0 �J��$�M���@�Q��Yz��i��~q�1?�c��Bߝϟ�n�*������8j������p���ox���"w���r�yvz U\F8��<E��xz�i���qi����ȴ�ݷ-r`\�6����Y��q^�Lx�9���#���m����-F�F.-�a�;6��lE�Q��)�P�x�:-�_E�4~v��Z�����䷳�:�n��,㛵��m�=wz�Ξ;2-��[k~v��Ӹ_G�%*�i� ����{�%;����m��g�ez.3���{�����Kv���s �fZ!:� 4W��޵D��U��
(t}�]5�ݫ߉�~|z��أ�#%���ѝ܏x�D4�4^_�1�g���<��!����t�oV�lm�s(EK͕��K�����n���Ӌ���&�̝M�&rs�0��q��Z��GUo�]'G�X�E����;����=Ɲ�f��_0�ߝfw�!E����A[;���ڕ�^�W"���s5֚?�=�+9@��j������b���VZ^�ltp��f+����Z�6��j�`�L��Za�I��N�0W���Z����:g��WWjs�#�Y��"�k5m�_���sh\���F%p䬵�6������\h2lNs�V��#�t�� }�K���Kvzs�>9>�l�+�>��^�n����~Ěg���e~%�w6ɓ������y��h�DC���b�KG-�d��__'0�{�7����&��yFD�2j~�����ټ�_��0�#��y�9��P�?���������f�fj6͙��r�V�K�{[ͮ�;4)O/��az{�<><__����G����[�0���v��G?e��������:���١I���z�M�Wۋ�x���������u�/��]1=��s��E&�q�l�-P3�{�vI�}��f��}�~��r�r�k�8�{���υ����O�֌ӹ�/�>�}�t	��|���Úq&���ݟW����ᓟwk�9���c̊l��Ui�̸z��f��i���_�j�S-|��w�J�<LծT��-9�����I�®�6 *3��y�[�.Ԗ�K��J���<�ݿ��-t�J���E�63���1R��}Ғbꨝט�l?�#���ӴQ��.�S���U
v�&�3�&O���0�9-�O�kK��V_gn��k��U_k˂�4�9�v�I�:;�w&��Q�ҍ�
��fG��B��-����ÇpNk�sZM�s���*��g8��-���V`b����H���
3cU'0hR
�w�XŁ�K݊�MV]�} o�w�tJJ���$꜁x$��l$>�F�EF�޺�G�j�#�G�t�bjj�F�б��q:�`O�4�y�8`Av<�x`��&I[��'A�˚�5��KAn��jx ��=Kn@��t����)�9��=�ݷ�tI��d\�M�j�B�${��G����VX�V6��f�#��V�wk ��W�8�	����lCDZ���ϖ@���X��x�W�Utq�ii�D($�X��Z'8Ay@�s�<�x͡�PU"rB�Q�_�Q6  �[remap]

importer="texture"
type="CompressedTexture2D"
uid="uid://tfxlpqc073q1"
path="res://.godot/imported/icon.svg-218a8f2b3041327d8a5756f3a245f83b.ctex"
metadata={
"vram_texture": false
}
 RSRC                    ImageTexture            ��������                                                  resource_local_to_scene    resource_name    image    script           local://ImageTexture_3i5me �          ImageTexture          RSRCextends Node3D

var OnScreenActors: int = 3;
var ActorImage: Image;
var ActorCoordsTex: ImageTexture
@onready var CameraWorld =$"%Camera3D"

const NINETYDEGREES = PI / 2.0;
const TEXWIDTH : int = 255;

func _ready():
	ActorImage = Image.create(TEXWIDTH, 1, false, Image.FORMAT_RGBAF)
	ActorCoordsTex = ImageTexture.new()
	ActorCoordsTex.set_image(ActorImage)
	RenderingServer.global_shader_parameter_set("max_actors_on_screen", TEXWIDTH)

func _update_shader_params():
	var actors = get_tree().get_nodes_in_group("actors")	
	OnScreenActors = actors.size();
	var skipped = 0;
	for i in actors.size():
		var body = actors[i]
		if (body is NPC && body.is_inside_hidden):
			skipped += 1
			continue;
		var sp = CameraWorld.unproject_position(body.global_position)
		ActorImage.set_pixel(i - skipped, 0, Color(sp.x, sp.y, 0))
	
	ActorCoordsTex.update(ActorImage)
	RenderingServer.global_shader_parameter_set("screen_fade_coords", ActorCoordsTex)
	RenderingServer.global_shader_parameter_set("run_length", OnScreenActors - skipped)

func _process(_delta):
	_update_shader_params()

�tKE��%}s��RSRC                    PackedScene            ��������                                            U     ..    . 
   FadeState    GPUParticles3D    resource_local_to_scene    resource_name    sky_top_color    sky_horizon_color 
   sky_curve    sky_energy_multiplier 
   sky_cover    sky_cover_modulate    ground_bottom_color    ground_horizon_color    ground_curve    ground_energy_multiplier    sun_angle_max 
   sun_curve    use_debanding    script    sky_material    process_mode    radiance_size    background_mode    background_color    background_energy_multiplier    background_intensity    background_canvas_max_layer    background_camera_feed_id    sky    sky_custom_fov    sky_rotation    ambient_light_source    ambient_light_color    ambient_light_sky_contribution    ambient_light_energy    reflected_light_source    tonemap_mode    tonemap_exposure    tonemap_white    ssr_enabled    ssr_max_steps    ssr_fade_in    ssr_fade_out    ssr_depth_tolerance    ssao_enabled    ssao_radius    ssao_intensity    ssao_power    ssao_detail    ssao_horizon    ssao_sharpness    ssao_light_affect    ssao_ao_channel_affect    ssil_enabled    ssil_radius    ssil_intensity    ssil_sharpness    ssil_normal_rejection    sdfgi_enabled    sdfgi_use_occlusion    sdfgi_read_sky_light    sdfgi_bounce_feedback    sdfgi_cascades    sdfgi_min_cell_size    sdfgi_cascade0_distance    sdfgi_max_distance    sdfgi_y_scale    sdfgi_energy    sdfgi_normal_bias    sdfgi_probe_bias    glow_enabled    glow_levels/1    glow_levels/2    glow_levels/3    glow_levels/4    glow_levels/5    glow_levels/6    glow_levels/7    glow_normalized    glow_intensity    glow_strength 	   glow_mix    glow_bloom    glow_blend_mode    glow_hdr_threshold    glow_hdr_scale    glow_hdr_luminance_cap    glow_map_strength 	   glow_map    fog_enabled    fog_light_color    fog_light_energy    fog_sun_scatter    fog_density    fog_aerial_perspective    fog_sky_affect    fog_height    fog_height_density    volumetric_fog_enabled    volumetric_fog_density    volumetric_fog_albedo    volumetric_fog_emission    volumetric_fog_emission_energy    volumetric_fog_gi_inject    volumetric_fog_anisotropy    volumetric_fog_length    volumetric_fog_detail_spread    volumetric_fog_ambient_inject    volumetric_fog_sky_affect -   volumetric_fog_temporal_reprojection_enabled ,   volumetric_fog_temporal_reprojection_amount    adjustment_enabled    adjustment_brightness    adjustment_contrast    adjustment_saturation    adjustment_color_correction    custom_solver_bias    margin    radius    height    lightmap_size_hint 	   material    custom_aabb    flip_faces    add_uv2    uv2_padding    radial_segments    rings    size    subdivide_width    subdivide_depth    center_offset    orientation    render_priority 
   next_pass    transparency    blend_mode 
   cull_mode    depth_draw_mode    no_depth_test    shading_mode    diffuse_mode    specular_mode    disable_ambient_light    vertex_color_use_as_albedo    vertex_color_is_srgb    albedo_color    albedo_texture    albedo_texture_force_srgb    albedo_texture_msdf 	   metallic    metallic_specular    metallic_texture    metallic_texture_channel 
   roughness    roughness_texture    roughness_texture_channel    emission_enabled 	   emission    emission_energy_multiplier    emission_operator    emission_on_uv2    emission_texture    rim_enabled    rim 	   rim_tint    rim_texture    ao_enabled    ao_light_affect    ao_texture 
   ao_on_uv2    ao_texture_channel    heightmap_enabled    heightmap_scale    heightmap_deep_parallax    heightmap_flip_tangent    heightmap_flip_binormal    heightmap_texture    heightmap_flip_texture    subsurf_scatter_enabled    subsurf_scatter_strength    subsurf_scatter_skin_mode    subsurf_scatter_texture &   subsurf_scatter_transmittance_enabled $   subsurf_scatter_transmittance_color &   subsurf_scatter_transmittance_texture $   subsurf_scatter_transmittance_depth $   subsurf_scatter_transmittance_boost    refraction_enabled    refraction_scale    refraction_texture    refraction_texture_channel    detail_enabled    detail_mask    detail_blend_mode    detail_uv_layer    detail_albedo    detail_normal 
   uv1_scale    uv1_offset    uv1_triplanar    uv1_triplanar_sharpness    uv1_world_triplanar 
   uv2_scale    uv2_offset    uv2_triplanar    uv2_triplanar_sharpness    uv2_world_triplanar    texture_filter    texture_repeat    disable_receive_shadows    shadow_to_opacity    billboard_mode    billboard_keep_scale    grow    grow_amount    fixed_size    use_point_size    point_size    use_particle_trails    proximity_fade_enabled    proximity_fade_distance    msdf_pixel_range    msdf_outline_size    distance_fade_mode    distance_fade_min_distance    distance_fade_max_distance    plane    bake_interval    _data    point_count    up_vector_enabled 
   min_value 
   max_value    bake_resolution    width    texture_mode    curve    interpolation_mode    interpolation_color_space    offsets    colors 	   gradient    use_hdr    lifetime_randomness    emission_shape    emission_box_extents    particle_flag_align_y    particle_flag_rotate_y    particle_flag_disable_z 
   direction    spread 	   flatness    gravity    initial_velocity_min    initial_velocity_max    angular_velocity_min    angular_velocity_max    angular_velocity_curve    linear_accel_min    linear_accel_max    linear_accel_curve    radial_accel_min    radial_accel_max    radial_accel_curve    tangential_accel_min    tangential_accel_max    tangential_accel_curve    damping_min    damping_max    damping_curve 
   angle_min 
   angle_max    angle_curve 
   scale_min 
   scale_max    scale_curve    color    color_ramp    color_initial_ramp    hue_variation_min    hue_variation_max    hue_variation_curve    turbulence_enabled    turbulence_noise_strength    turbulence_noise_scale    turbulence_noise_speed    turbulence_noise_speed_random    turbulence_influence_min    turbulence_influence_max $   turbulence_initial_displacement_min $   turbulence_initial_displacement_max    turbulence_influence_over_life    anim_speed_min    anim_speed_max    anim_speed_curve    anim_offset_min    anim_offset_max    anim_offset_curve    sub_emitter_mode    sub_emitter_keep_velocity    attractor_interaction_enabled    collision_mode    collision_use_scale    shader    shader_parameter/albedo    shader_parameter/point_size    shader_parameter/roughness *   shader_parameter/metallic_texture_channel    shader_parameter/specular    shader_parameter/metallic    shader_parameter/uv1_scale    shader_parameter/uv1_offset    shader_parameter/uv2_scale    shader_parameter/uv2_offset    shader_parameter/fade_enabled    shader_parameter/alpha_clip     shader_parameter/fade_intensity     shader_parameter/texture_albedo "   shader_parameter/texture_metallic #   shader_parameter/texture_roughness    subdivide_height    length 
   loop_mode    step    tracks/0/type    tracks/0/imported    tracks/0/enabled    tracks/0/path    tracks/0/interp    tracks/0/loop_wrap    tracks/0/keys    tracks/1/type    tracks/1/imported    tracks/1/enabled    tracks/1/path    tracks/1/interp    tracks/1/loop_wrap    tracks/1/keys 	   _bundled       Script    res://main.gd ��������   Script    res://Player.gd ��������   Script    res://NPC.gd ��������   Script    res://Obstacle.gd ��������	   QuadMesh    res://party.tres ���Ȣ   Shader    res://z_cheat.gdshader ��������   Script    res://BoxDemo.gd ��������!   $   local://ProceduralSkyMaterial_tr11c >#         local://Sky_t437m �#         local://Environment_hgv4w �#         local://CapsuleShape3D_txbyk $         local://CapsuleMesh_bt6j3 3$         local://PlaneMesh_xrpct O$      !   local://StandardMaterial3D_0ol6u i$      #   local://WorldBoundaryShape3D_wd88o �$         local://Curve3D_6ohaf �$         local://Curve_848gq �&         local://CurveTexture_x3wxm 8'         local://Curve_l2gpk e'         local://CurveTexture_0q3i5 #(         local://Gradient_ujyok P(          local://GradientTexture1D_747gd �(         local://Curve_envf6 )         local://CurveTexture_krn4q �)      &   local://ParticleProcessMaterial_fhbj4 �)         local://ShaderMaterial_d7we6 �+         local://BoxMesh_hhix4 �,         local://BoxShape3D_o20od �,         local://Animation_okefb �,         local://Animation_nwxpo �.         local://AnimationLibrary_u04h0 0         local://BoxShape3D_cjxso y0         local://BoxMesh_pk5xe �0         local://BoxShape3D_2g2bb �0         local://BoxShape3D_mwlm5 �0         local://BoxShape3D_bb2e8 1         local://Curve3D_dl0hw M1         local://Gradient_j3py8 z4          local://GradientTexture1D_wm2pv �4         local://PackedScene_f6ksi �4         ProceduralSkyMaterial          ��x>���>��h?  �?      �p%?;�'?F�+?  �?      ��>��>���=  �?      �p%?;�'?F�+?  �?         Sky                          Environment                         CapsuleShape3D             CapsuleMesh          
   PlaneMesh             StandardMaterial3D    �         �      ���>���>���>  �?         WorldBoundaryShape3D             Curve3D    �               points #                              w�=  �?��T<                        1h�  �?�"�>FS>z�]���@FS�z�]>����ȕ�  �?�"��                        �d�  �?b�                        fw�A��?��2�>���ݵ��2����:ݵ�@c�A�-�?aq��                        ��A  �?P�?                              �?                            w�=  �?��T<      tilts !   	                                       �      	            Curve    �        ���        �C�      
   
         �?                            
     �?  �?                            �                  CurveTexture    �         	            Curve    �      `   �         
   :]�<��)?                            
   L�?^Kp?                            
   ��y?ɀ>                            �                  CurveTexture    �                  	   Gradient    �   !          0/ >F�>8�s?�   $        �?  �?  �?  �?��[?���>��?  �?P�1?�m-?      �?              �?         GradientTexture1D    �            �                  Curve    �        ���         
       tz��                            
   ��>��c?   f��   f��              
   iz?�Y��                            �                  CurveTexture    �                     ParticleProcessMaterial    �        �?�         �        �?  @@  �@�         �        �?  �?  �?�        �?  �@  �?      =
�@        
        ff��     �̌@     �p�     {�@
        �        A       :�       B     �Ga>     33�?                  �?���>      �?                ��u�     ���=                        ff�?     �Q�?      �?"     ��L>         ShaderMaterial    �          �          1           2     ��!?��!?��!?  �?3     4     5     6     7     8     9     :     ;     <        =  )   �������?>       �@?     @     A              BoxMesh    z                     BoxShape3D    �      �=��@,e&A      
   Animation             burn C       �?F        value G         H        I             J        K        L              times !          ff�?      transitions !        �?d�?      values            �?             update        M        method N         O        P           Q        R        S              times !                transitions !        �?      values                   method ,      restart       args              
   Animation 
            reassemble C     �U@F        value G         H        I             J        K        L              times !         @��L@      transitions !        �?  �?      values                   �?      update                 AnimationLibrary    �               burn                reassemble                   BoxShape3D    �        �?N�@�A         BoxMesh             BoxShape3D    �      �=��@   A         BoxShape3D    �        �?N�@  �@         BoxShape3D    �      ӟ�@6YK@��A         Curve3D    �               points #   6                           ��/�	 �6�@�M?���6A����M�����A��?!v$�  ��u�@(,�?    3��?(,��    3���.V��	 �6���@]Ri�����и�?]Ri?���6и������  ��0����Ͽ���6x������?����x��?��@  ��"�֐�?���6a��֐������a�?fI�@  �9�@w�A?    A+?w�A�    A+��N�	 �6�<�@eϾ    8�B?e�>    8�B�n������W�@\����6y[q?\?����y[q�z6A@ 09	��?��K>���6n��?��K�����n���->O@  ���7�                        F[%>	 �6�%���WR?    [q��WR�    [q?wJ�	 �6$�T�<���    ��O�<��=    ��O?��(���9�&�?K偿    �t?K�?    �t�|
 @	 �6 �?�9?    {�h?�9�    {�h�ۢj@	 �6m9U�";?    �&a�";�    �&a?4��	 �6ہ�                        /�-�	 �6J��?                        ��/�	 �6�@      tilts !                                                                              �               	   Gradient    �   !          �   $                    �?         GradientTexture1D    �                     PackedScene    T     	         names "   B      Node3D    script    Control    layout_mode    anchors_preset    offset_right    offset_bottom    Label    text    WorldEnvironment    environment    DirectionalLight3D 
   transform    shadow_enabled 	   Camera3D    unique_name_in_owner    Player    actors    CharacterBody3D    CollisionShape3D    shape    MeshInstance3D    mesh    Floor    StaticBody3D    surface_material_override/0    NPC_1    Path3D    curve    PathFollow3D    NPC    VisibleOnScreenNotifier3D 	   HexHalf3 	   Obstacle    Fader    collision_layer    collision_mask    GPUParticles3D 	   emitting    amount 	   lifetime 	   one_shot    speed_scale    explosiveness    randomness    visibility_aabb    process_material    draw_pass_1 	   skeleton    AnimationPlayer 
   libraries    MeshInstance3D2 
   Obstacle3 
   Obstacle2 	   HexHalf2    BoxDemo 
   Obstacle4    Vis    Area3D    Decal    size    texture_albedo    upper_fade    lower_fade    distance_fade_begin    Wall2    	   variants    N                               gC     GC      B     �A   5   Click and Drag to Pan Camera.
WASD or Arrows to Move             г]��ݾ  �>       ?г]?   �  @?�ݾ                       �?            ��?�CX?    �CX���?    �: A�+�@              �?              �?              �?    1_�?                         io�A              �?            a^B                                            �?              �?              �?        ף�            .��    T�?      �?    T��    .��w�=  �?��T<   ���<    T�?      �?    T��    ���<�	�  ���l�<              �?              �?              �?    ~�a@       Ar�    )�?      �?    )��    Ar�i��?    �#A                  ��?              �?            ��?                      �   )   {�G�z�?     @?   {.>   
ף>   l!��q�ſ�EƿYQ5@~o9@}I@                     �{?            y��@               A    �5�>                              �o?            �o?            �o?                                                         �?              �?            =, A    sB�                ?�N�    ��?      �?    ���    ?�N��A    I׽@   �k=?    i5,?      �?    i5,�    �k=?�N��    Ra�@   ���    hNI�      �?    hNI;    ���l>@~�a@��              �?              �?              �?��@2rb@��B     �?              �?              �?}��2rb@��B   ��,�    T�?      �?    T��    ��,����>2rb@���A   ��,�    T�?      �?    T��    ��,�@��?2rb@0�B   ��|?    ���    y��@            �ڸ@    �5�>       �o?            �o?            �o?@�    ��[>              �?              �?              �?�?��    &V?            ���?    ����      �?      1    �3�@    sB�         �?              �?              �?        [B
B     �?              �?              �?p&?/4�?Ƀ>            ��?    ��=<      �?    ��=�    ��?#���J��>-B            ���W��3��&�      �?)�5��&=O��5�����/�	 �6�@   ���<    T�?      �? �0T�����1���<                 �?              �?              �?؟�>�}7���	B      AZ�@   A            ��?   k�A   �'�D   Ar�    )�?      �?    )��    Ar��9A'NZ@�,)�     �?              �?              �?`�;    /n!�     �?              �?              �?����    퍡�      node_count    �         nodes     �  ��������        ����                            ����                                            ����                                       	   	   ����   
                        ����      	      
                     ����      
                           ����                            ����                                ����                                 ����        	             ����                         	             ����                            ����                     ����                                ����                          ����                                  ����                                ����                                ����                        ����                        !   ����                       "   ����   #      $                       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &                    ����      '      (   0   )                    ����      *      +              1   1   ����   2   ,                    ����                     ����      -                 3   ����      .      /                  4   ����      0                 "   ����   #      $                       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &                    ����      '      (   0   )                    ����      *      +              1   1   ����   2   ,                    ����        #             ����      -                 3   ����      .      /                  5   ����      1       &          "   ����   #      $                '       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       '             ����      '      (   0   )       '             ����      *      +       '       1   1   ����   2   ,       &             ����        ,             ����      -       &          3   ����      .      /                   6   ����      2       /           !   ����             0          "   ����   #      $                1       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       1             ����      '      (   0   )       1             ����      *      +       1       1   1   ����   2   ,       0             ����        6             ����      -       0          3   ����      .      /       /           4   ����      0       9          "   ����   #      $                :       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       :             ����      '      (   0   )       :             ����      *      +       :       1   1   ����   2   ,       9             ����        ?             ����      -       9          3   ����      .      /       /           5   ����      1       B          "   ����   #      $                C       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       C             ����      '      (   0   )       C             ����      *      +       C       1   1   ����   2   ,       B             ����        H             ����      -       B          3   ����      .      /                   7   ����      3       K           !   ����      4       L          "   ����   #      $                M       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       M             ����      '      (   0   )       M             ����      *      +       M       1   1   ����   2   ,       L             ����        R             ����      -       L          3   ����      .      /       K           5   ����      5       U          "   ����   #      $                V       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       V             ����      '      (   0   )       V             ����      *      +       V       1   1   ����   2   ,       U             ����        [             ����      -       U          3   ����      .      /       K           4   ����      6       ^          "   ����   #      $                _       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       _             ����      '      (   0   )       _             ����      *      +       _       1   1   ����   2   ,       ^             ����        d             ����      -       ^          3   ����      .      /       K           8   ����      7       g          "   ����   #      $                h       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       h             ����      8      (   0   )       h             ����      9      :       h       1   1   ����   2   ,       g             ����        m             ����      ;      <       g          3   ����      =      /       K       :   9   ����      >       p             ����      ?      @       K             ����      A      B       r             ����      C       s             ����      D               t             ����                   t             ����                   t             ����        K       ;   ;   ����      E   <   F   =   G   >   H   ?   I   @   J                   A   ����      K       y           !   ����      L       z          "   ����   #      $                {       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       {             ����      '      (   0   )       {             ����      *      +       {       1   1   ����   2   ,       z             ����        �             ����      -       z          3   ����      .      /       y           5   ����      M       �          "   ����   #      $                �       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       �             ����      '      (   0   )       �             ����      *      +       �       1   1   ����   2   ,       �             ����        �             ����      -       �          3   ����      .      /       y           4   ����        �          "   ����   #      $                �       %   %   ����         &      '      (       )   
   *   !   +   "   ,   #   -   $   .   %   /   &       �             ����      '      (   0   )       �             ����      *      +       �       1   1   ����   2   ,       �             ����        �             ����      -       �          3   ����      .      /             conn_count              conns               node_paths              editable_instances              version             RSRC1�y�s�{Ip�%extends CharacterBody3D
class_name NPC

@onready var camera_world : Camera3D = $"%Camera3D"
@onready var noti : VisibleOnScreenNotifier3D = $"VisibleOnScreenNotifier3D"
@onready var pf : PathFollow3D = get_parent() 
var is_inside_hidden = false;

func _process(_delta):
	pass

func _physics_process(_delta):
		pf.progress += 0.1;
��mqGextends StaticBody3D
class_name  Obstacle

enum DissolveState { Dissolving, Dissolved, Solid }



f5'���'l�VA�RSRC                  	   QuadMesh            ��������                                            M      resource_local_to_scene    resource_name    render_priority 
   next_pass    transparency    blend_mode 
   cull_mode    depth_draw_mode    no_depth_test    shading_mode    diffuse_mode    specular_mode    disable_ambient_light    vertex_color_use_as_albedo    vertex_color_is_srgb    albedo_color    albedo_texture    albedo_texture_force_srgb    albedo_texture_msdf    heightmap_enabled    heightmap_scale    heightmap_deep_parallax    heightmap_flip_tangent    heightmap_flip_binormal    heightmap_texture    heightmap_flip_texture    refraction_enabled    refraction_scale    refraction_texture    refraction_texture_channel    detail_enabled    detail_mask    detail_blend_mode    detail_uv_layer    detail_albedo    detail_normal 
   uv1_scale    uv1_offset    uv1_triplanar    uv1_triplanar_sharpness    uv1_world_triplanar 
   uv2_scale    uv2_offset    uv2_triplanar    uv2_triplanar_sharpness    uv2_world_triplanar    texture_filter    texture_repeat    disable_receive_shadows    shadow_to_opacity    billboard_mode    billboard_keep_scale    grow    grow_amount    fixed_size    use_point_size    point_size    use_particle_trails    proximity_fade_enabled    proximity_fade_distance    msdf_pixel_range    msdf_outline_size    distance_fade_mode    distance_fade_min_distance    distance_fade_max_distance    script    lightmap_size_hint 	   material    custom_aabb    flip_faces    add_uv2    uv2_padding    size    subdivide_width    subdivide_depth    center_offset    orientation        !   local://StandardMaterial3D_t5f03 �         local://QuadMesh_gav60 �         StandardMaterial3D                      	                   0         1         3         5      ;�W@8        dB;          >         @      =
7AA      	   QuadMesh    C             H   
   ���<���>I         J         L          A      RSRC�Y!��shader_type spatial;

void fragment() {
	// Place fragment code here.
}
�.extends CharacterBody3D
class_name player

const SPEED = 20.0
const DRAG_SENSITIVITY = 0.005
const MOUSE_BIAS = 2.2
const CAMERA_DISTANCE = 17.0
const SIGHT_RADIUS = 4.0
const NINETY_DEGREES = PI / 2.0

var cam_x_ortho = Vector3.ZERO
var cam_y_ortho = Vector3.ZERO
var drag_dir = Vector2.ZERO
var mouse_down = false;
var prev_mouse_pos = Vector2.ZERO;

@onready var camera_world : Camera3D = $"%Camera3D"

func _ready():
	update_player_move_vectors()

func _process(_delta):
	adjust_camera_to_mouse_position()

func _physics_process(_delta):
	var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = (cam_y_ortho * dir.y + cam_x_ortho * dir.x) * SPEED
	move_and_slide()

func _input(event):
	var new_state = mouse_down

	if (event.is_action_pressed("click")): new_state = true
	if (event.is_action_released("click")): new_state = false

	if (new_state != mouse_down):
		drag_dir = Vector2.ZERO
		prev_mouse_pos = get_viewport().get_mouse_position()
		update_player_move_vectors()

	if (mouse_down && event is InputEventMouseMotion):
		drag_dir = prev_mouse_pos - event.position 
		prev_mouse_pos = event.position 
		update_player_move_vectors()
		
	mouse_down = new_state

func update_player_move_vectors():
		var cam_direction = camera_world.get_camera_transform().basis.z;
		# project the camera direction onto the floor plane
		var floor_proj = cam_direction - (cam_direction.dot(Vector3.UP) * Vector3.UP);
		cam_y_ortho = floor_proj.normalized();
		cam_x_ortho = floor_proj.rotated(Vector3.UP, NINETY_DEGREES).normalized();

func adjust_camera_to_mouse_position():
	var player_pos = global_position
	var cam_direction = camera_world.get_camera_transform().basis.z;
	var new_cam_pos = (cam_direction.normalized() * CAMERA_DISTANCE) + player_pos;

	var mouse = get_viewport().get_mouse_position();
	var vp_size = get_viewport().get_visible_rect().size;
	var polar_coors = Vector2((mouse.x * 2 - vp_size.x) / vp_size.x, 
							 -(mouse.y * 2 - vp_size.y) / vp_size.y)

	polar_coors *= MOUSE_BIAS

	new_cam_pos += polar_coors.x * cam_x_ortho;
	new_cam_pos -= polar_coors.y * cam_y_ortho;

	player_pos += polar_coors.x * cam_x_ortho;
	player_pos -= polar_coors.y * cam_y_ortho;

	var from_origin = new_cam_pos - player_pos
	from_origin = from_origin.rotated(Vector3.UP, Vector2.UP.cross(drag_dir) * DRAG_SENSITIVITY)
	new_cam_pos = from_origin + player_pos
	drag_dir = Vector2.ZERO;

	camera_world.look_at_from_position(new_cam_pos, player_pos, Vector3.UP)
��fi`o���Y// NOTE: Shader automatically converted from Godot Engine 4.0.3.stable.mono's StandardMaterial3D.

shader_type spatial;
render_mode blend_mix,depth_draw_opaque,cull_back,diffuse_burley,specular_schlick_ggx;
uniform vec4 albedo : source_color;
uniform sampler2D texture_albedo : source_color,filter_linear_mipmap,repeat_enable;
uniform float point_size : hint_range(0,128);
uniform float roughness : hint_range(0,1);
uniform sampler2D texture_metallic : hint_default_white,filter_linear_mipmap,repeat_enable;
uniform vec4 metallic_texture_channel;
uniform sampler2D texture_roughness : hint_roughness_r,filter_linear_mipmap,repeat_enable;
uniform float specular;
uniform float metallic;
uniform vec3 uv1_scale;
uniform vec3 uv1_offset;
uniform vec3 uv2_scale;
uniform vec3 uv2_offset;


uniform bool fade_enabled = true;

const mat4 bayerIndex = mat4(
    vec4(00.0/16.0, 12.0/16.0, 03.0/16.0, 15.0/16.0),
    vec4(08.0/16.0, 04.0/16.0, 11.0/16.0, 07.0/16.0),
    vec4(02.0/16.0, 14.0/16.0, 01.0/16.0, 13.0/16.0),
    vec4(10.0/16.0, 06.0/16.0, 09.0/16.0, 05.0/16.0));


uniform float alpha_clip : hint_range(0.001, 1.0, 0.01) = 0.1;
uniform float fade_intensity : hint_range(1.0, 10.0, 0.1) = 5;
// number of world coordinates to actually check
global uniform int run_length;

global uniform int max_actors_on_screen;
global uniform sampler2D screen_fade_coords;


varying vec3 world_pos;

void vertex() {
	UV=UV*uv1_scale.xy+uv1_offset.xy;
	world_pos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

void fragment() {
	
	// off if the object is not in a visible leaf or is 
	// not inside visibility polygon
	// NOTE: this will likely require two groups of shaders to be efficient
	// the in and out group, to avoid position texture copies to disabled 
	// meshes.
	if (fade_enabled) {
		float dist = 0.0;
		// output alpha, defaulting to 1.0, decremented by different processes
		// from the actor position texture.
		float alpha = 1.0;
		
			for (int i = 0; i < run_length; i++) {
				// target texel center
				// max_onscreen is the texture width and max data length
				vec2 pixel_coords = vec2(float(i) + .5, 0.5) / float(max_actors_on_screen);
				vec4 char_coord = texture(screen_fade_coords, pixel_coords);
				if (char_coord.xy == vec2(0)) continue;
				dist = length(char_coord.xy - FRAGCOORD.xy);
			
	
				alpha = smoothstep(0.0, 1.0, dist * fade_intensity / length(VIEWPORT_SIZE));			
					
				ivec2 uv = ivec2(int(FRAGCOORD.x) %  4, int(FRAGCOORD.y) % 4);
				float bayer = bayerIndex[uv.x][uv.y];
				
				if (alpha < bayer || alpha < alpha_clip ) {
						discard;
				}
					
			}	
			
		
	}
	
	vec2 base_uv = UV;
	vec4 albedo_tex = texture(texture_albedo,base_uv);
	ALBEDO = albedo.rgb * albedo_tex.rgb;
			

	float metallic_tex = dot(texture(texture_metallic,base_uv),metallic_texture_channel);
	METALLIC = metallic_tex * metallic;
	vec4 roughness_texture_channel = vec4(1.0,0.0,0.0,0.0);
	float roughness_tex = dot(texture(texture_roughness,base_uv),roughness_texture_channel);
	ROUGHNESS = roughness_tex * roughness;
	SPECULAR = specular;
}
C��\�A=�[remap]

path="res://.godot/exported/133200997/export-24b8ba76a47820369429766a537f359e-img_temp.res"
�H�P��	u��[remap]

path="res://.godot/exported/133200997/export-3070c538c03ee49b7677ff960a3f5195-main.scn"
YqĘ�APv5�S�\\�[remap]

path="res://.godot/exported/133200997/export-bf6024a317b3832b39f8221d1604ebc0-party.res"
��^
� ��bFlist=Array[Dictionary]([{
"base": &"CharacterBody3D",
"class": &"NPC",
"icon": "",
"language": &"GDScript",
"path": "res://NPC.gd"
}, {
"base": &"StaticBody3D",
"class": &"Obstacle",
"icon": "",
"language": &"GDScript",
"path": "res://Obstacle.gd"
}, {
"base": &"CharacterBody3D",
"class": &"player",
"icon": "",
"language": &"GDScript",
"path": "res://Player.gd"
}])
<svg height="128" width="128" xmlns="http://www.w3.org/2000/svg"><g transform="translate(32 32)"><path d="m-16-32c-8.86 0-16 7.13-16 15.99v95.98c0 8.86 7.13 15.99 16 15.99h96c8.86 0 16-7.13 16-15.99v-95.98c0-8.85-7.14-15.99-16-15.99z" fill="#363d52"/><path d="m-16-32c-8.86 0-16 7.13-16 15.99v95.98c0 8.86 7.13 15.99 16 15.99h96c8.86 0 16-7.13 16-15.99v-95.98c0-8.85-7.14-15.99-16-15.99zm0 4h96c6.64 0 12 5.35 12 11.99v95.98c0 6.64-5.35 11.99-12 11.99h-96c-6.64 0-12-5.35-12-11.99v-95.98c0-6.64 5.36-11.99 12-11.99z" fill-opacity=".4"/></g><g stroke-width="9.92746" transform="matrix(.10073078 0 0 .10073078 12.425923 2.256365)"><path d="m0 0s-.325 1.994-.515 1.976l-36.182-3.491c-2.879-.278-5.115-2.574-5.317-5.459l-.994-14.247-27.992-1.997-1.904 12.912c-.424 2.872-2.932 5.037-5.835 5.037h-38.188c-2.902 0-5.41-2.165-5.834-5.037l-1.905-12.912-27.992 1.997-.994 14.247c-.202 2.886-2.438 5.182-5.317 5.46l-36.2 3.49c-.187.018-.324-1.978-.511-1.978l-.049-7.83 30.658-4.944 1.004-14.374c.203-2.91 2.551-5.263 5.463-5.472l38.551-2.75c.146-.01.29-.016.434-.016 2.897 0 5.401 2.166 5.825 5.038l1.959 13.286h28.005l1.959-13.286c.423-2.871 2.93-5.037 5.831-5.037.142 0 .284.005.423.015l38.556 2.75c2.911.209 5.26 2.562 5.463 5.472l1.003 14.374 30.645 4.966z" fill="#fff" transform="matrix(4.162611 0 0 -4.162611 919.24059 771.67186)"/><path d="m0 0v-47.514-6.035-5.492c.108-.001.216-.005.323-.015l36.196-3.49c1.896-.183 3.382-1.709 3.514-3.609l1.116-15.978 31.574-2.253 2.175 14.747c.282 1.912 1.922 3.329 3.856 3.329h38.188c1.933 0 3.573-1.417 3.855-3.329l2.175-14.747 31.575 2.253 1.115 15.978c.133 1.9 1.618 3.425 3.514 3.609l36.182 3.49c.107.01.214.014.322.015v4.711l.015.005v54.325c5.09692 6.4164715 9.92323 13.494208 13.621 19.449-5.651 9.62-12.575 18.217-19.976 26.182-6.864-3.455-13.531-7.369-19.828-11.534-3.151 3.132-6.7 5.694-10.186 8.372-3.425 2.751-7.285 4.768-10.946 7.118 1.09 8.117 1.629 16.108 1.846 24.448-9.446 4.754-19.519 7.906-29.708 10.17-4.068-6.837-7.788-14.241-11.028-21.479-3.842.642-7.702.88-11.567.926v.006c-.027 0-.052-.006-.075-.006-.024 0-.049.006-.073.006v-.006c-3.872-.046-7.729-.284-11.572-.926-3.238 7.238-6.956 14.642-11.03 21.479-10.184-2.264-20.258-5.416-29.703-10.17.216-8.34.755-16.331 1.848-24.448-3.668-2.35-7.523-4.367-10.949-7.118-3.481-2.678-7.036-5.24-10.188-8.372-6.297 4.165-12.962 8.079-19.828 11.534-7.401-7.965-14.321-16.562-19.974-26.182 4.4426579-6.973692 9.2079702-13.9828876 13.621-19.449z" fill="#478cbf" transform="matrix(4.162611 0 0 -4.162611 104.69892 525.90697)"/><path d="m0 0-1.121-16.063c-.135-1.936-1.675-3.477-3.611-3.616l-38.555-2.751c-.094-.007-.188-.01-.281-.01-1.916 0-3.569 1.406-3.852 3.33l-2.211 14.994h-31.459l-2.211-14.994c-.297-2.018-2.101-3.469-4.133-3.32l-38.555 2.751c-1.936.139-3.476 1.68-3.611 3.616l-1.121 16.063-32.547 3.138c.015-3.498.06-7.33.06-8.093 0-34.374 43.605-50.896 97.781-51.086h.066.067c54.176.19 97.766 16.712 97.766 51.086 0 .777.047 4.593.063 8.093z" fill="#478cbf" transform="matrix(4.162611 0 0 -4.162611 784.07144 817.24284)"/><path d="m0 0c0-12.052-9.765-21.815-21.813-21.815-12.042 0-21.81 9.763-21.81 21.815 0 12.044 9.768 21.802 21.81 21.802 12.048 0 21.813-9.758 21.813-21.802" fill="#fff" transform="matrix(4.162611 0 0 -4.162611 389.21484 625.67104)"/><path d="m0 0c0-7.994-6.479-14.473-14.479-14.473-7.996 0-14.479 6.479-14.479 14.473s6.483 14.479 14.479 14.479c8 0 14.479-6.485 14.479-14.479" fill="#414042" transform="matrix(4.162611 0 0 -4.162611 367.36686 631.05679)"/><path d="m0 0c-3.878 0-7.021 2.858-7.021 6.381v20.081c0 3.52 3.143 6.381 7.021 6.381s7.028-2.861 7.028-6.381v-20.081c0-3.523-3.15-6.381-7.028-6.381" fill="#fff" transform="matrix(4.162611 0 0 -4.162611 511.99336 724.73954)"/><path d="m0 0c0-12.052 9.765-21.815 21.815-21.815 12.041 0 21.808 9.763 21.808 21.815 0 12.044-9.767 21.802-21.808 21.802-12.05 0-21.815-9.758-21.815-21.802" fill="#fff" transform="matrix(4.162611 0 0 -4.162611 634.78706 625.67104)"/><path d="m0 0c0-7.994 6.477-14.473 14.471-14.473 8.002 0 14.479 6.479 14.479 14.473s-6.477 14.479-14.479 14.479c-7.994 0-14.471-6.485-14.471-14.479" fill="#414042" transform="matrix(4.162611 0 0 -4.162611 656.64056 631.05679)"/></g></svg>
H�   ��/𧏫   res://icon.svg��iuM@   res://img_temp.tres�	ܞ�t   res://main.tscn���Ȣ   res://party.tresRl�xG��Z~b��ECFG      application/config/name      	   BlogPost1      application/run/main_scene         res://main.tscn    application/config/features$   "         4.1    Forward Plus       application/config/icon         res://icon.svg     dotnet/project/assembly_name      	   BlogPost1      input/ui_left�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device         	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode     @    physical_keycode       	   key_label             unicode     @    echo          script            InputEventJoypadButton        resource_local_to_scene           resource_name             device            button_index         pressure          pressed           script            InputEventKey         resource_local_to_scene           resource_name             device     ����	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode           physical_keycode   A   	   key_label             unicode    a      echo          script         input/ui_right�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device         	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode     @    physical_keycode       	   key_label             unicode     @    echo          script            InputEventJoypadButton        resource_local_to_scene           resource_name             device            button_index         pressure          pressed           script            InputEventKey         resource_local_to_scene           resource_name             device     ����	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode           physical_keycode   D   	   key_label             unicode    d      echo          script         input/ui_up�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device         	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode     @    physical_keycode       	   key_label             unicode     @    echo          script            InputEventJoypadButton        resource_local_to_scene           resource_name             device            button_index         pressure          pressed           script            InputEventKey         resource_local_to_scene           resource_name             device     ����	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode           physical_keycode   W   	   key_label             unicode    w      echo          script         input/ui_down�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device         	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode     @    physical_keycode       	   key_label             unicode     @    echo          script            InputEventJoypadButton        resource_local_to_scene           resource_name             device            button_index         pressure          pressed           script            InputEventKey         resource_local_to_scene           resource_name             device     ����	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          pressed           keycode           physical_keycode   S   	   key_label             unicode    s      echo          script         input/click�              deadzone      ?      events              InputEventMouseButton         resource_local_to_scene           resource_name             device     ����	   window_id             alt_pressed           shift_pressed             ctrl_pressed          meta_pressed          button_mask          position    ��C  0A   global_position     ��C  �B   factor       �?   button_index         canceled          pressed          double_click          script         shader_globals/run_length8               type      int       value          #   shader_globals/max_actors_on_screen8               type      int       value      �   !   shader_globals/screen_fade_coordsT               type   	   sampler2D         value         res://img_temp.tres ˞��JȓCG��� v