'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log(req.body);
        let v=solver.validate(req.body.puzzle);
        let arr=req.body.coordinate.toUpperCase().split('');
        if(arr.length<2 || req.body.value===""){
          return res.json('missing required field(s).');
        }
       let er=[];
        let r=solver.checkRowPlacement(req.body.puzzle,arr[0],arr[1],req.body.value);
        let c=solver.checkColPlacement(req.body.puzzle,arr[0],arr[1],req.body.value);
        let reg=solver.checkRegionPlacement(req.body.puzzle,arr[0],arr[1],req.body.value);
       if(v){
         return res.json(v);
       }
        if(!r){
          er.push('row');
       }
       if(!c){
        er.push('column');
       }
       if(!reg){
        er.push('region');
       }
       if(r && c && reg){
        return res.json('valid value')
       }
       res.json("invalid value, does not satisfy "+er);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      res.json(solver.solve(req.body.puzzle));
    });
};
