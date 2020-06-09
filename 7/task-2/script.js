let cells = [];
const $cells = $('.board td');
const $result = $('.result');
const $playAgain = $('.play-again');

const resetBoard = () => {
  $cells.each(function (index) {
    $(this).on('click', () => clickCell(this, index));
    $(this).text('-');
  });
  $result.text('Play!');
  cells = [];
};

const whoWon = () => {
  if($($cells[0]).text() === $($cells[1]).text()  && 
     $($cells[1]).text()  === $($cells[2]).text() && 
     $($cells[0]).text() !== '-') return $($cells[0]).text()

  if($($cells[3]).text() === $($cells[4]).text()  && 
     $($cells[4]).text()  === $($cells[5]).text() && 
     $($cells[3]).text() !== '-') return $($cells[3]).text()

  if($($cells[6]).text() === $($cells[7]).text()  && 
     $($cells[7]).text()  === $($cells[8]).text() && 
     $($cells[6]).text() !== '-') return $($cells[6]).text()

  if($($cells[0]).text() === $($cells[3]).text()  && 
     $($cells[3]).text()  === $($cells[6]).text() && 
     $($cells[0]).text() !== '-') return $($cells[0]).text()

  if($($cells[1]).text() === $($cells[4]).text()  && 
     $($cells[4]).text()  === $($cells[7]).text() && 
     $($cells[1]).text() !== '-') return $($cells[1]).text()

  if($($cells[2]).text() === $($cells[5]).text()  && 
     $($cells[5]).text()  === $($cells[8]).text() && 
     $($cells[2]).text() !== '-') return $($cells[2]).text()

  if($($cells[0]).text() === $($cells[4]).text()  && 
     $($cells[4]).text()  === $($cells[8]).text() && 
     $($cells[0]).text() !== '-') return $($cells[0]).text()

  if($($cells[2]).text() === $($cells[4]).text()  && 
     $($cells[4]).text()  === $($cells[6]).text() && 
     $($cells[2]).text() !== '-') return $($cells[2]).text()

  return undefined;
}

const checkForWinner = () => {
    let winner = whoWon();
    if (winner != undefined) {
      $result.text(`${winner} won!`);
      const $winnerPoitns = $(`#${winner}-score`);
      $winnerPoitns.text(parseInt($winnerPoitns.text()) + 1);

      $cells.each(function () {
        $(this).off();
      });

      $playAgain.show();
      return true;
    }

  if (cells.length === 9) {
    $result.text('Its a Draw!');
    $playAgain.show();
    return true;
  }
  return false;
}

const clickCell = (obj, index) => {
  cells.push(index);
  $(obj).off('click');
  $(obj).text('O');

  if (checkForWinner()) return;

  let xIndex;
  do xIndex = Math.floor(Math.random() * 9);
  while (cells.includes(xIndex));

  cells.push(xIndex);
  $($cells[xIndex]).text('X');
  $($cells[xIndex]).off('click');

  if (checkForWinner()) return;
};

$playAgain.on('click', function () {
  $playAgain.hide();
  resetBoard();
});

resetBoard(); 