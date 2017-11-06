Insertion Sort builds the final sorted array one item at a time. 

Insertion Sort iterates through a list, consuming one element each repetition, and **inserts** it into a growing sorted list.

In the worst case scenario (when the list is in a reverse sorted order), Insertion Sort iterates n^2 times for a list with n items. Its performance is quite good, however, in nearly sorted lists.

## Pseudocode

    function insertionSortArray(Array)
        i = 1
        while i < length(Array)
            j = 1
            while(j > 0 AND Array[j-1] > Array[j])
                swap Array[j] and Array[j-1]
                j = j - 1
            end while
            i++
        end while
        return Array
    end function