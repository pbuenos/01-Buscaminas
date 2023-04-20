//Matrices para los tableros
var tableroDeMinas;          //será una matriz con una cantidad de COLUMNAS y FILAS
var tableroDeDescubiertos;   //matriz necesaria para flood fill (descubrir casilleros adyacentes al hacer click)

var separacion_columnas, separacion_filas;

//Imágenes
var imagenGameOver;
var imagenGano;

function laMagiaDeLosProfes()
{
    separacion_columnas = width / COLUMNAS;   //las var width y height contendrán el valor correcto después de createCanvas()
    separacion_filas = height / FILAS;
    
    //Creo los tableros y los inicializo
    tableroDeMinas = make2DArray(COLUMNAS, FILAS);
    tableroDeDescubiertos = make2DArray(COLUMNAS, FILAS);
    rellenarArray(tableroDeMinas, COLUMNAS, FILAS, false);
    rellenarArray(tableroDeDescubiertos, COLUMNAS, FILAS, false);
    
    //Cargo las imágenes
    imagenGameOver = loadImage("img/gameover.png");
    imagenGano = loadImage("img/ganaste.png");
  
    dibujarCuadricula();
}

function mousePressed() {
    columnaPresionada = floor(mouseX / separacion_columnas);
    filaPresionada = floor(mouseY / separacion_filas);
    hizoClick = true;
  }

function dibujarCuadricula() {
    rect(0, 0, width, height);  //lineas de los bordes

    for (let i = 1; i < COLUMNAS; i++) //lineas verticales
        line(i * separacion_columnas, 0, i * separacion_columnas, height);

    for (let i = 1; i < FILAS; i++)  //lineas horizontales
        line(0, i * separacion_filas, width, i * separacion_filas);
}

//Pinta el casillero de la columna y fila con el color c
function pintarCasillero(columna, fila, c) {
    fill(c);      //relleno con el color que me dieron
    noStroke();
    rect(columnaAPixel(columna) + 1, filaAPixel(fila) + 1, separacion_columnas - 1, separacion_filas - 1);
}

function columnaAPixel(columna) {
    return columna * separacion_columnas;
}

function filaAPixel(fila) {
    return fila * separacion_filas;
}

//Se utilizó principalmente (en vez de consultar directamente a la matriz del tablero) para la funcion que cuenta minas alrededor
//ya que si recibe como parámetro una fila o una columna inválida (por ejemplo de valor negativo), retorna false.
//Además permite abstraer al programador del uso de matrices
function tieneMinaCasillero(columna, fila) {
    //Verifico que esté dentro del tablero
    if (columna < 0 || columna >= COLUMNAS)
        return false;
    if (fila < 0 || fila >= FILAS)
        return false;

    //Si llegué hasta acá estoy dentro del tablero, entonces devuelvo/retorno el valor que tiene el tablero en la posición [columna],[fila]
    return tableroDeMinas[columna][fila];
}

function mostrarNumeroCasillero(columna, fila, numero) {
    fill(0);    //Color del texto
    textSize(separacion_columnas);
    textAlign(CENTER, CENTER);   //centro los textBox en forma horizontal y vertical
    //console.log(columnaAPixel(columna) + separacion_columnas / 2);
    //console.log(filaAPixel(fila) + separacion_filas / 2);
    text(str(numero), columnaAPixel(columna) + separacion_columnas / 2, filaAPixel(fila) + separacion_filas / 2);
}

function perder() {
    //Perdió el juego
    //pintar(columnaPresionada, filaPresionada, COLOR_CASILLERO_MINADO);  //No hace falta que pinte la mina porque voy a pintarlas a todas en finDelJuego()

    finDelJuego();
    imageMode(CENTER);
    image(imagenGameOver, width / 2, height / 2, width, height);

    console.log("Perdió");
}

function ganar() {
    finDelJuego();
    console.log("Ganaste");

    imageMode(CENTER);
    image(imagenGano, width / 2, height / 2, width, height);
}

function finDelJuego() {
    mostrarMinas();
    noLoop();  //dejo de ejecutar el draw() para que no siga jugando
}

//Se realizó principalmente para abstraer al programador del uso de matrices
function ponerMinaCasillero(columna, fila) {
    tableroDeMinas[columna][fila] = true;
}

function descubrirCasillero(columna, fila) {
	if( tableroDeDescubiertos[columna][fila] == false )
    {
	    tableroDeDescubiertos[columna][fila] = true;
	    casillerosSinDescubrir--;
	    pintarCasillero(columna, fila, COLOR_CASILLERO_SIN_MINA);
	    let minasAlrededor = contarMinasAlrededor(columna, fila);
	    if (minasAlrededor == 0)
	        floodFill(columna, fila);  //revela casilleros adyacentes (usa recursividad)
	    else {
	        mostrarNumeroCasillero(columna, fila, minasAlrededor);
	        console.log(minasAlrededor);
	    }
	}
}

function estaDescubierto(columna, fila) {
    return tableroDeDescubiertos[columna][fila];
}

function floodFill(columna, fila) {
    for (let xoff = -1; xoff <= 1; xoff++) {
        let i = columna + xoff;
        if (i < 0 || i >= COLUMNAS) continue;

        for (let yoff = -1; yoff <= 1; yoff++) {
            let j = fila + yoff;
            if (j < 0 || j >= FILAS) continue;
            if (!estaDescubierto(i, j))
                descubrirCasillero(i, j);
        }
    }
}

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function rellenarArray(arr, cols, rows, value) {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            arr[i][j] = value;
        }
    }
}