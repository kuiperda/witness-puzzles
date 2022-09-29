import './App.css';
import React, { useState } from 'react';
import { classicNameResolver, visitEachChild } from 'typescript';

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
  const [pageToDisplay, setPageToDisplay] = useState('puzzle');
  const [puzzle, setPuzzle] = useState(<div>No puzzle here yet</div>);

  const convertGridToDivs = (grid: Array<Array<String>>) => {
    const puzzleHeight = 80; // sorry, hardcoded, units are vh and it's based on the .puzzle class in the .css file
    const gridSize = grid.length;
    const puzzleImage = grid.map((row: Array<String>, yIndex) => {
      return <div key={`${yIndex}`} className='row' style={{height: `${puzzleHeight / gridSize}vh`}}>
        {row.map((part: String, xIndex) => {
        // console.log(`${yIndex}, ${xIndex}`);
        // return <span key={`${yIndex}.${xIndex}`}>{part}</span>
        switch(part) {
          case 'O': {
            return <span key={`${yIndex}.${xIndex}`} className='entry' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case 'e': {
            return yIndex % 2 === 0 ? 
              <span key={`${yIndex}.${xIndex}`} className='edge' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize / 3}vh`}}></span> :
              <span key={`${yIndex}.${xIndex}`} className='edge' style={{width: `${puzzleHeight / gridSize / 3}vh`, height: `${puzzleHeight / gridSize}vh`}}></span> ;
          }
          case 'v': {
            return <span key={`${yIndex}.${xIndex}`} className='vertex' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case '-': {
            return <span key={`${yIndex}.${xIndex}`} className='egress' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case ' ': {
            return <span key={`${yIndex}.${xIndex}`} className='empty' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          default: {
            return <span key={`${yIndex}.${xIndex}`} className='error' style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
        }
      })}
      </div>
    });
    return puzzleImage;
  };

  // TODO: given them variable state while playing
  const handleClickGenerateButton = () => {
    setPuzzle(<div>{convertGridToDivs(grid)}</div>);
    setPageToDisplay('puzzle');
  }

  const handleClickCustomizeButton = () => setPageToDisplay('customizer');

  return (
    // player with puzzle image that lets you play through the puzzle and solve it 
    // eventually, a puzzle solution finder and being able to save puzzles you've solved
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
