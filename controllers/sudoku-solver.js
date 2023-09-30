class SudokuSolver {
 constructor(){
  this.arr=[];
 }
  stringToArray(puzzleString){
    let arr=[];
    for(let i=0; i<81; i=i+9){
      let temp=[];
      for(let j=i; j<i+9; j++){
        temp.push(puzzleString[j]);
      }
      arr.push(temp);
    }
    return arr;
  }

  validate(puzzleString) {
    let output=null;
    if(puzzleString===''){
      output={ error: 'Required field missing' }
    }else{
    let regex=/[^0-9.]/g;
    let res= puzzleString.match(regex);
   
    if(puzzleString.length === 81){
      if(res){
        output= { error: 'Invalid characters in puzzle' };
       }
      
    }else{
      output={ error: 'Expected puzzle to be 81 characters long' };
    }
   
    }
    return output;
  }

  checkRowPlacement(puzzleString, row, column, value) {
   
  

    let refobj={"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8};
   
    let arr=this.stringToArray(puzzleString);
    let ro=arr[refobj[row]];
    console.log('row :'+ro);
   
    if(ro.includes(value)){
      console.log('result : false');
      return false;
    }else{
      console.log('result : true');
      return true;
    }
    
  }

  checkColPlacement(puzzleString, row, column, value) {
   

   
    let refobj={"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8};
  
        let arr=this.stringToArray(puzzleString);
        let col=[];
        for(let i=0; i<9; i++){
          col.push(arr[i][parseInt(column)-1])
        }
        console.log(col);
        if(col.includes(value)){
          console.log('result : false');
          return false;
        }else{
          console.log('result : true');
          return true;
        }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    
    let refobj={"A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8};
    let arr=this.stringToArray(puzzleString);
    let startrow=Math.floor(refobj[row]/3)*3;
    let col=parseInt(column)-1;
    col=Math.floor(col/3)*3;
    let startcol=col;
    let c=[];
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        c.push(arr[startrow+i][startcol+j]);
      }
    }
    console.log(c);
    if(c.includes(value)){
      console.log('result : false');
      return false;
    }else{
      console.log('result : true');
      return true;
    }
  }

  
  findDot(puzzleString){
    
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(this.arr[i][j]==="."){
          return [i,j];
        }
      }
    }
  }
  solve(puzzleString) {
   console.log(puzzleString);
    let res=this.validate(puzzleString);
    this.arr=this.stringToArray(puzzleString);
    puzzleString=this.arr.join('').replace(/,/g, "");
   
    let refobj={0:"A",1:"B",2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I"};
    if(! res){
      let rc=this.findDot(puzzleString);
     if(rc){
      for(let i=1; i<=9; i++){
        let r=this.checkRowPlacement(puzzleString,refobj[rc[0]],(rc[1]+1)+"",""+i);
        let c=null;
        let reg=null;
        if(r){
         c=this.checkColPlacement(puzzleString,refobj[rc[0]],(rc[1]+1)+"",i+"");
          if(c){
            reg=this.checkRegionPlacement(puzzleString,refobj[rc[0]],(rc[1]+1)+"",i+"");
          }
        }
        if(r && c && reg){
          this.arr[rc[0]][rc[1]]=i;
          puzzleString=this.arr.join('').replace(/,/g, "");
          if(this.solve(puzzleString)){
           
             return this.arr.join('').replace(/,/g, "");
          }
          this.arr[rc[0]][rc[1]]=".";
        }
       
      
      }
      return false;
     }else{
      return true;
     }
        
    }else{
     throw new Error("invalid");
    }
  }
}

module.exports = SudokuSolver;

