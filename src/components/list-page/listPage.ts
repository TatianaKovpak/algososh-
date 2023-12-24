export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  interface ILinkedList<T> {
  prepend(value: T): void;
  append(value: T): void;
  deleteHead(): void;
  deleteTail(): void;
  insertAt(value: T, index: number): void;
  removeAt(index: number): void;
  getArray(): T[]
}


export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;

    constructor(arr: T[]) {
      if (arr) {
        const length = arr.length;
        let curr = new Node<T>(arr[length - 1]);
        let temp;
  
        for (let i = length - 2; i >= 0; i--) {
          temp = new Node(arr[i], curr);
          curr = temp;
        }
        this.head = curr;
        this.size = length;
      } else {
        this.head = null;
        this.size = 0;
      }
    }

    prepend(value: T) {
        const node = new Node(value, this.head);
        this.head = node;
        this.size++;
      }

    append(value: T) {
      const node = new Node(value);
      if (this.head) {
        let curr = this.head;
    
          while (curr.next) {
            curr = curr.next;
          }
          curr.next = node;
        } else {
          this.head = node;
        }
        this.size++;
      }  

    deleteHead() {
      if (!this.head) throw new Error ("stack is empty")
      this.head = this.head.next;
      this.size--;
    }  

    deleteTail() {
      if (!this.head?.next) this.head = null;
      else {
        let curr = this.head;
        while (curr.next?.next) {
          curr = curr.next;
        }
        curr.next = null;
      }
      this.size--;
    }

    insertAt(element: T, index: number) {
        if (index < 0 || index > this.size) {
            throw new Error('Enter a valid index');
        } else {
          const node = new Node(element);

          if (index === 0) {
            if (this.head !== null) {
              node.next = this.head;
            }
            this.head = node;
          } else {
            let curr = this.head;
            let currIndex = 0;
    
            while (currIndex < index) {
              currIndex++;
              if (curr?.next && currIndex !== index) {
                curr = curr?.next;
              }
            }
            if (curr) {
              node.next = curr.next;
              curr.next = node;
            }
          }
          this.size++;
        }
      }

      removeAt (index: number) {
        if (index < 0 || index > this.size)
          throw new Error('Enter a valid index');
    
        if (!this.head || index === 0) {
            this.deleteHead()
        } else {
            let prev = this.head;
            while (index - 1 && prev.next && prev.next.next) {
              prev = prev.next;
          }
          prev.next = prev.next!.next;
        }
        this.size--;
      }

      getArray () {
        let head = this.head
        let arr = []

        while(head) {
            arr.push(head.value)
            head = head.next
        }
        return arr
      }

      getSize () {
        return this.size
      }


}