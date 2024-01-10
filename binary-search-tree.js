class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        // If already exists, do nothing 
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!node) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
      } else {
        this.insertRecursively(val, node.left);
      }
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
      } else {
        this.insertRecursively(val, node.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
  
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  
    return undefined;
  }
  

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.val);
      this.dfsPreOrder(node.left, result);
      this.dfsPreOrder(node.right, result);
    }
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, result = []) {
    if (node) {
      this.dfsInOrder(node.left, result);
      result.push(node.val);
      this.dfsInOrder(node.right, result);
    }
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, result = []) {
    if (node) {
      this.dfsPostOrder(node.left, result);
      this.dfsPostOrder(node.right, result);
      result.push(node.val);
    }
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  
  bfs() {
    const result = [];
    const queue = [];
    queue.push(this.root);

    while (queue.length) {
      const current = queue.shift();
      result.push(current.val);

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }

    return result;
  }


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, value) => {
      if (!node) {
        return null;
      }
  
      if (value < node.val) {
        node.left = removeNode(node.left, value);
      } else if (value > node.val) {
        node.right = removeNode(node.right, value);
      } else {
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }
  
        // Node with two children: Get the inorder successor (smallest in the right subtree)
        node.val = this.getMinValue(node.right);
        // Delete the inorder successor
        node.right = removeNode(node.right, node.val);
      }
  
      return node;
    };
  
    this.root = removeNode(this.root, val);
  }
  
  getMinValue(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.val;
  }
  

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const getHeight = (node) => {
      if (!node) {
        return 0;
      }
  
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
  
      // If the subtree is not balanced
      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
  
      // Return the height of the subtree
      return Math.max(leftHeight, rightHeight) + 1;
    };
  
    return getHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }
  
    let parent = null;
    let current = this.root;
  
    // Find the largest node (rightmost node)
    while (current.right) {
      parent = current;
      current = current.right;
    }
  
    // If the largest node has a left subtree, find the largest node in that subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }
  
    // If the largest node doesn't have a left subtree, return its parent's value
    return parent ? parent.val : undefined;
  }
}

module.exports = BinarySearchTree;
