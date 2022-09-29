import React from 'react';

export class PuzzleRender extends React.Component {

    render() {

        //make an example puzzle
        let example = [
            ["O", "-", "O", "-", "O"],
            ["|", " ", "|", " ", "|"],
            ["O", "-", "O", "-", "O"],
            ["|", " ", "|", " ", "|"],
            ["O", "-", "O", "-", "O"]
        ]

        let puzzle = () => {
            example.map( (row) => {
                
            });
        }
        
        return(
            <div className='puzzleContainer'>
                {puzzle}
            </div>
        )
    }
}