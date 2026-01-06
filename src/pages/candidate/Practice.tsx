import React, { useState } from 'react';
import {
    Code,
    Terminal,
    Play,
    CheckCircle,
    Cpu,
    RotateCcw
} from 'lucide-react';

const mockProblem = {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`
};

const PracticeArena: React.FC = () => {
    const [code, setCode] = useState(mockProblem.starterCode);
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setOutput(null);
        // Mock execution delay
        setTimeout(() => {
            setIsRunning(false);
            setOutput("Test Case 1: Passed\nTest Case 2: Passed\n> All tests passed! (42ms)");
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">

            {/* Problem Description */}
            <div className="lg:w-1/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">Easy</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{mockProblem.title}</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="prose prose-sm prose-slate max-w-none">
                        <p>{mockProblem.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Examples</h3>
                        {mockProblem.examples.map((ex, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Input</p>
                                <code className="text-sm font-mono text-slate-800 break-words">{ex.input}</code>
                                <p className="text-xs font-bold text-slate-500 uppercase mt-3 mb-1">Output</p>
                                <code className="text-sm font-mono text-slate-800 break-words">{ex.output}</code>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col gap-4">

                <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
                    {/* Editor Header */}
                    <div className="h-12 bg-slate-950 flex items-center justify-between px-4 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Code className="w-4 h-4" /> JavaScript
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCode(mockProblem.starterCode)}
                                className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                                title="Reset Code"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Editor Area (Mock) */}
                    <div className="flex-1 relative font-mono text-sm">
                        <div className="absolute inset-0 p-4 text-emerald-300">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-transparent outline-none resize-none font-mono leading-relaxed"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Console / Actions */}
                <div className="h-48 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg flex flex-col overflow-hidden">
                    <div className="h-10 bg-slate-950 flex items-center justify-between px-4 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Terminal className="w-3 h-3" /> Console
                        </div>
                        <div className="flex gap-2 py-1">
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition disabled:opacity-50"
                            >
                                {isRunning ? <Cpu className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                                Run Code
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
                        {!output && !isRunning && <span className="text-slate-600 italic">Run execution to see output...</span>}
                        {isRunning && <span className="text-emerald-400 animate-pulse">Running test cases...</span>}
                        {output && <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeArena;
