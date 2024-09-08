import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, onReset },
  ref
) {
  const dialogRef = useRef();
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef} className="result-modal">
      {userLost && <h2>Your Lose</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was: <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stop the timer with <strong>{formattedRemainingTime} second</strong>{" "}
        left.
      </p>
      <form onSubmit={onReset} action="" method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
