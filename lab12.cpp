/*
 * Parallel bitonic sort using CUDA.
 * Compile with
 * nvcc -arch=sm_11 bitonic_sort.cu
 * Based on http://www.tools-of-computing.com/tc/CS/Sorts/bitonic_sort.htm
 */

#include <stdlib.h>
#include <stdio.h>
#include <time.h>

#define THREADS 1024
#define BLOCKS 1000
#define NUM_VALS THREADS*BLOCKS

void print_elapsed(clock_t start, clock_t stop)
{
  double elapsed = ((double) (stop - start)) / CLOCKS_PER_SEC;
  printf("Elapsed time: %.3fs\n", elapsed);
}

float random_float()
{
  return (float)rand()/(float)RAND_MAX;
}

void array_print(float *arr, int length) 
{
  int i;
  for (i = 0; i < length; ++i) {
    printf("%1.3f ",  arr[i]);
  }
  printf("\n");
}

void array_fill(float *arr, int length)
{
  srand(time(NULL));
  int i;
  for (i = 0; i < length; ++i) {
    arr[i] = random_float();
  }
}

__global__ void bitonic_sort_step(float *dev_values, int j, int k, int n)
{
  unsigned int i, ixj, stride; /* Sorting partners: i and ixj */
  i = threadIdx.x + blockDim.x * blockIdx.x;
  stride = blockDim.x * gridDim.x;
  ixj = i^j;

  /* The threads with the lowest ids sort the array. */
  if ((ixj)>i) { // avoid unnecessary threads -> in each iteration half iterations does nothing
    while(i < n){
      if ((ixj)>i) {    
        if ((i&k)==0) {
          /* Sort ascending */
          if (dev_values[i]>dev_values[ixj]) {
            printf("a");
            /* exchange(i,ixj); */
            float temp = dev_values[i];
            dev_values[i] = dev_values[ixj];
            dev_values[ixj] = temp;
          }
        }
        if ((i&k)!=0) {
          /* Sort descending */
          if (dev_values[i]<dev_values[ixj]) {
            printf("b");
            /* exchange(i,ixj); */
            float temp = dev_values[i];
            dev_values[i] = dev_values[ixj];
            dev_values[ixj] = temp;
          }
        }
      }
      i = i + stride;
      ixj = i ^ j;
    }
  }
}

/**
 * Inplace bitonic sort using CUDA.
 */
void bitonic_sort(float *values)
{
  for (int i = 0; i < NUM_VALS; i++)
      printf("%f ", values[i]);
  printf("\naaa\n");
  float *dev_values;
  size_t size = NUM_VALS * sizeof(float);

  cudaMalloc((void**) &dev_values, size);
  cudaMemcpy(dev_values, values, size, cudaMemcpyHostToDevice);
  
  //number of threads should be equals of NUM_VALS, 1/2 * NUM_VALS, 1/4 *NUM_VALS, etc
  dim3 blocks(BLOCKS/4,1);    /* Number of blocks   */
  dim3 threads(THREADS/2,1);  /* Number of threads  */

  int j, k;
  /* Major step */
  for (k = 2; k <= NUM_VALS; k <<= 1) {
      /* Minor step */
    for (j=k>>1; j>0; j=j>>1) {
      bitonic_sort_step<<<BLOCKS, THREADS>>>(dev_values, j, k,NUM_VALS);
    }
  }
  cudaMemcpy(values, dev_values, size, cudaMemcpyDeviceToHost);
  for (int i = 0; i < NUM_VALS; i++)
      printf("%f ", values[i]);
  cudaFree(dev_values);
}

int main(void)
{
  clock_t start, stop;

  float *values = (float*) malloc( NUM_VALS * sizeof(float));
  array_fill(values, NUM_VALS);

  start = clock();
  bitonic_sort(values); /* Inplace */
  stop = clock();

  print_elapsed(start, stop);
}