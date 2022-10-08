import './App.css';
import React, { useState , useEffect } from 'react';

function App() {

  // Assumptions this program makes:
  // Grids will have only one entry location, at the bottom left, and one egress location, at the top right.
  // handleMove functions assume grid is a perfect square. 

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

  // Creates a matrix to keep track of which puzzle segments are active for up to 8x8 grids
  let litUpSegmentsArray : Array<Array<Boolean>> = [];
  for (let i = 0; i < 17; i++) {
    let innerRow : Array<Boolean> = [];
    for (let j = 0; j < 17; j++) {
      innerRow.push(false);
    }
    litUpSegmentsArray.push(innerRow);
  }

  // TODO: add much more specific typing to state variables

  // Set which puzzle 'grid' is being played
  const [grid, setGrid] = useState(basic4x4);

  // Set which page is currently being displayed
  // TODO: type this better to only allow valid pages
  const [pageToDisplay, setPageToDisplay] = useState('puzzle');

  // Set the divs that will display the puzzle (use convertGridToDivs for this)
  const [puzzle, setPuzzle] = useState(<div>No puzzle here yet</div>);

  // Set the matrix that keeps track of which segments are active
  const [litUpSegments, setLitUpSegments] = useState(litUpSegmentsArray);

  // Set the array that will keep track of the coordinates of where the player has been in the puzzle
  let pathArray : Array<Array<number>> = [];
  const [playerPath, setPlayerPath] = useState(pathArray); 

  // Take the current grid and make the divs to display the puzzle
  const convertGridToDivs = (grid: Array<Array<String>>) => {
    const puzzleHeight = 80; // sorry, hardcoded, units are vh and it's based on the .puzzle class in the .css file
    const gridSize = grid.length;
    // For each row in the grid, create a div; in each div, create the spans representing each puzzle component
    const puzzleImage = grid.map((row: Array<String>, yIndex) => { 
      return <div key={`${yIndex}`} className='row' style={{height: `${puzzleHeight / gridSize}vh`}}>
        {row.map((part: String, xIndex) => {
          // TODO: add better typing of grid item options
        switch(part) {
          case 'O': {

            // THE PROBLEM: 
            // I'm dynamically generating a list of values to use as togglers for a class in here.
            // but these dynamically generated divs don't know that exists yet and I can't hard code it beforehand. 
            // Hmm... need to figure out some typescript stuff I guess.
            // for now, use the other option, or ASK FOR HELP dude! I'm still stressed about this, why? why should I already know? it's a hard thing to figure out. 
            // but other option would be less elegant, using the ID to override background-color for certain divs whenever you move.

            // Solution: I used an array created at compile time and referenced that instead. Maybe slightly less elegant, but functional. 

            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className={`entry ${litUpSegments[yIndex][xIndex] === true ? 'activeSegment' : ''}`} style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
          }
          case 'e': {
            return yIndex % 2 === 0 ? // even rows are horizontal, odd rows vertical
              <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className={`edge ${litUpSegments[yIndex][xIndex] === true ? 'activeSegment' : ''}`} style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize / 3}vh`}}></span> :
              <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className={`edge ${litUpSegments[yIndex][xIndex] === true ? 'activeSegment' : ''}`} style={{width: `${puzzleHeight / gridSize / 3}vh`, height: `${puzzleHeight / gridSize}vh`}}></span> ;
          }
          case 'v': {
            return <span id={`${yIndex}.${xIndex}`} key={`${yIndex}.${xIndex}`} className={`ertex ${litUpSegments[yIndex][xIndex] === true ? 'activeSegment' : ''}`} style={{width: `${puzzleHeight / gridSize}vh`, height: `${puzzleHeight / gridSize}vh`}}></span>
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
    setPlayerPath([[grid.length - 1, 0]]); // TODO?: Based on the assumption about start location
    setLitUpSegments(prevState => { 
      let startingFreshState = prevState.map(row => {
        return row.map(bool => {
          return bool;
        })
      });
      startingFreshState[grid.length - 1][0] = true; // TODO? Again, based on assumption about start location
      return startingFreshState;
    }); 
    setPageToDisplay('puzzle');
  }

  const handleClickCustomizeButton = () => setPageToDisplay('customizer'); // TODO: better typing of pages


// TODO?: Merge these into one function, they are mostly redundant

  const handleMoveUp = () => {
    let currentY = playerPath[playerPath.length - 1][0];
    let currentX = playerPath[playerPath.length - 1][1];
    // Path is moving backwards, go back one
    if(playerPath.length > 1) {
      if(playerPath[playerPath.length - 2][0] === currentY - 1 && playerPath[playerPath.length - 2][1] === currentX) {
        setPlayerPath(prevState => { // TODO: better way to copy than this?
          let newPath = prevState.map((coordPair) => { 
            return coordPair;
          });
          newPath.pop();
          newPath.pop();
          return newPath;
        });
        setLitUpSegments(prevState => { // TODO: better way to copy than this?
          let newState = prevState.map((row) => {
            return row.map((bool) => {
              return bool;
            })
          });
          newState[currentY][currentX] = !newState[currentY][currentX];
          newState[currentY - 1][currentX] = !newState[currentY - 1][currentX];
          return newState;
        });
        console.log("Went Backwards (Up)");
        return;
      }
      // Path is trying to cross itself, deny this
      let shouldBreak = false;
      playerPath.forEach((coordPair) => {
        if(coordPair[0] === currentY - 2 && coordPair[1] === currentX) {
          console.log("Cannot cross path (Up)");
          shouldBreak = true;
          return;
        }
      });
      if(shouldBreak) {return};
    }
    // Path is moving forward, add next two segments to path and light them up
    if(currentY > 0 && grid[currentY - 1][currentX] === 'e' && grid[currentY - 2][currentX] === 'v') { // TODO: use better types to allow less hardcoding. and to allow finishing the puzzle
      setPlayerPath(prevState => { // TODO: better way to copy than this?
        let newPath = prevState.map((coordPair) => { 
          return coordPair;
        });
        newPath.push([currentY - 1, currentX]);
        newPath.push([currentY - 2, currentX]);
        return newPath;
      });
      setLitUpSegments(prevState => { // TODO: better way to copy than this?
        let newState = prevState.map((row) => {
          return row.map((bool) => {
            return bool;
          })
        });
        newState[currentY - 1][currentX] = !newState[currentY - 1][currentX];
        newState[currentY - 2][currentX] = !newState[currentY - 2][currentX];
        return newState;
      });
      console.log("Moved Forwards (Up)");
      return;
    }
    console.log("Error trying to move up");
  }

  const handleMoveDown = () => {
    let currentY = playerPath[playerPath.length - 1][0];
    let currentX = playerPath[playerPath.length - 1][1];
    // Path is moving backwards, go back one
    if(playerPath.length > 1) {
      if(playerPath[playerPath.length - 2][0] === currentY + 1 && playerPath[playerPath.length - 2][1] === currentX) {
        setPlayerPath(prevState => { // TODO: better way to copy than this?
          let newPath = prevState.map((coordPair) => { 
            return coordPair;
          });
          newPath.pop();
          newPath.pop();
          return newPath;
        });
        setLitUpSegments(prevState => { // TODO: better way to copy than this?
          let newState = prevState.map((row) => {
            return row.map((bool) => {
              return bool;
            })
          });
          newState[currentY][currentX] = !newState[currentY][currentX];
          newState[currentY + 1][currentX] = !newState[currentY + 1][currentX];
          return newState;
        });
        console.log("Went Backwards (Down)");
        return;
      }
      // Path is trying to cross itself, deny this
      let shouldBreak = false;
      playerPath.forEach((coordPair) => {
        if(coordPair[0] === currentY + 2 && coordPair[1] === currentX) {
          console.log("Cannot cross path (Down)");
          shouldBreak = true;
          return;
        }
      });
      if(shouldBreak) {return};
    }
    // Path is moving forward, add next two segments to path and light them up
    if(currentY < grid.length - 1 && grid[currentY + 1][currentX] === 'e' && grid[currentY + 2][currentX] === 'v') { // TODO: use better types to allow less hardcoding. and to allow finishing the puzzle
      setPlayerPath(prevState => { // TODO: better way to copy than this?
        let newPath = prevState.map((coordPair) => { 
          return coordPair;
        });
        newPath.push([currentY + 1, currentX]);
        newPath.push([currentY + 2, currentX]);
        return newPath;
      });
      setLitUpSegments(prevState => { // TODO: better way to copy than this?
        let newState = prevState.map((row) => {
          return row.map((bool) => {
            return bool;
          })
        });
        newState[currentY + 1][currentX] = !newState[currentY + 1][currentX];
        newState[currentY + 2][currentX] = !newState[currentY + 2][currentX];
        return newState;
      });
      console.log("Moved Forwards (Down)");
      return;
    }
    console.log("Error trying to move down");
  }

  const handleMoveLeft = () => {
    let currentY = playerPath[playerPath.length - 1][0];
    let currentX = playerPath[playerPath.length - 1][1];
    // Path is moving backwards, go back one
    if(playerPath.length > 1) {
      if(playerPath[playerPath.length - 2][0] === currentY && playerPath[playerPath.length - 2][1] === currentX - 1) {
        setPlayerPath(prevState => { // TODO: better way to copy than this?
          let newPath = prevState.map((coordPair) => { 
            return coordPair;
          });
          newPath.pop();
          newPath.pop();
          return newPath;
        });
        setLitUpSegments(prevState => { // TODO: better way to copy than this?
          let newState = prevState.map((row) => {
            return row.map((bool) => {
              return bool;
            })
          });
          newState[currentY][currentX] = !newState[currentY][currentX];
          newState[currentY][currentX - 1] = !newState[currentY][currentX - 1];
          return newState;
        });
        return;
      }
      // Path is trying to cross itself, deny this
      let shouldBreak = false;
      playerPath.forEach((coordPair) => {
        if(coordPair[0] === currentY && coordPair[1] === currentX - 2) {
          console.log("Cannot cross path (Left)");
          shouldBreak = true;
          return;
        }
      });
      if(shouldBreak) {return};
    }
    // Path is moving forward, add next two segments to path and light them up
    if(currentX > 0 && grid[currentY][currentX - 1] === 'e' && grid[currentY][currentX - 2] === 'v') { // TODO: use better types to allow less hardcoding. and to allow finishing the puzzle
      setPlayerPath(prevState => { // TODO: better way to copy than this?
        let newPath = prevState.map((coordPair) => { 
          return coordPair;
        });
        newPath.push([currentY, currentX - 1]);
        newPath.push([currentY, currentX - 2]);
        return newPath;
      });
      setLitUpSegments(prevState => { // TODO: better way to copy than this?
        let newState = prevState.map((row) => {
          return row.map((bool) => {
            return bool;
          })
        });
        newState[currentY][currentX - 1] = !newState[currentY][currentX - 1];
        newState[currentY][currentX - 2] = !newState[currentY][currentX - 2];
        return newState;
      });
      console.log("Moved Forwards (Left)");
      return;
    }
    console.log("Error trying to move left");
  }

  const handleMoveRight = () => {
    let currentY = playerPath[playerPath.length - 1][0];
    let currentX = playerPath[playerPath.length - 1][1];
    // Path is moving backwards, go back one
    if(playerPath.length > 1) {
      if(playerPath[playerPath.length - 2][0] === currentY && playerPath[playerPath.length - 2][1] === currentX + 1) {
        setPlayerPath(prevState => { // TODO: better way to copy than this?
          let newPath = prevState.map((coordPair) => { 
            return coordPair;
          });
          newPath.pop();
          newPath.pop();
          return newPath;
        });
        setLitUpSegments(prevState => { // TODO: better way to copy than this?
          let newState = prevState.map((row) => {
            return row.map((bool) => {
              return bool;
            })
          });
          newState[currentY][currentX] = !newState[currentY][currentX];
          newState[currentY][currentX + 1] = !newState[currentY][currentX + 1];
          return newState;
        });
        console.log("Went Backwards (Right)");
        return;
      }
      // Path is trying to cross itself, deny this
      let shouldBreak = false;
      playerPath.forEach((coordPair) => {
        if(coordPair[0] === currentY && coordPair[1] === currentX + 2) {
          console.log("Cannot cross path (Right)");
          shouldBreak = true;
          return;
        }
      });
      if(shouldBreak) {return};
    }
    // Path is moving forward, add next two segments to path and light them up
    if(currentX < grid.length - 1 && grid[currentY][currentX + 1] === 'e' && grid[currentY][currentX + 2] === 'v') { // TODO: use better types to allow less hardcoding. and to allow finishing the puzzle
      setPlayerPath(prevState => { // TODO: better way to copy than this?
        let newPath = prevState.map((coordPair) => { 
          return coordPair;
        });
        newPath.push([currentY, currentX + 1]);
        newPath.push([currentY, currentX + 2]);
        return newPath;
      });
      setLitUpSegments(prevState => { // TODO: better way to copy than this?
        let newState = prevState.map((row) => {
          return row.map((bool) => {
            return bool;
          })
        });
        newState[currentY][currentX + 1] = !newState[currentY][currentX + 1];
        newState[currentY][currentX + 2] = !newState[currentY][currentX + 2];
        return newState;
      });
      console.log("Moved Forwards (Right)");
      return;
    }
    console.log("Error trying to move right");
  }

  // Whenever the litUpSegments state changes (normally on keydown), recreate the puzzle to reflect the changes
  // TODO: handle any problems with the first load of the puzzle before hitting generate (it gets created immediately, atm)
  // Including 'entry' not being lit up before generate
  useEffect(() => {
    setPuzzle(<div>{convertGridToDivs(grid)}</div>); // TODO: figure out how to make puzzle update without recreating it
  }, [litUpSegments]);

  // TODO: figure out how to keep focus on the puzzle when it is on screen
  // Captures key presses so puzzle can be played (with WASD)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key.toUpperCase()) {
      case 'W': {
        handleMoveUp();
        break;
      }
      case 'S': {
        handleMoveDown();
        break;
      }
      case 'A': {
        handleMoveLeft();
        break;
      }
      case 'D': {
        handleMoveRight();
        break;
      }
    }
    console.log(playerPath);
  }

  return (
    // TODO: make it so basic (nonlogic) puzzle is solveable by reaching the egress


    // TODO: make a makeNxN function for starters
    // TODO: reset puzzle parameters on generate, but also consider allowing players to return to puzzle without hitting generate (from cust)
    // break into more modular components
    // TODO: make separate list for toggling 
    // TODO: ? use a type instead of 'v' for vertex for future additions
    // TODO: give puzzleImage divs a variable state while playing. used an ID, now make a player and access it
    // you can make a separate playerposition grid and have logic from there update the image, you know the logic already
    // player with puzzle image that lets you play through the puzzle and solve it 
    // then add extra rules and checking if you can solve them
    // then add puzzle generator and customization
    // div to png ? for puzzle saving and editing UI
    // eventually, a puzzle solution finder and being able to save puzzles you've solved- could make this really cool looking
      // like having it try a bunch of paths in real time automatically in front of you then pause when it finds a solution, then 'next'
    // eventually, a puzzle editor
    // eventually, support for unique puzzle mods
    <div className='app' onKeyDown={handleKeyDown}>
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
