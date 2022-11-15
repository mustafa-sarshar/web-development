// ... Category: Iterator Pattern
// Purpose:
// Define Objects

function Iterator(items) {
    this.items = items;
    this.index = 0;
}

Iterator.prototype = {
    hasNext: function () {
        return this.index < this.items.length;
    },
    next: function () {
        return this.items[this.index++];
    }
}

function IteratorReverse(items) {   // Define Iterator
    this.items = items;
    this.index = items.length - 1;
}

IteratorReverse.prototype = {
    hasPrev: function () {
        return this.index > 0;
    },
    prev: function () {
        return this.items[this.index--];
    }
}

const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5"
];

const iterator = new Iterator(items);
const iteratorReverse = new IteratorReverse(items);

console.log("Iterator: ");
while (iterator.hasNext())
    console.log(iterator.next());

console.log("Iterator Reverse:");
while (iteratorReverse.hasPrev())
    console.log(iteratorReverse.prev());