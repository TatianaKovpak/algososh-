interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    clear: () => void;
    getArray: () => (T | null)[];
    getTail: () => number;
    getHead: () => number;

  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
   
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      } 
      if ((this.tail === this.size || this.head === this.size) && this.isEmpty()) {
        this.tail = 0;
        this.head = 0;
        this.length = 0
      }
      if (this.tail === this.size && !this.isEmpty()) {
        this.tail = 0;
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
      } else if (this.head === this.size && !this.isEmpty()) {
        this.head = 0;
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
      } else {
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
      }
    };
  
    dequeue = () => {
        if (this.isEmpty()) return null;
        if (this.tail === this.size && this.head === this.size && this.isEmpty()) {
          this.tail = 0;
          this.head = 0;
          this.length = 0;
        }
        if (this.tail === this.size + 1 && !this.isEmpty()) {
          this.tail = 0;
          this.container[this.head % this.size] = null;
          this.head++;
          this.length--;
        } else if (this.head === this.size - 1 && !this.isEmpty()) {
          this.head = 0;
          this.container[this.size - 1] = null;
          this.length--;
        } else {
          this.container[this.head % this.size] = null;
          this.head++;
          this.length--;
        }
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
       else {
        return this.container[this.head % this.size];
      }
      
    };

    getArray = () => {
        return this.container
      }

    getTail = () => {
        return this.tail
    }

    getHead = () => {
        return this.head
    }
  
    isEmpty = () => this.length === 0;

    clear = (): void => {
        this.container = [];
        this.length = 0
        this.head = 0
        this.tail = 0
      };
  }