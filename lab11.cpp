#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <cuda_runtime.h>

// Your job is to implemment a bitonic sort. A description of the bitonic sort
// can be see at:
// http://en.wikipedia.org/wiki/Bitonic_sort
    
__global__ void batcherBitonicMergesort64(float * d_out, float * d_in)
{
    // you are guaranteed this is called with <<<1, 64, 64*4>>>
    extern __shared__ float sdata[];
    int tid  = threadIdx.x;
    sdata[tid] = d_in[tid];
    int i, ixj; /* Sorting partners: i and ixj */
//    i = threadIdx.x + blockDim.x * blockIdx.x;
    i = tid;
    __syncthreads();
    
    for (int stage = 0; stage <= 5; stage++)
    {
        for (int substage = stage - 1; substage > 0; substage--)
        {
          int k = 2 << stage;
          int j = 2 << substage;
          ixj = i^j;

          /* The threads with the lowest ids sort the array. */
          if ((ixj)>i) {
            if ((i&k)==0) {
              /* Sort ascending */
              if (sdata[i]>sdata[ixj]) {
                /* exchange(i,ixj); */
                float temp = sdata[i];
                sdata[i] = sdata[ixj];
                sdata[ixj] = temp;
              }
            }
            if ((i&k)!=0) {
              /* Sort descending */
              if (sdata[i]<sdata[ixj]) {
                /* exchange(i,ixj); */
                float temp = sdata[i];
                sdata[i] = sdata[ixj];
                sdata[ixj] = temp;
              }
            }
          }        
        }
    }

    d_out[tid] = sdata[tid];
}

int compareFloat (const void * a, const void * b)
{
  if ( *(float*)a <  *(float*)b ) return -1;
  if ( *(float*)a == *(float*)b ) return 0;
  if ( *(float*)a >  *(float*)b ) return 1;
  return 0;                     // should never reach this
}

int main(int argc, char **argv)
{
    const int ARRAY_SIZE = 64;
    const int ARRAY_BYTES = ARRAY_SIZE * sizeof(float);

    // generate the input array on the host
    float h_in[ARRAY_SIZE];
    float h_sorted[ARRAY_SIZE];
    float h_out[ARRAY_SIZE];
    for(int i = 0; i < ARRAY_SIZE; i++) {
        // generate random float in [0, 1]
        h_in[i] = ((rand() % 100) + .0)/100;
        h_sorted[i] = h_in[i];
    }
    qsort(h_sorted, ARRAY_SIZE, sizeof(float), compareFloat);

    // declare GPU memory pointers
    float * d_in, * d_out;

    // allocate GPU memory
    cudaMalloc((void **) &d_in, ARRAY_BYTES);
    cudaMalloc((void **) &d_out, ARRAY_BYTES);
    for (int i = 0; i < ARRAY_SIZE; i++)
        printf("%f ", h_in[i]);
    printf("\naaa\n");
    // transfer the input array to the GPU
    cudaMemcpy(d_in, h_in, ARRAY_BYTES, cudaMemcpyHostToDevice); 

    // launch the kernel
//    GpuTimer timer;
//    timer.Start();
    batcherBitonicMergesort64<<<1, ARRAY_SIZE, ARRAY_SIZE * sizeof(float)>>>(d_out, d_in);
//    timer.Stop();
    
//    printf("Your code executed in %g ms\n", timer.Elapsed());
    
    // copy back the sum from GPU
    cudaMemcpy(h_out, d_out, ARRAY_BYTES, cudaMemcpyDeviceToHost);
    for (int i = 0; i < ARRAY_SIZE; i++)
        printf("%f ", h_out[i]);
    // compare your result against the reference solution
//    compare(h_out, h_sorted, ARRAY_SIZE);
  
    // free GPU memory allocation
    cudaFree(d_in);
    cudaFree(d_out);
}