 import {writable} from 'svelte/store';

 /**
  * Store c состоянием ячеек памяти для доступа из разных компонентов
  * @returns {{subscribe: <T>(run: Subscriber<any[]>, invalidate?: Invalidator<any[]>) => Unsubscriber, boardState: (function(): void), setCell: (function(*, *): void)}}
  */
 function createState() {
        const {subscribe, set, update} = writable(Array(1000).fill(null));

        return {
            subscribe,
            boardState: () => set(Array(1000).fill(null)),
            setCell: (i, bot) => update(a => {
                // console.log(i);
                // console.log(bot);
                a[i] = bot;
                return a;
            }),
        };
    }


    export const state = createState();