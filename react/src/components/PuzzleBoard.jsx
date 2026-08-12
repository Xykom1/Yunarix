import { useMemo, useState } from "react";

function PuzzleBoard({ image, gridSize, completed, onComplete, onMove }) {

    const [pieces, setPieces] = useState(() => {

        const totalPieces = gridSize * gridSize;

        const generatedPieces = [];

        for (let i = 0; i < totalPieces; i++) {

            const row = Math.floor(i / gridSize);
            const col = i % gridSize;

            generatedPieces.push({
                id: i,
                correctPosition: i,
                row,
                col
            });

        }

        // Mélange des pièces
        for (let i = generatedPieces.length - 1; i > 0; i--) {

            const randomIndex = Math.floor(Math.random() * (i + 1));

            [
                generatedPieces[i],
                generatedPieces[randomIndex]
            ] = [
                    generatedPieces[randomIndex],
                    generatedPieces[i]
                ];

        }

        return generatedPieces;

    });

    const [draggedPiece, setDraggedPiece] = useState(null);


    function handleDragStart(index) {
        if (completed) {
            return;
        }
        setDraggedPiece(index);

    }


    function handleDragOver(event) {

        event.preventDefault();

    }


    function handleDrop(index) {
        if (completed) {
            return;
        }

        if (draggedPiece === null || draggedPiece === index) {
            return;
        }

        const newPieces = [...pieces];

        [
            newPieces[draggedPiece],
            newPieces[index]
        ] = [
                newPieces[index],
                newPieces[draggedPiece]
            ];

        setPieces(newPieces);
        setDraggedPiece(null);

        onMove();

        const puzzleCompleted = newPieces.every(
            (piece, position) => piece.correctPosition === position
        );

        if (puzzleCompleted) {
            onComplete();
        }

    }


    return (

        <div
            className="puzzle-board"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`
            }}
        >

            {pieces.map((piece, index) => (

                <div
                    key={piece.id}

                    className="puzzle-piece"

                    draggable

                    onDragStart={() => handleDragStart(index)}

                    onDragOver={handleDragOver}

                    onDrop={() => handleDrop(index)}

                    style={{
                        backgroundImage: `url(/src/assets/images/puzzles/${image})`,
                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                        backgroundPosition: `
                            ${(piece.col / (gridSize - 1)) * 100}%
                            ${(piece.row / (gridSize - 1)) * 100}%
                        `
                    }}
                />

            ))}

        </div>

    );

}

export default PuzzleBoard;