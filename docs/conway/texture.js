import * as CW_UTILS 		from "./utils.js";
export class texture_state_of_stack{
	#stack;

	texture_buffer;
	position_buffer;	//This Buffer wil simply store the position data of the verticies meant to give the four-corners of the viewport (but mapped onto the WebGPU-device)


	async	request(){
		const stack = ()=> this.#stack;
			const	texture=()=>this.texture;
			const	my_webgpu_gpu		=	()=> stack().gpu;
			const	my_webgpu_device	=	()=> stack().device;
			const	my_webgpu_adaptor	=	()=> stack().adaptor;
			const 	position_buffer	=	()=>this.position_buffer;

			let [mapped_conway_buffer_config,unmapped_conway_buffer_config] = ((x)=> [{...x,mappedAtCreation: true},{...x,mappedAtCreation: false}])({size: 4 * (this.w)*(this.h),usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC})
			this.texture_buffer = await my_webgpu_device().createBuffer(unmapped_conway_buffer_config);

			let number_of_vertexes = 4;
				let position_buffer_config = {size: CW_UTILS.amount_combinator(4)(Float32Array) * number_of_vertexes, usage:GPUBufferUsage.VERTEX, mappedAtCreation: true};
				this.position_buffer=my_webgpu_device().createBuffer(position_buffer_config);
				new Float32Array(position_buffer().getMappedRange()).set([[-1,-1,0,1],[1,-1,0,1],[-1,1,0,1],[1,1,0,1]].flat());
				position_buffer().unmap();

		console.log("here")
	}


	constructor(stack,w,h){
		this.#stack	= stack;
		this.w = w;
		this.h=h
	}
}