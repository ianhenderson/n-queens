// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row;
      if ( arguments[1] !== undefined ) {
        var n = Math.sqrt(arguments[1].length);
        row = Math.floor(rowIndex / n);
        row = arguments[1].slice( row*n, (row+1)*n );
      } else {
        row = this.rows()[rowIndex]; //totally!
      }

      for ( var i = 0, count = 0; i < row.length; i++ ) {
        if ( row[i] !== 0 ) {
          count++;
          if ( count > 1 ) {
            return true;
          }
        }
      }
      return false; // fixed
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var tmp = this;
      var n = this.rows();
      n = n.length;

      for ( var i = 0; i < n; i++ ){
        if ( tmp.hasRowConflictAt( i ) ) {
          return true;
        }
      }
      return false; // fixed!!
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var n = board.length;
      var count = 0;

      for ( var row = 0; row < n; row++ ) {
        if ( board[row][colIndex] !== 0 ) {
          count++;
          if ( count > 1 ) {
            return true;
          }
        }
      }

      return false; // 102 105 120 101 100
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = ( this.rows() ).length;

      for ( var col = 0; col < n; col++ ) {
        if ( this.hasColConflictAt( col ) ) {
          return true;
        }
      }

      return false; // 直した！！

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var n = board.length;
      var coord = [ 0, majorDiagonalColumnIndexAtFirstRow ];
      var count = 0;

      while ( coord[0] < n ) {
        //  check if coord[1] >= 0
        //    check board at current coordinate
        //      if piece exists there, increment count
        //        if count > 1, return true;
        //
        //  increment coord[0] and coord[1]
        if ( coord[1] >= 0 && coord[1] < n ) {
          if ( board[coord[0]][coord[1]] !== 0 ) {
            count++;
            if ( count > 1 ) {
              return true;
            }
          }
        }
        coord[0]++;
        coord[1]++;
      }

      return false; // fixed!!!1!
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = ( this.rows() ).length;
      for ( var row1Index = 1 - n; row1Index < n; row1Index++ ) {
        if ( this.hasMajorDiagonalConflictAt( row1Index ) ) {
          return true;
        }
      }

      return false; // fixed SO hard!
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var n = board.length;
      var coord = [ 0, minorDiagonalColumnIndexAtFirstRow ];
      var count = 0;

      while ( coord[0] < n ) {
        //  check if coord[1] >= 0
        //    check board at current coordinate
        //      if piece exists there, increment count
        //        if count > 1, return true;
        //
        //  increment coord[0] and coord[1]
        if ( coord[1] >= 0 && coord[1] < n ) {
          if ( board[coord[0]][coord[1]] !== 0 ) {
            count++;
            if ( count > 1 ) {
              return true;
            }
          }
        }
        coord[0]++;
        coord[1]--;
      }

      return false; // fixed HARD!!!
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = ( this.rows() ).length;
      for ( var row1Index = 0; row1Index <= (2 * (n - 1)); row1Index++ ) {
        if ( this.hasMinorDiagonalConflictAt( row1Index ) ) {
          return true;
        }
      }

      return false; // this was SO fixed. >:D
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
