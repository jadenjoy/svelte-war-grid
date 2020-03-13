<script>
    import { onMount } from 'svelte';
    import { state } from './store/board.js'


    export let width  = 40;
    export let height = 40;
    export let cellWidth  = 20;
    export let cellHeight = 20;
    export let colorStroke = "#999";
    export let strokeWidth = 0.5;
    let boardWidth  = 1 + (width * cellWidth);
    let boardHeight = 1 + (height * cellHeight);
    let canvas;
    export let players = [];



    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    /**
     *
     * @param x
     * @param y
     * @returns {*}
     * Возвращает индекс ячейки по x->y
     */
    function getCellIndex(x, y) {
        let index = x + (y * width);
        return index;

    }


    onMount(() => {

        /**
         * Канвас, разметка сетк
         */
        function  draw() {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, boardWidth, boardHeight);
            ctx.beginPath();

            // Вертикальня разметка
            for (let x = 0; x <= boardWidth; x += cellWidth) {
                ctx.moveTo(strokeWidth + x, 0);
                ctx.lineTo(strokeWidth + x, boardHeight);
            }

            // Горизонтальная разметка
            for (let y = 0; y <= boardHeight; y += cellHeight) {
                ctx.moveTo(0, strokeWidth + y);
                ctx.lineTo(boardWidth, strokeWidth +  y);
            }

            ctx.strokeStyle = colorStroke;
            ctx.stroke();

            ctx.closePath();
        }

        draw();

        /**
         * Обновление каждую милисекунду
         * TODO: подрубить к вебсокетам
         */
        initBoard();
        setInterval(randomFill, 1); // можн через requestAnimation но получается медленнее

    });

    /**
     * Инициируем игроков каждому дается свое поле. эта логика должна быть у сервера, просто чтоб интереснее было смотреть =)
    */
    function initBoard() {
        // Делим поле вертикально
        let areaHeight = Math.floor(height / players.length);
        players.forEach(function(item, index, arr) {
                for (let i = 0; i < width; i++) { // выведет 0, затем 1, затем 2
                    fillMemory(i, areaHeight*index, index);
                }

        });
    }


    /**
     * Заполняет рандомную ячейку рандомной командой
     */
    function randomFill() {
        let bot = randomInt(0, players.length);
        let x = randomInt(0, width);
        let y = randomInt(0, height);
        let index = getCellIndex(x, y);
        // Просто для того чтобы интереснее было визуал добавляем простейшее правило
        //if($state[index] == null && ($state[getCellIndex(x+1, y)] === bot || $state[getCellIndex(x-1, y)] === bot || $state[getCellIndex(x, y+1)] === bot || $state[getCellIndex(x, y-1)] === bot )) {
        if($state[index] == null) {
            fillMemory(x, y, bot);
        }
    }


    /**
     *
     * @param x
     * @param y
     * Заполняет квадратик на canvas цветом команды полученным из store
     */
    function drawMemoryRect(x,y) {
        const ctx = canvas.getContext('2d');
        const index = getCellIndex(x,y);
        if($state[index]!=null) {
            ctx.fillStyle = players[$state[index]].color;
            ctx.fillRect((x*cellWidth)+strokeWidth ,(y*cellHeight)+strokeWidth,cellWidth,cellHeight);
        }
    }


    /**
     * Заполняем ячейку памяти по x->y для условности
     * @param x
     * @param y
     * @param bot
     */
    function fillMemory(x,y, bot)
    {
        let index = getCellIndex(x,y);
            state.setCell(index, bot);
            drawMemoryRect(x, y);
    }


</script>

<canvas
        bind:this={canvas}
        width={boardWidth}
        height={boardHeight}
        on:click={() => fillMemory(0,1,1)}
></canvas>