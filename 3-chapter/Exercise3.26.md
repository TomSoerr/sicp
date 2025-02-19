Instead of creating an unordered list by always putting the new entry after the current tree and appending the tail, we could represent each table/suitable as a tree. To search for the first key, we traverse the balanced tree until we find a match or know that there is no match for this key. 

The keys should be numbers or strings. We could order a string by the ASCII values of each letter. 

See exercise 2.66 for the implementation of such a tree. To use this solution, the lookup and insert function should just use the tree function instead of the assoc function. 