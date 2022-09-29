import './App.css';
import { PuzzleRender } from './components/PuzzleRender';

function App() {
  return (
    // header with "generate" and "customize" buttons
    // player with puzzle image that lets you play through the puzzle and solve it 
    // eventually, a puzzle solution finder and being able to save puzzles you've solved
    // eventually, a puzzle editor
    // eventually, support for unique puzzle mods
    <div className='app'>
      <div className='header'>
        <div className='buttons'>
          <button className='generate'>Generate!</button>
          <button className='customize'>Customize</button>
        </div>
      </div>
      <div className='player'>
        <div className='puzzle'>
          puzzle goes here
        </div>
      </div>
    </div>
  );
}

export default App;
