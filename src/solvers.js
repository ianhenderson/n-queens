/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var nSq = n*n;
  var solution = [];
  for (var index = 0; index < nSq; index++) {
    solution.push( 0 );
  }
  //  check for initial arguments
  //    if they exist, use them.
  //    if not, set to default.
  //      default positions should be across the top row
  var pieces = [];
  for (index = 0; index < n; index++) {
    if ( arguments[index+1] !== undefined ) {
      pieces.push( arguments[index+1] );
      solution[ arguments[index+1] ] = 1;
    } else {
      pieces.push(index);
      solution[index] = 1;
    }
  }
  var lastPiece = pieces.length - 1;

  //  helper function to check for row occupancy
  //
  //  do...
  do {
  //    move last piece down one row
  //      if row occupied, move again
    do {
      solution[pieces[lastPiece]] = 0;
      pieces[lastPiece] += n;
      if (pieces[lastPiece] < nSq)  {
        solution[pieces[lastPiece]] = 1;
      }
    } while(window.Board.hasRowConflictAt.call( this, pieces[lastPiece], solution) && pieces[lastPiece] < nSq);
  //      loop while pieces[lastPiece] >= n*n && lastPiece > 0
    while (pieces[lastPiece] >= nSq && lastPiece > 0) {
  //        set pieces[lastPiece] to index [lastPiece]
  //        lastPiece--;
  //        move pieces[lastPiece] down one row
  //         if occupied, move again
      pieces[lastPiece] =  lastPiece;
      solution[lastPiece] = 1;
      lastPiece--;
      do {
        solution[pieces[lastPiece]] = 0;
        pieces[lastPiece] += n;
        if (pieces[lastPiece] < nSq)  {
          solution[pieces[lastPiece]] = 1;
        }
      } while(window.Board.hasRowConflictAt.call( this, pieces[lastPiece], solution) && pieces[lastPiece] < nSq);

    }
  //
  //    set lastPiece = n-1;
    lastPiece = n - 1;
  //  ...while loop to iterate pieces over board as long as pieces[0] < n*n && there are collisions
  } while ( pieces[0] < nSq && window.Board.hasAnyRowConflicts.call( this, solution ) );
  //
  //  return array (or null)
  if (pieces[0] >= nSq) {
    return null;
  } else {
  //  build array to return
    var temp = [];
    for (var i=0;i<n;i++){
      temp.push( solution.slice( i*n, (i+1)*n ) );
    }
    solution = temp;
  }
  //

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



window.createAllNRooksSolutions = function(n) {
  var solutions = [];
  var rookSolution = null;
  var isDone = false;
  var pieces = [n]; // array with n, and pieces' initial values

  for (var piece=0; piece<n; piece++){ // initialize pieces' values
    pieces.push(piece);
  }

  while (!isDone){
    rookSolution = window.findNRooksSolution.apply(this, pieces);
    if (rookSolution !== undefined && rookSolution !== null){
      solutions.push(rookSolution);
    } else{
      isDone = true;
    }
  }

  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = window.createAllNRooksSolutions(n);
  var solutionCount = solutions.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
