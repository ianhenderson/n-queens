


var BoardRow = function(parent, position, columnFilter, majorDFilter, minorDFilter){
  this.m_parent = parent;
  this.m_position = position;
  this.m_columnFilter = columnFilter;
  this.m_majorDFilter = majorDFilter;
  this.m_minorDFilter = minorDFilter;
  this.m_children = [];
};

// This function translates bitstrings to format of board.
var translate = function( row, n ){
  var result = "";
  var count = 1 << (n-1);

  while ( count ) {
    if ( row & count ) {
      result += "1";
    } else {
      result += "0";
    }
    count = count >> 1;
  }

  return result;
};

var createNQueensTree = function( n ){
  var solutions = [];
  var leftColumn = 1 << (n-1);
  var flipFilterMask = ( 1 << n ) - 1;
  var allPiecesPlaced = 1;
  for (var i = 1; i < n; i++){
    allPiecesPlaced = allPiecesPlaced << 1;
    allPiecesPlaced = allPiecesPlaced | 1;
  }
  var rowQueue = [];
  var root = new BoardRow( null, 0, 0, 0, 0 );
  rowQueue.push(root);

  var buildBoard = function( start ) {
    var board = [];
    var node = start;

    while ( node.m_parent !== null ) {
      board.push( translate( node.m_position, n ) );
      node = node.m_parent;
    }

    return board;
  };

  var placeNextPiece = function(node){

    if (node.m_columnFilter === allPiecesPlaced) {
      solutions.push( buildBoard( node ) );
    } else {
      var newRowMajorDFilter = node.m_majorDFilter >> 1;
      var newRowMinorDFilter = node.m_minorDFilter << 1;
      var masterFilter = ( ~(node.m_columnFilter | newRowMajorDFilter | newRowMinorDFilter) ) & flipFilterMask;
      var  placementValue = leftColumn;

      while (placementValue){
        if (placementValue & masterFilter){
          var childNode = new BoardRow( node,
                                        placementValue,
                                        node.m_columnFilter | placementValue,
                                        newRowMajorDFilter | placementValue,
                                        newRowMinorDFilter | placementValue
                                      );
          node.m_children.push(childNode);
          rowQueue.push(childNode);
        }
        placementValue = placementValue >> 1;
      }
    }

    rowQueue.shift();
    if ( rowQueue[0] !== undefined ) {
      placeNextPiece( rowQueue[0] );
    }
  };

  placeNextPiece( rowQueue[0] );
  console.log( solutions.length );
  return solutions;
};
//  insertion function:
//    check for solution on current node
//    if columnFilter is all 1's
//      create solutionBoard
//      push solutionBoard to solutions array
//      dequeue current node from rowQueue
//      return
//
//    newRowMajorDFilter = shift right parent's majorDfilter
//    newRowMinorDFilter = shift left parent's minorDfilter
//    var temp = combine all three of parent's filters
//
//    while ( placementValue ) NOTE: placementValue = 1 shifted left, n-1 times
//      compare placementValue with temp
//      if it can be placed
//        create new node
//          columnFilter = new position | parent's columnFilter
//          majorDFilter = new position | newRowMajorDFilter
//          minorDFilter = new position | newRowMinorDFilter
//        push to this.children
//      shift placementValue right one
//    if this.children.length === 0
//      dequeue this
//      return
//
//

