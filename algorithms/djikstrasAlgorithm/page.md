Dijkstra's algorithm is a pathfinding algorithm used to discover the shortest path between two points.

Before we describe the algorithm, let's define some things. The algorithm is run upon a network of **nodes** called a **graph**. The paths that connect the nodes together are called **edges**. The edges have **weights**.

Dijkstra's algorithm finds you the shortest distance between two nodes on the graph. It does this by iterating through the nodes and calculating the distance to reach their neighbors, and updating the *shortest known distance* if a shorter route is found.

In the worst case scenario, Dijkstra's Algorithm has a performance of O(|E| + |V|log|V|).

## Pseudocode

    function shortestPath(origin, destination, graph)
        origin is set at 0 distance
        other nodes are set at ∞
        V = Visited nodes array, currently null
        A = All nodes on graph, initially
        while(A still has nodes):
            m = <pop node from A with smallest distance>
            add m to V
            for each neighbor n of m:
                newDistance = (shortest known distance from origin to m + distance from m to n)
                knownDistance = (shortest known distance from origin to n)
                if newDistance < knownDistance
                    update n's shortest known distance from origin
        return destination node's shortest known distance
    end function