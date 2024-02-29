import { useState, useEffect } from 'react';

const App = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [timerLabel, setTimerLabel] = useState('Session');
    const [timerRunning, setTimerRunning] = useState(false);
    const audio = new Audio('https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav');

    useEffect(() => {
        if (timerLabel === 'Session' && !timerRunning) {
            setTimeLeft(sessionLength * 60);
        }
    }, [sessionLength]);

    useEffect(() => {
        let timer;

        if (timerRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timerRunning && timeLeft === 0) {
            const nextLabel = timerLabel === 'Session' ? 'Break' : 'Session';
            setTimerLabel(nextLabel);
            setTimeLeft((nextLabel === 'Session' ? sessionLength : breakLength) * 60);
            audio.play();
        }
        return () => {
            clearInterval(timer);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [timerRunning, timeLeft, timerLabel, breakLength, sessionLength]);

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        setTimerLabel('Session');
        setTimerRunning(false);
        audio.pause();
        audio.currentTime = 0;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-100">
            <h1 className="text-4xl font-bold text-lime-500">
               25-5-clock
            </h1>
            <div className="p-6 bg-slate-700 rounded shadow-md">
                <div className="grid grid-cols-3 items-center justify-items-center">
                    <div className="flex flex-col items-center space-y-2">
                        <div id="break-length" className="text-lg text-blue-600">{breakLength}</div>
                        <button id="break-increment" className="px-3 py-2 bg-green-500 text-white rounded" onClick={() => setBreakLength(breakLength + 1)}>Up</button>
                        <div id="break-label" className="text-lg font-bold text-blue-600">Break Length</div>
                        <button id="break-decrement" className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => setBreakLength(breakLength - 1)}>Down</button>
                    </div>
                    <div className="text-center bg-lime-300 rounded w-[15rem]">
                        <div id="timer-label" className="mt-4 text-2xl font-bold text-blue-600">{timerLabel}</div>
                        <div id="time-left" className={`mt-2 text-2xl ${timeLeft <= 60 ? 'text-red-600' : 'text-blue-600'}`}>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div id="session-length" className="text-lg text-blue-600">{sessionLength}</div>
                        <button id="session-increment" className="px-3 py-2 bg-green-500 text-white rounded" onClick={() => setSessionLength(sessionLength + 1)}>Up</button>
                        <div id="session-label" className="text-lg font-bold text-blue-600">Session Length</div>
                        <button id="session-decrement" className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => setSessionLength(sessionLength - 1)}>Down</button>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <button id="start_stop" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setTimerRunning(!timerRunning)}>{timerRunning ? 'Pause' : 'Start'}</button>
                    <button id="reset" className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    );
};


export default App;
