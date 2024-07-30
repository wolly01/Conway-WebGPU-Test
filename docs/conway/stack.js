/*A simple wrapper for a webgpu gpu->adaptor->device stack*/
export class stack{
	#gpu;
	#adaptor;
	#device;


	get gpu(){return this.#gpu}
	get adaptor(){return this.#adaptor;} // for the brits
	get adapter(){return this.adaptor;} // for the americans / api purists
	get device(){return this.#device;}

	async request(){
		this.#gpu		=	self?.navigator?.gpu;
			this.#adaptor 	= 	await (this.#gpu)?.requestAdapter();
				this.#device	=	await	(this.#adaptor)?.requestDevice();
	}
	destroy(){
		this.#device?.destroy();
		this.#adaptor?.destroy();
		[this.#adaptor,this.#device] = [null,null];
	}

};