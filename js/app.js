$(document).ready(function(){
  //setInterval(alternarColor , 1000);
alternarColor()
});

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
