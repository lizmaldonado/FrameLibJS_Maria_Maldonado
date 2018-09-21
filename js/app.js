$(document).ready(function(){

alternarColor();

});
var i=0;
var puntos,eliminar=0;
var flagH, flagV=0;
var completardulces=0;
var elementosEncol=[];

function alternarColor() {
      poner()
    }

function poner(){
  $(".main-titulo").delay(1000).animate({
    color:'#FFF'  //si se cambia a color negro da otra animacion como que desaparece.
  },10,function()
  {quitar();
})
}
function quitar(){
  $(".main-titulo").delay(1000).animate({
    color:'#DCFF0E'
  },10,function()
  {poner();
  })
  }
function llenadoTablero()
{
  i=i+1
  var numero=0;
  var imagen=0;

  $(".elemento").draggable({ disabled: true });
  if(i<8)
      {
        for(var j=1;j<8;j++)
        {
          if($(".col-"+j).children("img:nth-child("+i+")").html()==null)
          {
            numero=Math.floor(Math.random() * 4) + 1 ;
            imagen="image/"+numero+".png";
            $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
          }
        }
      }//cierre del if i<8
  if(i==8)
      {
        clearInterval(intervalo);   //desactivar funcion de llenado()
        comparar=setInterval(function(){eliminarIguales()},200)
      }// cierre del if i=8
} //cierra la funcion de llenado de tablero

function eliminarIguales()
{
  matriz=0,
  flagH=BusquedaHorizontal()//busca coincidencias de forma horizontal
  flagV=BusquedaVertical() // busca coincidencias de forma vertical
  if(flagH==1 || flagV==1)   //entra si hay que quitar elementos
  {
    $(".elemento").draggable({ disabled: true });
    $("div[class^='col']").css("justify-content","flex-end")
    $(".activo").hide("pulsate",1000,function()
    {
      var puntuaciontmp=$(".activo").length;

      $(".activo").remove("img")
      puntos=puntos+puntuaciontmp;
      $("#score-text").html(puntos)  //Cambiar puntuacion
    })
  }  // se cierra el if si hay coincidencia
  //if(flagH==0 && flagV==0 && matriz!=49)  // si no encuentra coincidencias y no esta el tablero lleno
  if ($(".activo").length==0)
  {
      clearInterval(eliminar);

      //bnewd=0;
      i=0;
      nuevosdulces();  //Funcion completar nuevos dulces
  }
}//fin funcion eleminarIguales
function nuevosdulces()
{
    i=i+1
    var numero=0;
    var imagen=0;

    $(".elemento").draggable({ disabled: true });
    //$("div[class^='col']").css("justify-content","flex-start")     esta linea sube todo

      for(var j=1;j<8;j++)
      {
        elementosEncol[j-1]=$(".col-"+j).children().length;
      }

    for(var n=0;n<7;n++)
      {for(var c=0;c<7-elementosEncol[n];c++)

        {
          numero=Math.floor(Math.random() * 4) + 1 ;
          imagen="image/"+numero+".png";
          $(".col-"+(n+1)).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
        }
      }//fin de primer for
//alert("ya llegue")
}//fin de funcion nuevos dulces
function BusquedaHorizontal()
{
  var bh=0;
  for(var f=1;f<8;f++)
  {
    for(var c=1;c<6;c++)
    {
      var res1=$(".col-"+c).children("img:nth-last-child("+f+")").attr("src")
      var res2=$(".col-"+(c+1)).children("img:nth-last-child("+f+")").attr("src")
      var res3=$(".col-"+(c+2)).children("img:nth-last-child("+f+")").attr("src")
      if((res1==res2) && (res2==res3)) //&& (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+c).children("img:nth-last-child("+(f)+")").attr("class","elemento activo")
          $(".col-"+(c+1)).children("img:nth-last-child("+(f)+")").attr("class","elemento activo")
          $(".col-"+(c+2)).children("img:nth-last-child("+(f)+")").attr("class","elemento activo")
          bh=1;
      } //cierre del if si son iguales los 3
    }
  }
  return bh;
} //cierre de funcion BusquedaHorizontal

function BusquedaVertical()
{
  var bv=0;
  for(var f=1;f<6;f++)
  {
    for(var c=1;c<8;c++)
    {
      var res1=$(".col-"+c).children("img:nth-child("+f+")").attr("src")
      var res2=$(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
      var res3=$(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")
      if((res1==res2) && (res2==res3)) //&& (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+c).children("img:nth-child("+(f)+")").attr("class","elemento activo")
          $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class","elemento activo")
          $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class","elemento activo")
          bv=1;
      } //cierre de if si los 3 son iguales
    }
  }
  return bv;
} //cierre de funcion BusquedaVertical
$(".btn-reinicio").click(function(){
  $("#score-text").html("0")
  $("#movimientos-text").html("0")
  $(this).html("REINICIAR")//el boton cambiara la palabra de inicio a REINICIAR
  min=2;  //Tiempo en minutos que durara el juego
  seg=0;

  borradoTablero();
  intervalo=setInterval(function(){llenadoTablero ()},600);
})

function borradoTablero()
{
  for(var j=1;j<8;j++)
  {
    $(".col-"+j).children("img").detach();
  }
}
