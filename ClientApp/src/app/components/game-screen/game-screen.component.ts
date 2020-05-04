import { Component,ViewChild, ElementRef,OnInit, HostListener } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit 
{
  //In the component class, we can use the @ViewChild() decorator to inject a reference to the canvas.
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  title = 'ClassicSnake-Angular';
  isRunning=true;

  //Game Screen Dimensions
  N:number;
  M:number;
  Scale:number;
  fieldWidth:number;
  fieldHeight:number;

  mySnake:SnakeChain[]=[];
  //mySnake: Array<SnakeChain> = new Array();
  direction=0;
  numbOfChains=4;
  numOfApples=10;
  tailX;
  tailY;
  
  //apples:Apple[]=[];
  apples: Array<Apple> = new Array(this.numOfApples);

  
  constructor(private gameservice:GameService,private deviceService: DeviceDetectorService) { }
  
  ngOnInit(): void 
  {
  if(this.deviceService.isDesktop()||this.deviceService.isTablet()) {
    this.N=32;
    this.M=24;
    this.Scale=25;
    this.fieldWidth=this.Scale*this.N;
    this.fieldHeight=this.Scale*this.M;
  }

  else if(this.deviceService.isMobile())
  {
    this.N=14;
    this.M=24;
    this.Scale=25;
    this.fieldWidth=this.Scale*this.N;
    this.fieldHeight=this.Scale*this.M;
  }
    
    this.gameservice.resetScore();
    
    this.initializeSnake();
    //Once the component has initialized, we’ll have access to the Canvas DOM node, as well
    //as its drawing context:
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
    this.drawField();
    
    this.initializeApples(this.ctx);

    //const i=setInterval(()=>this.animate(this.ctx), 150);
    requestAnimationFrame(()=>this.animate(this.ctx));

  }


  //Listening to key events
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
  
    var key = event.keyCode;
    console.log(key);
    
    switch(key)
     {
      case 40: if(this.direction!=3) this.direction=0; break; //down
      case 39: if(this.direction!=1)this.direction=2; break; //right
      case 37: if(this.direction!=2)this.direction=1; break; //left
      case 38: if(this.direction!=0)this.direction=3; break; //up
     }
  }

    //Listening to click events
    @HostListener('window:click', ['$event'])
    clickEvent(event: MouseEvent) {
      console.log(event);
    
      var positionX = event.clientX;
      var positionY = event.clientY;
      console.log("positionX:"+positionX+",mySnake[0].x:"+this.mySnake[0].x*this.Scale);
      console.log("positionY:"+positionY+",mySnake[0].y:"+this.mySnake[0].y*this.Scale);
      
      if(Math.abs(positionX-this.mySnake[0].x*this.Scale)>Math.abs(positionY-this.mySnake[0].y*this.Scale))
      {
      if((positionX>this.mySnake[0].x*this.Scale))
        {
          if(this.direction!=1) this.direction=2;  //right
        }
       else if(positionX<this.mySnake[0].x*this.Scale)
        {
          if(this.direction!=2) this.direction=1; //left
        }
      }
      else
      {
       if(positionY<this.mySnake[0].y*this.Scale)
        {
          if(this.direction!=0) this.direction=3; //up
        }
       else if(positionY>this.mySnake[0].y*this.Scale)
        {
          if(this.direction!=3) this.direction=0; //down
        }
      }

      }
    
  

  animate(graphicsContext:CanvasRenderingContext2D): void 
  {
    
    let framesPerSecond = 5;

     var timeout = setTimeout(()=>{
                
            this.drawSnake();
            this.moveSnake(graphicsContext);
            if(!this.isRunning){
              clearInterval(timeout);
            }
            else{requestAnimationFrame(()=>(this.animate(graphicsContext)));}
                    
    
        }, 1000 / framesPerSecond);

        
  }

  stopAnimation()
  {
     this.isRunning=false;
  }

  startAnimation()
  {
     this.isRunning=true;
     requestAnimationFrame(()=>this.animate(this.ctx));
  }

   drawLine(x1: number,y1: number,x2: number,y2: number)
  {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = "green";
    this.ctx.stroke();
  }

   drawField()
  {
    for( var i=0;i<this.fieldWidth;i+=this.Scale)
    {
      
       this.drawLine(i,0,i,this.fieldHeight);
    }

    for( var j=0;j<this.fieldHeight;j+=this.Scale)
    {
      
       this.drawLine(0,j,this.fieldWidth,j);
    }

  }

  initializeSnake()
  {
    this.mySnake[0]=new SnakeChain();
    this.mySnake[0].x=10;
    this.mySnake[0].y=10;
    this.mySnake[1]=new SnakeChain();
    this.mySnake[1].x=11
    this.mySnake[1].y=10;
    this.mySnake[2]=new SnakeChain();
    this.mySnake[2].x=12
    this.mySnake[2].y=10;
    this.mySnake[3]=new SnakeChain();
    this.mySnake[3].x=13
    this.mySnake[3].y=10;

  }

  initializeApples(gcntxt:CanvasRenderingContext2D)
  {
    for(var i=0;i< this.numOfApples;i++)
    {
      this.apples[i]=new Apple(this.N,this.M);
    }

    this.apples.forEach((apple:Apple)=>
    {
      apple.newRandomLocation();
      apple.drawApple(gcntxt);
    });

  }

  moveSnake(gcntxt:CanvasRenderingContext2D)
  {
    //capturing tail coordinates
     this.tailX=this.mySnake[this.numbOfChains-1].x
     this.tailY=this.mySnake[this.numbOfChains-1].y

    //moving elements
    for(var i=this.numbOfChains-1;i>0;i--)
    {
      this.mySnake[i].x=this.mySnake[i-1].x;
      this.mySnake[i].y=this.mySnake[i-1].y;
    }
    
    //moving Head Element according the direction
    if(this.direction==0) this.mySnake[0].y+=1;
    if(this.direction==1) this.mySnake[0].x-=1;
    if(this.direction==2) this.mySnake[0].x+=1;
    if(this.direction==3) this.mySnake[0].y-=1;

    //if our Head's element coordinates are equal to an Apple coordinates then
    //increment number of chains in our Snake Array ,also let's put the eaten apple in the new location
    for (var i=0;i<this.numOfApples;i++)
    {
      if((this.mySnake[0].x==this.apples[i].x)&&(this.mySnake[0].y==this.apples[i].y))
      {
        this.numbOfChains++;
        this.mySnake[this.numbOfChains-1]=new SnakeChain();

        this.apples[i].newRandomLocation();
        this.apples[i].drawApple(gcntxt);

        //also call GameService to increment score
        this.gameservice.incrementScore();
      }
    }
    //Check if Head Element is reaching the Border
    //If so - Changing direction to slide along the Border (Counterclockwise)
    if((this.direction==2)&&(this.mySnake[0].x>this.N-2)) this.direction=3 //up
    if(this.mySnake[0].y<1) this.direction=1 //left
    if(this.mySnake[0].x<1) this.direction=0 //down
    if((this.direction==0)&&(this.mySnake[0].y>this.M-2)) {this.direction=2 } //right
    
    //Check if Head Element is intersects with one of other Elements
    //If so -invoking GameOver() method on GameService
    if(this.numbOfChains>5)
    {
      for(var i=1;i<this.numbOfChains;i++)
      {
         if ((this.mySnake[0].x==this.mySnake[i].x)&&(this.mySnake[0].y==this.mySnake[i].y)) 
         
         //this.stopAnimation();
         this.gameservice.gameOver();
         
      }
   }

  }

  drawSnake()
  {
    //Draw Head
    this.ctx.fillStyle = 'violet';
      
    this.ctx.fillRect((this.mySnake[0].x)*this.Scale, (this.mySnake[0].y)*this.Scale,this.Scale-2, this.Scale-2)
    //Draw Body
    for(var i=1;i<this.numbOfChains;i++)
    {
      this.ctx.fillStyle = 'blue';
      
      this.ctx.fillRect((this.mySnake[i].x)*this.Scale, (this.mySnake[i].y)*this.Scale,this.Scale-2, this.Scale-2)
    }
    this.removeTail();
  }

  removeTail()
  {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect((this.tailX)*this.Scale,(this.tailY)*this.Scale,this.Scale-1,this.Scale-1);
  }

}


export class SnakeChain 
{
  x:number;
  y:number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

export class Apple
{

  x:number;
  y:number;
  Scale=25;
  N:number;
  M:number;

  constructor(rows,columns) {
    this.x = 0;
    this.y = 0;
    this.N=rows;
    this.M=columns;
  }

  newRandomLocation(){
    this.x=Math.floor(Math.random() * this.N); 
    this.y=Math.floor(Math.random() * this.M); 
  }

  drawApple(graphicContext:CanvasRenderingContext2D)
  {
    graphicContext.fillStyle = 'yellow';
    console.log("Drawing apple at:"+this.x+","+this.y);
    graphicContext.fillRect((this.x)*this.Scale, (this.y)*this.Scale,this.Scale-2, this.Scale-2)
  }

}

