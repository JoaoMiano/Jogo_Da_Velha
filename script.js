//DADOS INIAIS
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let turn = '';
let warning = '';
let playing = false;

reset()
//EVENTOS
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => { //pega todos os elementos dentro da class item e transforma em um array
    item.addEventListener('click', itemClick)       //percorre todos os itens colocando um evento de click e passando a funca
})

//FUNCTIONS
//carrega o click do jogador
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (board[item] === '' && playing === true) {
        board[item] = turn;
        renderBoard();
        toggleTurn()
    }
}

//troca o jogador
function toggleTurn() {
    turn = (turn === 'x') ? turn = 'o' : turn = 'x';
    renderInfo()
}
// reinicia o jogo
function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);

    turn = (random == 0) ? turn = 'x' : 'o';
    document.querySelector('.vez').innerHTML = turn;

    for (let i in board) { // i = chave (a1, a2, a3 ....)
        board[i] = '';
    }
    playing = true

    renderBoard();
    renderInfo();
}

//carrega as informacoes da memoria e atualiza a tela
function renderBoard() {
    for (let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = board[i]
    }
    checkGame()
}

//renderiza as informações
function renderInfo() {
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

//verifica se a jogada atual fez alguem vencer ou se deu empate

function checkGame(){
    if(checkWinerFor('x')){
        warning = 'O "X" VENCEU!!!';
        playing = false;
    }else if(checkWinerFor('o')){
        warning = 'O "O" VENCEU!!!';
        playing = false;
    }else if(draw()){
        warning = 'DEU EMPATE!';
        playing = false;
    }
}


//roda todas as possibiladades de vitoria para verificar se estão todas ocupadas pelo mesmo jogador 
function checkWinerFor(turn){
    let pos = [
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let i in pos){
        let array = pos[i].split(',')
        let winner = array.every(e => board[e] === turn)
        if(winner){
            return true;
        }
    }
    return false;
}

// roda toda a tabela verificando se tem um vazio, se tiver um vazio retorna falso 
function draw(){
    for(let i in board){
        if(board[i] ===''){
            return false
        }
    }
    return true
}