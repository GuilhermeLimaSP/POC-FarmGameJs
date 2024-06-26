class Game {
    constructor() {
        this.screen = document.querySelector('#screen');
        this.context = this.screen.getContext('2d');

        this.width = 1000;
        this.height = 800;

        this.playerY = 0;
        this.playerX = 0;

        this.fields = [
            {
                x: 1 * 50,
                y: 5 * 50,
                image: 'milho1.png'
            },
            {
                x: 2 * 50,
                y: 5 * 50,
                image: 'milho1.png'
            },
            {
                x: 3 * 50,
                y: 5 * 50,
                image: 'milho1.png'
            },
            {
                x: 4 * 50,
                y: 5 * 50,
                image: 'milho1.png'
            },
            {
                x: 1 * 50,
                y: 6 * 50,
                image: 'milho1.png'
            },
            {
                x: 2 * 50,
                y: 6 * 50,
                image: 'milho1.png'
            },
            {
                x: 3 * 50,
                y: 6 * 50,
                image: 'milho1.png'
            },
            {
                x: 4 * 50,
                y: 6 * 50,
                image: 'milho1.png'
            },
                
        ];
        this.cornCount = 0;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    initEvents() {
        this.screen.addEventListener('click', (event) => {
            const rect = this.screen.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            this.fields.forEach(field => {
                if (mouseX >= field.x && mouseX <= field.x + 50 &&
                    mouseY >= field.y && mouseY <= field.y + 50 &&
                    field.image == 'milho3.png') {
                    field.image = 'milho1.png'; // Reseta a imagem do campo
                    this.cornCount += 10;
                }
            });
        });
    }

    drawGrid(){
        const gridSize = 50;

        const positionX = 0;
        const positionY = 0;

        // Desenhando linhas horizontais
        this.context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        for (let y = positionY; y < positionY + this.height; y += gridSize) {
            this.context.beginPath();
            this.context.moveTo(positionX, y);
            this.context.lineTo(positionX + this.width, y);
            this.context.stroke();
        }

        // Desenhando linhas verticais
        for (let x = positionX; x < positionX + this.width; x += gridSize) {
            this.context.beginPath();
            this.context.moveTo(x, positionY);
            this.context.lineTo(x, positionY + this.height);
            this.context.stroke();
        }
    }

    drawHouse(){
        const img = new Image(); // Cria um novo objeto de imagem
        img.src = 'house.png'; // Define o caminho da imagem

        this.context.fillStyle = 'red';
        this.context.drawImage(img, this.playerX, this.playerY, 300, 200);
    }
    
    drawPlayer(){
        const img = new Image(); // Cria um novo objeto de imagem
        img.src = 'lord.png'; // Define o caminho da imagem

        this.context.fillStyle = 'red';
        this.context.drawImage(img, 3 * 50, 2 * 50, 50, 100);
    }

    drawScoreboard(){
        this.context.font = '20px Arial';
        this.context.fillStyle = 'yellow';
        this.context.fillText('Milhos: ' + this.cornCount, 900, 20);
    }

    drawFields(){
        this.fields.forEach(field => {
            const img = new Image(); 
            img.src = field.image; 

            this.context.drawImage(img, field.x, field.y, 50, 50);

            // random 30% de mudar o image +1
            if (Math.random() < 0.00100) {
                if (field.image == 'milho1.png') {
                    field.image = 'milho2.png';
                }else 
                if (field.image == 'milho2.png') {
                    field.image = 'milho3.png';
                }
            }
        });
    }


    render(){
        console.log('render');

        this.clearCanvas();
        this.drawGrid();
        this.drawHouse();
        this.drawPlayer();
        this.drawFields();
        this.drawScoreboard();

        requestAnimationFrame(this.render.bind(this));
    }
}	

const game = new Game();
game.initEvents();
game.render();