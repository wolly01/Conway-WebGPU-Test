export function texture_code(v,vl,f){
	return(
	`
@group(0)	@binding(1) var Sampler :	sampler;
@group(0)	@binding(0) var Texture	:	texture_2d<f32>;

struct vertex_stage_struct {
	@location(${vl}) position_data : vec4<f32>,
}
struct fragment_stage_struct {
	@builtin(position) 				position_data 			: vec4<f32>,
	@location(0)					other_position_data		:	vec2f
}
@vertex
fn ${v}(input : vertex_stage_struct) -> fragment_stage_struct {
	var output : fragment_stage_struct;
	output.position_data 	=  input.position_data;
	output.other_position_data 	=  vec2<f32>(input.position_data[0],input.position_data[1]);
	return output;
}
@fragment
fn ${f}(input:	fragment_stage_struct) -> @location(0) vec4<f32> {
	return vec4<f32>(0,0,0,0) + textureSample(Texture,Sampler,vec2f( .5 *(1 + 	input.other_position_data[0]), .5 *(1 + input.other_position_data[1])) );
};

`)
};