Binary Search finds the position of a required search term in a sorted array (either sorted in ascending or descending order). 
It does this by first comparing the value of the element that is to be found with the middle term in the sorted array. If the element is (say) **larger** than the element in the middle of the array, the search algorithm discards the first half of the array. The second half of the array that *might* contain the element is then selected again and this process is then repeated upon the progressively smaller arrays until the algorithm either:
    a. finds the search term (success!), or 
    b. runs out of array (failure¡). 

To get a better idea of how this works, let's pick a list of numbers: `[1,4,13,24,35,41,45,67,68,71,78,120,133]`. Let's say you wanted to find the position of a number - say `78`. if you were to go the normal brute-force search method, you'd first check the first element in the list. Then the second. Then the third. 

Is 1=78?  > Nope. Move on.

Is 4=78?  > Nope. Move on.

Is 13=78? > Nope. Move on.

...snip...

Moving in this way, it would take you **11 comparisions** before you arrived at `78`. Not the most efficient way to do things. Let's compare this to a binary search on the same list.

We first take the list and identify the middle element:
```
GiveMeMyMiddleElement([1,4,13,24,35,41,45,67,68,71,78,120,133])
> 45
```

So our middle element is 45. Now we simply compare 45 with our required number - 78.

Is 45>78? 
Nope. So what does that mean? Simply put - 78 is in the second half of our list. A fun thing to note is that we've already reduced the number of comparisions we need by 6!

Our new list is now:
`[45,67,68,71,78,120,133]`

Running the same process again, we get the mid point to be equal to 71. Is 71>78? Nope. So we again discard all the elements upto 71 and get:
`[71,78,120,133]`

We're almost there now! Let's run the mid point comparision again and, we get .. 78! 

So let's quickly figure out how many comparisions we needed: 
1 (to halve the list the first time around)+
1 (to halve it again)+
1 (to verify that the element we get is actually 78)

=3! # Author's note - that's three with an exclamation .. it denotes excitement. Not 3! which would not be .. as good.

That's a 72% reduction in the number of comparisions - and when you apply this to a larger array of numbers, it's easy to see just how much computing time you could possibly save. 

### A note on efficiency
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
