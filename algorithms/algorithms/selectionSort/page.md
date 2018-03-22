Selection Sort swaps one item at a time from the array to its beginning, building a sublist at the beginning containing the sorted items.

Selection Sort is similar to Insertion Sort, but unlike Insertion Sort, it doesn't create a new list. It performs swap operations on the same array. It's an in-place sort algorithm, as it doesn't require any additional data structure.

Selection sort is a simple, but highly inefficient algorithm. Its time complexity is O(n^2). 

## Pseudocode

    SelectionSort(Array A) {
        n = A.length - 1
        for (i = 0 to n) {
            s = <find index of smallest item in A from i+1 to n>
            A[i], A[s] = A[s], A[i]
        }
    }