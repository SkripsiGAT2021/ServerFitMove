module.exports = class Queue {
  constructor() {
    this.item = [];
  }
  isEmpty() {
    return this.item.length < 1;
  }
  addQueue(roomKey) {
    this.item.push(roomKey);
  }
  nextQueue() {
    return this.item.shift();
  }
};
