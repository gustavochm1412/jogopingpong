
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let vxBolinha = 6;
let vyBolinha = 6;


let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;


let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;


let meusPontos = 0;
let pontosOponente = 0;
let pontosParaVencer = 5;
let jogoTerminou = false;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    if (!jogoTerminou) {
        mostraBolinha();
        movimentaBolinha();
        verificaColisaoBorda();
        mostraRaquete(xRaquete, yRaquete);
        mostraRaquete(xRaqueteOponente, yRaqueteOponente);
        movimentaMinhaRaquete();
        movimentaRaqueteOponente();
        verificaColisaoRaquete();
        marcaPonto();
    }
    incluiPlacar();
    verificaVencedor();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += vxBolinha;
    yBolinha += vyBolinha;
}

function verificaColisaoBorda() {
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        vyBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW) && yRaquete > 0) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW) && yRaquete < height - raqueteAltura) {
        yRaquete += 10;
    }
}

function movimentaRaqueteOponente() {
    let velocidadeOponente = 6;
    let centroRaquete = yRaqueteOponente + raqueteAltura / 2;
    if (centroRaquete < yBolinha && yRaqueteOponente < height - raqueteAltura) {
        yRaqueteOponente += velocidadeOponente;
    }
    if (centroRaquete > yBolinha && yRaqueteOponente > 0) {
        yRaqueteOponente -= velocidadeOponente;
    }
}

function verificaColisaoRaquete() {

    if (xBolinha - raio < xRaquete + raqueteComprimento && 
        yBolinha - raio < yRaquete + raqueteAltura && 
        yBolinha + raio > yRaquete) {
        vxBolinha *= -1;
    }
    

    if (xBolinha + raio > xRaqueteOponente && 
        yBolinha - raio < yRaqueteOponente + raqueteAltura && 
        yBolinha + raio > yRaqueteOponente) {
        vxBolinha *= -1;
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    
    // Placar do jogador
    fill(255);
    rect(150, 10, 40, 20);
    fill(0);
    text(meusPontos, 170, 26);
    
    // Placar do oponente
    fill(255);
    rect(450, 10, 40, 20);
    fill(0);
    text(pontosOponente, 470, 26);
    
    if (jogoTerminou) {
        textSize(32);
        textAlign(CENTER);
        fill(255);
        let mensagem = meusPontos > pontosOponente ? "Você Venceu!" : "Oponente Venceu!";
        text(mensagem, width/2, height/2);
        text("Pressione ENTER para reiniciar", width/2, height/2 + 40);
    }
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        voltaBolinha();
    }
    if (xBolinha < 10) {
        pontosOponente += 1;
        voltaBolinha();
    }
}

function verificaVencedor() {
    if (meusPontos >= pontosParaVencer || pontosOponente >= pontosParaVencer) {
        jogoTerminou = true;
    }
    
    if (jogoTerminou && keyIsDown(ENTER)) {
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    meusPontos = 0;
    pontosOponente = 0;
    jogoTerminou = false;
    voltaBolinha();
}

function voltaBolinha() {
    xBolinha = 300;
    yBolinha = 200;
    vxBolinha = random([6, -6]);
    vyBolinha = random([6, -6]);
}
