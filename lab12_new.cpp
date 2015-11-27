#include <stdio.h>
#include <stdlib.h>
#include <cuda_runtime.h>
#include <time.h>

#define THREADS 1024
#define BLOCKS 1000
const int ARRAY_SIZE = THREADS*BLOCKS;
const int ARRAY_BYTES = ARRAY_SIZE * sizeof(float);
// Your job is to implemment a bitonic sort. A description of the bitonic sort
// can be see at:
// http://en.wikipedia.org/wiki/Bitonic_sort
void print_elapsed(clock_t start, clock_t stop)
{
  double elapsed = ((double) (stop - start)) / CLOCKS_PER_SEC;
  printf("Elapsed time: %.3fs\n", elapsed);
}

__global__ void batcherBitonicMergesort(float * d_out, float * d_in, int k, int j) {
    unsigned int i, ixj, stride; /* Sorting partners: i and ixj */
    i = threadIdx.x;

    ixj = i^j;
    /* The threads with the lowest ids sort the array. */
    if ((ixj)>i) {
        if ((i&k)==0) {
            /* Sort ascending */
            if (d_in[i]>d_in[ixj]) {
                /* exchange(i,ixj); */
                float temp = d_in[i];
                d_in[i] = d_in[ixj];
                d_in[ixj] = temp;
            }
        }
        else {
            /* Sort descending */
            if (d_in[i]<d_in[ixj]) {
                /* exchange(i,ixj); */
                float temp = d_in[i];
                d_in[i] = d_in[ixj];
                d_in[ixj] = temp;
            }
        }
    }
    d_out[i] = d_in[i];

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
   clock_t start, stop;

    // generate the input array on the host
    float h_in[ARRAY_SIZE];
    float h_sorted[ARRAY_SIZE];
    float h_out[ARRAY_SIZE];
    for(int i = 0; i < ARRAY_SIZE; i++) {
        // generate random float in [0, 1]
        h_in[i] = (float)random()/(float)RAND_MAX;
        h_sorted[i] = h_in[i];
    }
    start = clock();
    qsort(h_sorted, ARRAY_SIZE, sizeof(float), compareFloat);
    stop = clock();
    print_elapsed(start, stop);

    // declare GPU memory pointers
    float * d_in, * d_out;

    // allocate GPU memory
    cudaMalloc((void **) &d_in, ARRAY_BYTES);
    cudaMalloc((void **) &d_out, ARRAY_BYTES);

    // transfer the input array to the GPU
    cudaMemcpy(d_in, h_in, ARRAY_BYTES, cudaMemcpyHostToDevice); 
    // launch the kernel
    start = clock();
    for (int stage = 2; stage <= NUM_VALS; stage <<= 1)
    {
        for (int substage = stage>>1; substage > 0; substage >>= 1)
        {
             batcherBitonicMergesort<<<1, 64>>>(d_out, d_in, stage, substage);
        }
    }
    stop = clock();
    print_elapsed(start, stop);
    
    // copy back the sum from GPU
    cudaMemcpy(h_out, d_out, ARRAY_BYTES, cudaMemcpyDeviceToHost);
    for (int i = 0; i < 64; i++)
        if (h_sorted[i] != h_out[i]) {
           printf("error, not equal values at %d, %f and %f", i, h_out[i], h_sorted[i]);
        }
    printf("correct");
    // free GPU memory allocation
    cudaFree(d_in);
    cudaFree(d_out);
}