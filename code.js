document.addEventListener('DOMContentLoaded', function () {
  createGrid();

  function createGrid(size = 16) {
    const grid = document.getElementById('grid');

    for (let i = 0; i < size; i++) {
      const row = document.createElement('div');
      row.classList.add('rowContainer');

      for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
      }

      grid.appendChild(row);
    }
    const gridSizeMsg = '*The grid size is now ' + size + 'x' + size;
    document.querySelector('#currentSize').innerHTML = gridSizeMsg;
    drawing();
  }

  let erasing = false;

  const eraser = document.querySelector('#btnEraser');
  eraser.addEventListener('click', function () {
    if (!erasing) {
      eraser.classList.toggle('hover-effect');
      erasing = true;
    } else {
      eraser.classList.remove('hover-effect');
      erasing = false;
    }
  });

  function deleteGrid(rows) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].remove();
      console.log(rows.length);
    }
  }
  function drawing() {
    let cells = document.querySelectorAll('.cell');
    let isDrawing = false;

    cells.forEach(function (cell) {
      cell.addEventListener('mousedown', function () {
        isDrawing = true;
        if (!erasing) {
          cell.classList.add('active');
        } else {
          cell.classList.remove('active');
        }
      });

      cell.addEventListener('mouseover', function () {
        if (isDrawing && !erasing) {
          cell.classList.add('active');
        }
        if (isDrawing && erasing) {
          cell.classList.remove('active');
        }
      });
      document.addEventListener('mouseup', function () {
        isDrawing = false;
      });
    });

    const clear = document.querySelector('#btnClear');
    clear.addEventListener('click', function () {
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('active');
      }
    });
  }

  const btnChange = document.querySelector('#btnChange');
  const sizeInput = document.querySelector('#gridSizeInput');

  btnChange.addEventListener('click', function () {
    const rows = document.querySelectorAll('.rowContainer');

    console.log(rows.length);

    deleteGrid(rows);
    console.log(rows.length);

    let size = sizeInput.value;
    if (size < 100) {
      createGrid(size);
    } else {
      alert('Size shouldnt be more than 100');
    }
  });
});
