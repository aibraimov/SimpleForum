__global__ void segscan(int * data, int * flags)
{
	 __shared__ int s_data[BL_SIZE];
	 __shared__ int s_flags[BL_SIZE];
    int idx = threadIdx.x + blockDim.x * blockIdx.x;
	// copy block of data into shared 
	// memory
	i = threadIdx.x
  	s_data[i] = data[idx]; s_flags[i] = data[idx];
	__syncthreads();

    // choose whether to propagate
	s_data[i] = s_flags[i] ? s_data[i] : s_data[i - 1] + s_data[i];

	// create merged flag	
	s_flags[i] = s_flags[i - 1] | s_flags[i];
	// repeat for different strides
}
