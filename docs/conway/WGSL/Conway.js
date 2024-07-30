export function  cw_code(v,k,z,cse,txe){return(
`
@group(0) @binding(0) var<storage, read_write> conway_config	:  conway_config_struct;
@group(0) @binding(1) var<storage, read_write> conway_table_in	:  conway_struct;
@group(0) @binding(2) var<storage, read_write> conway_table_out	:  conway_struct;
@group(0) @binding(3) var<storage, read_write> texture_data		:  texture_struct;

struct texture_struct {
	underlying_buffer	: 	array<u32>,
}

struct conway_struct {
	underlying_buffer	: 	array<u32>,
}

struct conway_config_struct {
	width				:	u32,
	height				:	u32,
}

fn get_key(a :u32, b : u32) -> u32 { return a * conway_config.height + b;}
fn life_at_key(k: u32) -> u32 {return conway_table_in.underlying_buffer[k];}
fn life_around(a :u32, b : u32) -> u32 {return life_at_key(get_key(a-1,b-1)) + life_at_key(get_key(a,b-1)) + life_at_key(get_key(a+1,b-1)) + life_at_key(get_key(a+1,b)) + life_at_key(get_key(a+1,b+1)) + life_at_key(get_key(a,b+1)) + life_at_key(get_key(a-1,b+1)) + life_at_key(get_key(a-1,b));}
fn rgba(r:u32,g:u32,b:u32,a:u32)->u32 {return (r*255) + g*65025 + b* 16581375 + a * 16777216;}
fn v(r:u32)->u32 {return r;}
@compute @workgroup_size(${v},${k},${z})
	fn ${cse}(
				@builtin(local_invocation_id)		local_invocation_id		:	vec3<u32>,
				@builtin(local_invocation_index)	local_invocation_index	:	u32,
				@builtin(global_invocation_id)		global_invocation_id	:	vec3<u32>,
				@builtin(workgroup_id)				workgroup_id			:	vec3<u32>,
				@builtin(num_workgroups)			num_workgroups			:	vec3<u32>
			){
				var I 	= 	global_invocation_id.x;
				var J	=	global_invocation_id.y;
				var K	=	global_invocation_id.z;

				

				var key = get_key(I,J);
				var current_life = life_at_key(key);
				var current_surround = life_around(I,J);

				var life_next = current_surround == 3 || (bool(current_life) && current_surround == 2);
				conway_table_out.underlying_buffer[key] = u32(life_next);
		
		

	}
@compute @workgroup_size(${v},${k},${z})
	fn ${txe}	(
					@builtin(global_invocation_id) global_invocation_id : vec3<u32>,
					@builtin(local_invocation_id)	local_invocation_id		: vec3<u32>
				){
		// Note the boundries give this block control only over the interior, not the boundry of the game.
		for(var i : u32 = 0;	i < 1;	i ++){
			for(var j	:	u32 = 0;j < 1; j ++){
				var I 	= 	global_invocation_id.x;
				var J	=	global_invocation_id.y;
				var k = get_key(I,J);
				var x = conway_table_out.underlying_buffer[k];
				texture_data.underlying_buffer[k] = rgba(x,u32(0),u32(x),u32(255));

			}
		}

	}`);

}