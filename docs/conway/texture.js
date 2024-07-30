import * as CW_UTILS 		from "./utils.js";
export class texture_state_of_stack{
	#stack;

	texture_buffer;
	position_buffer;
	async	request(){
		const stack = ()=> this.#stack;
			const	texture=()=>this.texture;


			const	my_webgpu_gpu		=	()=> stack().gpu;
			const	my_webgpu_device	=	()=> stack().device;
			const	my_webgpu_adaptor	=	()=> stack().adaptor;
			let [mapped_conway_buffer_config,unmapped_conway_buffer_config] = ((x)=> [{...x,mappedAtCreation: true},{...x,mappedAtCreation: false}])({size: 4 * (this.w)*(this.h),usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC})
			this.texture_buffer = await my_webgpu_device().createBuffer(unmapped_conway_buffer_config);

			let number_of_vertexes = 4;
				let position_buffer_config = {size: CW_UTILS.amount_combinator(4)(Float32Array) * number_of_vertexes, usage:GPUBufferUsage.VERTEX, mappedAtCreation: true};
				let position_buffer=my_webgpu_device().createBuffer(position_buffer_config);


	}


	constructor(stack,w,h){
		this.#stack	= stack;
		this.w = w;
		this.h=h
	}
}