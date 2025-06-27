import { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
const PCQCalculator = ({ session, subscription }: Props) => {
    const [totalClient, setTotalClient] = useState(40);
    const [queueSize, setQueueSize] = useState(50);
    const [rate, setRate] = useState(512);
    const [burstRate, setBurstRate] = useState(1);
    const [burstTime, setBurstTime] = useState(16);
    const [burstThreshold, setBurstThreshold] = useState(384);

    const calculateTotalQueueSize = () => {
        return totalClient * queueSize;
    };

    const calculateActualBurstTime = () => {
        return (burstThreshold * burstTime) / burstRate;
    };

    return (
<div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg min-h-[70vh]">
    {/* PCQ Queue Size */}
    <div className="flex flex-col gap-6 lg:w-1/2">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-100 mb-4">PCQ QUEUE SIZE</h2>
            <div className="mb-4">
                <label htmlFor="totalClient" className="block text-sm font-semibold text-gray-300 mb-2">Total Client (Sub Queue)</label>
                <input
                    id="totalClient"
                    type="number"
                    value={totalClient}
                    onChange={(e) => setTotalClient(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="queueSize" className="block text-sm font-semibold text-gray-300 mb-2">Queue Size (Limit)</label>
                <input
                    id="queueSize"
                    type="number"
                    value={queueSize}
                    onChange={(e) => setQueueSize(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <h2 className="text-xl font-bold text-gray-100 mb-4 mt-6">PCQ BURST RATE</h2>
            <div className="mb-4">
                <label htmlFor="rate" className="block text-sm font-semibold text-gray-300 mb-2">Rate (K/M)</label>
                <input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="burstRate" className="block text-sm font-semibold text-gray-300 mb-2">Burst Rate (K/M)</label>
                <input
                    id="burstRate"
                    type="number"
                    value={burstRate}
                    onChange={(e) => setBurstRate(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="burstTime" className="block text-sm font-semibold text-gray-300 mb-2">Actual Burst Time (s)</label>
                <input
                    id="burstTime"
                    type="number"
                    value={burstTime}
                    onChange={(e) => setBurstTime(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            <button
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-all duration-300"
                onClick={() => {}}
            >
                CALCULATE
            </button>
                 <SocialTooltipButton />
        </div>
   
    </div>

    {/* Copy Paste Burst Result on Winbox */}
    <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-100 mb-4">COPY PASTE BURST RESULT ON WINBOX</h2>
            <div className="mb-4">
                <div className="flex justify-between mb-1 p-2  bg-orange-700">
                    <span className=" text-gray-300 font-bold">PCQ Type</span>
                    <span className="text-white font-bold">Resultado</span>
                </div>
                <div className="flex justify-between  mb-1 p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Rate</span>
                    <span className="text-green-500 font-extrabold">{rate}K</span>
                </div>
                <div className="flex justify-between mb-1 p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Queue Size</span>
                    <span className="text-sky-400 font-extrabold">{queueSize}</span>
                </div>
                <div className="flex justify-between mb-1 p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Total Queue Size</span>
                    <span className="text-violet-600 font-extrabold">{calculateTotalQueueSize()} KiB</span>
                </div>
                <div className="flex justify-between mb-1  p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Burst Rate</span>
                    <span className="text-red-400 font-extrabold">{burstRate}M</span>
                </div>
                <div className="flex justify-between mb-1  p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Burst Threshold</span>
                    <span className="text-yellow-400 font-extrabold">{burstThreshold}K</span>
                </div>
                <div className="flex justify-between mb-1  p-2 border text-slate-300">
                    <span className="text-gray-400 font-bold">Burst Time</span>
                    <span className="text-red-600 font-extrabold">{burstTime}</span>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">PCQ Queue Size:</h3>
                <p className="text-gray-400 text-sm mb-2">
                    Total Queue Size = (Total Client * Queue Size) <br />
                    Total Queue Size = ({totalClient} * {queueSize}) = {calculateTotalQueueSize()} KiB
                </p>
                <p className="text-gray-400 text-sm mb-2">
                    From {totalClient} client it can get {queueSize} packets per client with {calculateTotalQueueSize()} Size Total Packets. With {calculateTotalQueueSize()} size total packets it can drain {calculateTotalQueueSize() / 1024}MB of RAM Router.
                </p>
                <h3 className="text-sm font-semibold text-gray-300 mb-2 mt-4">PCQ Burst Result:</h3>
                <p className="text-gray-400 text-sm mb-2">
                    Actual Burst Time = (Burst Threshold * Burst Time) / Burst Rate <br />
                    Actual Burst Time = ({burstThreshold} * {burstTime}) / {burstRate}M = {calculateActualBurstTime()} second
                </p>
                <p className="text-gray-400 text-sm">
                    Every Client (sub queue) can get Burst Speed to {burstRate}M in {calculateActualBurstTime()} second.
                </p>
            </div>
        </div>
    </div>
</div>


    );
};

export default PCQCalculator;
