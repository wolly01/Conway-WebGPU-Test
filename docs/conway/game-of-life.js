				let conway_step_entry_point_identifier = `conway_step_entry_point_identifier`;
				let cw_to_tx_entry_point_identifier = `my_fnii`
const amount_combinator = (...a)=> (T) => a.reduce((a,c)=> a*c) * (T.BYTES_PER_ELEMENT) ** (a.length);
export class gol_state_of_stack{
	// Setting up the code for the conway_operations
	
		#stack;
	
		//Buffers
		config_buffer;
	

	
	
		parity=false;
		conway_buffer_a;
		conway_buffer_b;
	
		cw_step_pipeline;
		pipelinei;
	
		get active_buffer(){return (this.parity) ? this.conway_buffer_a : this.conway_buffer_b;};
	
		async request(cw_module){
		
			const stack = ()=> this.#stack;
				const	my_webgpu_gpu		=	()=> stack().gpu;
				const	my_webgpu_device	=	()=> stack().device;
				const	my_webgpu_adaptor	=	()=> stack().adaptor;
			
			const	state	=	()=>this;
	
			const	conway_buffer_a		=	()=>state().conway_buffer_a;
			const	conway_buffer_b		=	()=>state().conway_buffer_b;
			const	config_buffer		=	()=>state().config_buffer;
			const 	x 	=()=>this.x;
			const	y	=()=>this.y;
			let 	amount = ()=>amount_combinator(x(),y())(Uint8Array)
	
	
			state().config_buffer = await this.#stack.device.createBuffer({size: amount_combinator(2)(Uint32Array),mappedAtCreation: true,usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC});
				//TODO -> possibly refactor from a storage buffer to something else
				let mapped_config = config_buffer().getMappedRange(); 
						new Uint32Array(mapped_config).set([x(),y()]);
						config_buffer().unmap();
			let [mapped_conway_buffer_config,unmapped_conway_buffer_config] = ((x)=> [{...x,mappedAtCreation: true},{...x,mappedAtCreation: false}])({size: 4 * amount(),usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC})
			state().conway_buffer_a			= await my_webgpu_device().createBuffer(mapped_conway_buffer_config);
			state().conway_buffer_b 		= await my_webgpu_device().createBuffer(unmapped_conway_buffer_config);
			let mapped_texture_buffer = conway_buffer_a().getMappedRange();
					new Uint32Array(mapped_texture_buffer).set(Uint32Array.from ({length: amount()},(e,i,a) => (Math.random() >= 0.7)));
					conway_buffer_a().unmap();
	
			let [cw_step_pipeline_config,cw_to_txb_pipeline_config] 	= [conway_step_entry_point_identifier,cw_to_tx_entry_point_identifier].map(e => ({layout: `auto`, compute: {module: cw_module, entryPoint: e}}));
	
			this.pipeline 			= my_webgpu_device().createComputePipeline(cw_step_pipeline_config);
			this.pipelinei 			= my_webgpu_device().createComputePipeline(cw_to_txb_pipeline_config);
			
			const cw_step_pipeline = ()=>this.cw_step_pipeline;
				
		}
	
		destroy(){
			["conway_buffer_a","conway_buffer_b","pipeline","pipelinei"].forEach(s => this[s]?.destroy());
		}
		constructor(stack,x,y){
			this.#stack	= stack;
			this.x = x;
			this.y = y;
		}
	
	}
	