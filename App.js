import React from 'react';
import {View} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.seatArray = [
      [3, 4],
      [1, 2],
      [2, 3],
    ];
  }

  componentDidMount() {
    this.maxRow = this.seatArray[0][0];
    for (var i = 1; i < this.seatArray.length; i++) {
      if (this.seatArray[i][0] > this.maxRow) {
        this.maxRow = this.seatArray[i][0];
      }
    }
    console.log('MaxRow:', this.maxRow);

    this.maxColumn = this.seatArray[0][1];
    for (var i = 1; i < this.seatArray.length; i++) {
      if (this.seatArray[i][1] > this.maxColumn) {
        this.maxColumn = this.seatArray[i][1];
      }
    }
    console.log('MaxColumn:', this.maxColumn);

    this.setSeatType(this.seatArray);
  }

  setSeatType = array => {
    var seatType = [];

    for (var i = 0; i < array.length; i++) {
      var tempArr = [];
      for (var j = 0; j < array[i][0]; j++) {
        var rowItems = '';
        for (var k = 0; k < array[i][1]; k++) {
          rowItems = rowItems + 'M';
        }
        tempArr.push(rowItems);
      }
      seatType.push(tempArr);
    }

    for (var i = 0; i < seatType.length; i++) {
      for (var j = 0; j < seatType[i].length; j++) {
        seatType[i][j] = seatType[i][j].replace(seatType[i][j].charAt(0), 'A');
        seatType[i][j] = seatType[i][j].replace(/.$/, 'A');
      }
    }

    for (var i = 0; i < seatType[0].length; i++) {
      seatType[0][i] = seatType[0][i].replace(seatType[0][i].charAt(0), 'W');
    }
    for (var i = 0; i < seatType[seatType.length - 1].length; i++) {
      seatType[seatType.length - 1][i] = seatType[seatType.length - 1][
        i
      ].replace(/.$/, 'W');
    }

    console.log('SeatType', seatType);

    this.assignNumber(seatType);
  };

  assignNumber = array => {
    this.count = 1;
    var res1 = this.changeNumber('A', array);
    var res2 = this.changeNumber('W', res1);
    var res3 = this.changeNumber('M', res2);

    console.log('final', res3);

    this.showUI(res3);
  };

  changeNumber = (type, array) => {
    for (var i = 0; i < this.maxColumn; i++) {
      for (var j = 0; j < this.maxRow; j++) {
        if (array[j] == null || array[j][i] == null) continue;
        for (var k = 0; k < array[j][i].length; k++) {
          if (
            array[j] != null &&
            array[j][i] != null &&
            array[j][i].charAt(k) === type
          ) {
            array[j][i] = array[j][i].replace(
              array[j][i].charAt(k),
              ' ' + this.count + ' ',
            );
            this.count++;
          }
        }
      }
    }

    console.log('array', array);
    return array;
  };

  showUI = array => {
    var final = '\n';
    for (var i = 0; i < this.maxColumn - 1; i++) {
      for (var j = 0; j < this.maxRow; j++) {
        if (array[j] == null || array[j][i] == null) {
          var originalLengthArray = array[j][0].split(' ').filter(Boolean);

          for (var p = 0; p < originalLengthArray.length; p++) {
            final += '   -   ';
          }
          final += ',';

          continue;
        }
        for (var k = 0; k < array[j][i].length; k++) {
          final += array[j][i].charAt(k) + ' ';
        }

        final = final + ', ';
      }
      final = final + '\n';
    }
    console.log('INPUT: ', this.seatArray);
    console.log(final);
  };

  render() {
    return <View />;
  }
}

export default App;
