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

window.findNRooksSolution = function( n ) {
  var solution = new Board( { 'n': n } );
  if ( n === 1 ) {
    solution = new Board( [[1]] );
    if ( arguments[1] !== undefined ) {
      if ( arguments[1][0] === 1 ) {
        return null;
      }
      arguments[1][0] = 1;
    }
    return solution.rows();
  }

  //  check for initial arguments
  //    if they exist, use them.
  //    if not, set to default.
  //      default positions should be across the top row
  var pieces = [];  //  array of tuples [ rowIndex, columnIndex ]
  for ( var index = 0; index < n; index++ ) {
    if ( arguments[index+1] !== undefined ) {
      pieces.push( arguments[index+1] );
      solution.togglePiece( pieces[index][0], pieces[index][1] );
    } else {
      pieces.push( [ 0, index ] );
      solution.togglePiece( pieces[index][0], pieces[index][1] );
    }
  }
  var lastPiece = pieces.length - 1;

  do {
  //    move last piece down one row
  //      if row occupied, move again
    do {
      solution.togglePiece( pieces[lastPiece][0], pieces[lastPiece][1] );
      pieces[lastPiece][0] += 1;
      if (pieces[lastPiece][0] < n)  {
        solution.togglePiece( pieces[lastPiece][0], pieces[lastPiece][1] );
      }
    } while( pieces[lastPiece][0] < n && solution.hasRowConflictAt( pieces[lastPiece][0] ) );

  //      loop while pieces[lastPiece] >= n*n && lastPiece > 0
    while ( pieces[lastPiece][0] >= n && lastPiece > 0 ) {
  //        set pieces[lastPiece] to index [lastPiece]
  //        lastPiece--;
  //        move pieces[lastPiece] down one row
  //         if occupied, move again
      pieces[lastPiece][0] = 0;
      solution.togglePiece( pieces[lastPiece][0], pieces[lastPiece][1] );
      lastPiece--;

      do {
        solution.togglePiece( pieces[lastPiece][0], pieces[lastPiece][1] );
        pieces[lastPiece][0] += 1;
        if (pieces[lastPiece][0] < n)  {
          solution.togglePiece( pieces[lastPiece][0], pieces[lastPiece][1] );
        }
      } while( pieces[lastPiece][0] < n && solution.hasRowConflictAt( pieces[lastPiece][0] ) );
    }
  //    set lastPiece = n-1;
    lastPiece = n - 1;
  //  ...while loop to iterate pieces over board as long as pieces[0] < n*n && there are collisions
  } while ( pieces[0][0] < n && solution.hasAnyRowConflicts() );
  //
  //  return array (or null)
  if (pieces[0][0] >= n) {
    return null;
  } else {
  //  build array to return
    solution = solution.rows();
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
    pieces.push( [ 0, piece ] );
  }

  while (!isDone){
    rookSolution = window.findNRooksSolution.apply(this, pieces);
    if (rookSolution !== undefined && rookSolution !== null){
      solutions.push(rookSolution);
    } else {
      isDone = true;
    }
  }

  return solutions;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var unfilteredSolutions = window.createAllNRooksSolutions(n);
  var solutions = [];

  for ( var num = 0; num < unfilteredSolutions.length; num++ ) {

  }

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
