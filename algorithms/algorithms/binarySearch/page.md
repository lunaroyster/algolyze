Binary Search finds the position of a search term in a sorted array. It finds the middle element and compares it to the term to eliminate the half in which the search term cannot possibly lie. This process is repeated upon the progressively smaller arrays until the algorithm either finds the search term (success), or runs out of array (failure). 

To understand binary search, let's pick a list of numbers: `[2,4,5,6,8,9,10]`. Let's find the location of `8` with binary search.

The first operation of binary search is to locate the middle element of the array, which would be `6` in this case. `6` is lesser than `8`, therefore, binary search narrows its search down to the second half of the array, which contains the elements `[8,9,10]`. Similarly, binary search compares `8` with `9` and decides to search the first half of array, which is just the element `8`.

Since the search region halves every time, the maximum number of iterations required to locate an element is log(n). 

#### A note on recursion
You might have noticed that the binary search process is repeated upon the subarray generated after the first step. Binary search is recursive in nature, and can be implemented both recursively and iteratively. 

## Pseudocode

#### Recursive

    def binarySearch(sortedList, item, start=None, end=None):
        if(start>end): return(False)
        if(start==None): start = 0
        if(end==None): end = len(sortedList)-1
        midpoint = (start+end)/2
        if(item == sortedList[midpoint]):
            return(midpoint)
        elif(item > sortedList[midpoint]):
            return(binarySearch(sortedList, item, midpoint+1, end))
        elif(item < sortedList[midpoint]):
            return(binarySearch(sortedList, item, start, midpoint-1))