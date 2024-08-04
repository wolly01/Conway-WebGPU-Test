import * as CW_UTILS 		from "./utils.js";
export class texture_state_of_stack{
	#stack;

	texture_buffer;
	position_buffer;	//This Buffer wil simply store the position data of the verticies meant to give the four-corners of the viewport (but mapped onto the WebGPU-device)
	texture;
	view;
	sampler;

	async	request(config){
		let [w, h] = [config.width,config.height];
		const stack = ()=> this.#stack;
			const	texture=()=>this.texture;
			const	my_webgpu_gpu		=	()=> stack().gpu;
			const	my_webgpu_device	=	()=> stack().device;
			const	my_webgpu_adaptor	=	()=> stack().adaptor;
			const 	position_buffer	=	()=>this.position_buffer;

			let [mapped_conway_buffer_config,unmapped_conway_buffer_config] = ((x)=> [{...x,mappedAtCreation: true},{...x,mappedAtCreation: false}])({size: 4 * (w)*(h),usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC})
			this.texture_buffer = await my_webgpu_device().createBuffer(unmapped_conway_buffer_config);

			let number_of_vertexes = 4;
				let position_buffer_config = {size: CW_UTILS.amount_combinator(4)(Float32Array) * number_of_vertexes, usage:GPUBufferUsage.VERTEX, mappedAtCreation: true};
				this.position_buffer=my_webgpu_device().createBuffer(position_buffer_config);
				new Float32Array(position_buffer().getMappedRange()).set([[-1,-1,0,1],[1,-1,0,1],[-1,1,0,1],[1,1,0,1]].flat());
				position_buffer().unmap();

					// Create the texture object					
					let texture_data = new Uint8Array(w * h * 4);
						texture_data.set(Array.from({length: w * h}).map(z => [255,255,0,255]).flat());	//	Debug Texture Is Yellow.
					let texture_config = {size: [w,h], format:"rgba8unorm", usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST};
					this.texture  = my_webgpu_device().createTexture(texture_config);
					this.view = texture().createView();
						my_webgpu_device().queue.writeTexture(
							{ texture:this.texture },texture_data,{bytesPerRow: h * 4 * 1},{width:w,height:h}
					)
					//Create a Sampler
					 this.sampler = my_webgpu_device().createSampler();



		console.log("here")
	}


	constructor(stack,w,h){
		this.#stack	= stack;
	}
}