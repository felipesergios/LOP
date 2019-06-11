/* 
    Equipe: 
        João Rock Brito Santos - Subturma C (Líder) 
        Felipe Sérgio Sousa da Silva - Subturma A 
        Etapa 1 & 2
*/
//Setup

function setup() {
  canvas.x=1280;
  canvas.y=720  ;
  createCanvas(canvas.x,canvas.y);
  Player= new player();
  HUD= new hud();
  Enemy= new enemy();
  frameRate(60);
  
}
function preload(){
  Fonte=loadFont('game_over.ttf');
  play=loadImage('Nave.png');
  ini=loadImage('Navei.png');
  ceci=loadImage('cenario.png');
}
let x=0,y=0,i=0,j=0,modulo=0,velo=10,estiro=[],colib=false,xdi =[],ydi=[],xd =[],yd=[],z=0,v=[],xv=[], yv=[],xe=[],ye=[],t=1,qtet=200,rlag=5,ves=2,tt=30,ct=0,h=0,c=0,ts=[],qti=[],morte=[],l=0,tr=0,score=0,m=0,qid=0,Fonte,play,ceci,ini,qte=10,tela=0,xti,xtiv=0,cad=600,bonu=false;
function tiro(){
  
  //verifica quantidade maxima tiro
  if(ct<tt){
  if (keyIsDown(CONTROL)&&(estiro[ct]==false)){//condição para dar o tiro
    ts[ct]=0//configurando a velocidade do tiro
    yd[ct]=player.movy;//posi ini tiro em y
    xdi[ct]=player.movx+50; //posi ini tiro em x
    if((score/10>9)&&(score%10==0)&&(bonu==false)&&(estiro[ct]==false)){
    cad+=20
    bonu=true
        qte+=5
  }
  if((bonu==true)&&(score%10!=0)){
    bonu=false
  }
    ct++//prepara o codigo para o proximo tiro
  }
  }else{
    textAlign(CENTER);
    textSize(72)
    textFont(Fonte);
    text("Segure R para recarregar ",canvas.x/2,canvas.y/2);
    
    if (keyIsDown(82)){
    if((tr<=100)){//alternativa para tempo
    tr+=1
    }else{
      if(xd[tt-1]>canvas.x){ 
      for(var m=0;m<=ct;m++){
        estiro[m]=NaN
      }
      estiro[0]=false//permite o proximo tiro
      ct=0
      tr=0
    }
    }
   }
  }
  for(var k=0;k<=ct;k++){
    if(estiro[k]==false){
    xd[k]=xdi[k]+ts[k];
    
    if(xd[k]==(xdi[k]+cad/*cadencia */)){
       estiro[ct]=false
      
       }
    
    if(xd[k]<=(canvas.x+30)){
       ts[k]+=10;
    noStroke;
    fill(2)
    rect(xd[k],yd[k]-2,7,3);
       }
    }
  }
  }

function move(){
  tiro();
  for(t=1;t<=qte;t++){
    if(qti[t]>0){
      hud();
      z=t
      xv[t]=xe[t]+40//hud
      yv[t]=ye[t]-25//hud
      v[t]=qti[t]*25;
      xe[t]-=ves
      fill(139,0,0)
      imageMode(CENTER)
      image(ini,xe[t],ye[t])
      fill(255)
    //colisão cm final parede/personagem
  if((xe[t]<0)||((((player.movy+30)>=(ye[t]-25)))&&(((player.movy-30)<=(ye[t]+25))))&&((((player.movx+30)>=(xe[t]-25)))&&(((player.movx-30)<=(xe[t]+25))))){
    if(t%10==0){
     qti[0]=(qti[0]-5)
      qti[t]=(qti[t]-2)
      qid+=1
    }else{
    qti[0]=(qti[0]-2)
    qti[t]=qti[t]-2
    qid+=1
    }
  }//colisão tiro e inimigos
      for(var l=0;l<=ct;l++){
      if((yd[l]>=(ye[t]-25))&&(yd[l]<=(ye[t]+25))&&(xd[l]>=(xe[t]-25))){
         qti[t]=qti[t]-2
      xd[l]=NaN
      yd[l]=NaN
        score+=10
        qid+=1
      }
      }
    }
    else{
      morte[t]=true//morte inimigos
    }
  }
    if(v[0]<=0){
      morte[0]=true
     }
    if(qid==qte){
      qte+=5
    }

}
function movset(){
  if (keyIsDown(LEFT_ARROW)) {
    x -= 3*speedx;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 3*speedx;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 3*speedy;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 3*speedy;
  }
  if ((keyIsDown(ESCAPE)&&(tela==2))) {
    y=0
    x=-400
  }
  //velocidade do personagem compensada
  if(canvas.x==canvas.y){
    speedx=canvas.x/400;
    speedy=canvas.y/400;
  }else{
    speedx=((((canvas.x/10)/16)*40/*pode ser sub por uma vari para futuros updates de velo*/)/100);
    speedy=((((canvas.y/10)/9)*40/*pode ser sub por uma vari para futuros updates de velo*/)/100);
  }

  //posiciona de acordo com a posição inicial+movimentação teclado
      player.movx= player.x+x;
      player.movy= player.y+y;
    //colisao parede
      //parede x
  if(player.movx<(30)){
    x=0
    player.x=30
   }
  if(player.movx>(canvas.x/2)-30){
    x=0
    player.x=(canvas.x/2)-30
   }
  //parede y
  if(player.movy<(0+30)){
    y=0;
    player.y=30
   }
  if(player.movy>(canvas.y-30)){
    y=0;
    player.y=(canvas.y-30)
   }
}
   //Jogador
class player {
    constructor(){
      player.x= (canvas.x/8);
      player.y= (canvas.y/2);
      qti[z]=10;//vida jogador
      morte[0]=false
      estiro[0]=false//habilita sempre o primeiro tiro, causando assim um efeito em cadeia

  }
    mov(){
      //chama o movimento nas setas/colisao
      movset();
  }//para desenhar 
    show () {
      fill(255);
      imageMode(CENTER)
      image(play,player.movx,player.movy);
}
  tiro (){
      tiro();
  }
   hud (){
    hud();
     z=0
     xv[z]=(player.movx-70)
     yv[z]=(player.movy-25)
     v[z]=(qti[z]*5)
   }  
   }
//inimigo
class enemy {
  constructor(){
   for(t=1;t<=qtet;t++){
      ye[t]= random(30,canvas.y-30);
      xe[t]= (random(canvas.x+30,canvas.x+2000));
      qti[t]=2
  }
  }
  easy(){
    move();
  }
  show(){
    
  }

}
function hud() {
  //vermelho
  fill(255,0,0);
  noStroke();
  rect(xv[z],yv[z],10,50);
  //verde
  fill(0,255,0);
  noStroke();
  rect(xv[z],yv[z],10,v[z]);
}
//Rendering
function draw() {
  if(tela==0){
    background(51)
    fill(255);
  textAlign(CENTER);
  textSize(200)
  textFont(Fonte);
  text("SPACE",canvas.x/2,360);
  text("IMPACT",canvas.x/2,450)//kual bala
  xti=400
  if((xtiv<=450)){ 
  if ((keyCode === ENTER)) {
  xtiv+=2
  }
      image(play,xti+xtiv,405);
  stroke(0);

    text("aperte enter",canvas.x/2,650)//kual bala
  }
    else
      tela=1
  }
  
    if(tela==2){
    fill(255);
  textAlign(CENTER);
  textSize(200)
  textFont(Fonte);
  text("GAMEOVER",canvas.x/2,360);
    text("aperte ESC",canvas.x/2,650)//kual bala
  if ((keyCode === ESCAPE)) {
    movset();
   morte[0]=false
    qti[0]=10
   score=0
    y=0
    x=-350
    for(t=1;t<=qtet;t++){
      ye[t]= random(30,canvas.y-30);
      xe[t]= (random(canvas.x+30,canvas.x+2000));
      qti[t]=2
  }
    tela=0
  }
  }
  if(tela==1){
  textAlign(LEFT);
  textSize(12)
  textFont('Helvetica');
  background(114,179,31);
  image(ceci,650,650)
  fill(255);
  text("Quantidade inimigos mortos "+qid,90,100);//kual bala
  text("x inimigo "+xe,90,140);//x inimigo
  text("posição x disparo "+xd,90,160);//posição x disparo
  text("tiro speed "+ts,90,180);//tiro speed
  text("contagem tiro "+ct,90,200);//contagem tiro
  text("estiro "+estiro,90,220);//estiro
  text("Vida player "+v[0],90,240);//Vida player
  text("morte player "+morte,90,260);
  text("POSX "+(player.movx+30)+" POSY "+player.movy,90,280);//estiro 
 if(morte[0]==false){
  Player.hud();
  Player.show();
  Player.mov();
  Player.tiro();
  Enemy.easy();
      xtiv=0
 }else{
  tela=2
 }
 
  textAlign(LEFT);
  textSize(72)
  textFont(Fonte);
  text("SCORE "+cad,120,700);//kual bala
  stroke(0);
  line(0, canvas.y/2, canvas.x, canvas.y/2);
  line(canvas.x/2, 0, canvas.x/2, canvas.y);
  }
}
