//Constantes del juego
const COLUMNAS = 4;
const FILAS = 4;
const CANTIDAD_MINAS = 1;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  ponerMinasTablero();
  
  casillerosSinDescubrir = COLUMNAS * FILAS;
}


function draw() {
  if (hizoClick == true)
  {
    if (mouseButton == LEFT)
    {
      if (tieneMinaCasillero(columnaPresionada, filaPresionada))
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
        mostrarMinas();
        perder(); 
        
        
      }
      else
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA);
        descubrirCasillero(columnaPresionada, filaPresionada);
        
        if(ganoElJuego() == true)
        {
          ganar();
        }
      }
      
    }
    else
    {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
  
    //pinta el casillero clickeado. Modificar/completar

    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS)
    return true;   //Esto hace que NUNCA gane el juego. Modificar/completar
  else
  return false;
}

function ponerMinasTablero()
{
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++)
  {
    numeroAleatorioFila = floor(random(0, FILAS));
    numeroAleatorioColumna = floor(random(0, COLUMNAS));
    
    if(tieneMinaCasillero(numeroAleatorioColumna, numeroAleatorioFila))
    {
      contador = contador - 1
    }
    else
    {
      ponerMinaCasillero(numeroAleatorioColumna, numeroAleatorioFila);    
      console.log("hay minas en la cordenada: ", numeroAleatorioColumna, numeroAleatorioFila); 
    }
   }
    
}







function mostrarMinas()
{
  for (let contador2 = 0; contador2 < COLUMNAS; contador2++)
  {
    columnas_for = 0
    if(tieneMinaCasillero(columnas_for,0))
    {
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
    }
    columnas_for = columnas_for + 1
  }

  for (let contador2 = 0; contador2 < FILAS; contador2++)
  {
    filas_for = 0
    if(tieneMinaCasillero(0,filas_for))
    {
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
    }
    filas_for = filas_for + 1
  }
}

function contarMinasAlrededor(columna, fila)
{
  return 9;   //Esto hace que SIEMPRE cuente 9 minas alrededor. Modificar/completar
}