export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    clear: () => void;
    getArray: () => (T | null)[]
    getSize: () => number;
    
  }

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    

    push = (item: T): void => {
        this.container.push(item)
      };
    
      pop = (): void => {
        this.container.pop()
      };
    
      peak = (): T | null => {
        if(!this.container.length) {
          return null;
        } else {
          return this.container[this.container.length - 1]
        }
        
        
      };

      clear = (): void => {
        this.container = [];
      };
 
      getArray = () => {
        return this.container
      }
    
      getSize = () => this.container.length;

}




