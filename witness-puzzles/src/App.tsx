import './App.css';
import React, { useState } from 'react';

function App() {

  const basic2x2 = [
    ['v', 'e', 'v', 'e', '-'],
    ['e', ' ', 'e', ' ', 'e'],
    ['v', 'e', 'v', 'e', 'v'],
    ['e', ' ', 'e', ' ', 'e'],
    ['O', 'e', 'v', 'e', 'v'],
  ];

  const basic4x4 = [
    ['v', 'e', 'v', 'e', 'v', 'e', 'v', 'e', '-'],
    ['e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e'],
    ['v', 'e', 'v', 'e', 'v', 'e', 'v', 'e', 'v'],
    ['e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e'],
    ['v', 'e', 'v', 'e', 'v', 'e', 'v', 'e', 'v'],
    ['e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e'],
    ['v', 'e', 'v', 'e', 'v', 'e', 'v', 'e', 'v'],
    ['e', ' ', 'e', ' ', 'e', ' ', 'e', ' ', 'e'],
    ['O', 'e', 'v', 'e', 'v', 'e', 'v', 'e', 'v'],
  ]

  const [grid, setGrid] = useState(basic2x2);
  // const [playerGrid, setPlayerGrid] = useState(basic2x2); 
  const [pageToDisplay, setPageToDisplay] = useState('puzzle');
  const [puzzle, setPuzzle] = useState(<div>No puzzle here yet</div>);

  const convertGridToDivs = (grid: Array<Array<String>>) => {
    const puzzleHeight = 80; // sorry, hardcoded, units are vh and it's based on the .puzzle class in the .css file
    const gridSize = grid.length;
    const puzzleImage = grid.map((row: Array<String>, yIndex) => {
      return <div key={`${yIndex}`} className='row' style={{height: `${puzzleHeight / gridSize}vh`}}>
        {row.map((part: String, xIndex) => {
        switch(part) {
          case 'O': {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='entry' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case 'e': {
            return yIndex % 2 === 0 ? 
              <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='edge' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize / 3}vh`}}></span> :
              <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='edge' style={{width: `${puzzleHeight / gridSize / 3}vh`, height: `${puzzleHeight / gridSize}vh`}}></span> ;
          }
          case 'v': {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='vertex' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case '-': {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='egress' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case ' ': {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='empty' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          default: {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className='error' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
        }
      })}
      </div>
    });
    return puzzleImage;
  };

  const handleClickGenerateButton = () => {
    setPuzzle(<div>{convertGridToDivs(grid)}</div>);
    setPageToDisplay('puzzle');
  }

  const handleClickCustomizeButton = () => setPageToDisplay('customizer');

  return (
    // TODO: give puzzleImage divs a variable state while playing. used an ID, now make a player and access it
    // you can make a separate playerposition grid and have logic from there update the image, you know the logic already
    // player with puzzle image that lets you play through the puzzle and solve it 
    // then add extra rules and checking if you can solve them
    // then add puzzle generator and customization
    // eventually, a puzzle solution finder and being able to save puzzles you've solved- could make this really cool looking
      // like having it try a bunch of paths in real time automatically in front of you then pause when it finds a solution, then 'next'
    // eventually, a puzzle editor
    // eventually, support for unique puzzle mods
    <div className='app'>
      <div className='header'>
        <div className='buttons'>
          <button className='generate' onClick={handleClickGenerateButton}>Generate!</button>
          <button className='customize' onClick={handleClickCustomizeButton}>Customize</button>
        </div>
      </div>
      <div className='body'>
        {pageToDisplay === 'puzzle' && 
          <div className='puzzle'>
            {puzzle}
          </div>
        }
        {pageToDisplay === 'customizer' && 
          <div className='customizer'>
            custom!
          </div>
        }
      </div> 
    </div>
  );
}

export default App;
