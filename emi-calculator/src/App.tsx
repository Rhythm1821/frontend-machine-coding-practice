import React, { useEffect, useState } from 'react';
import './App.css';
import { tenures } from './utils/constants';

function App() {
  const [cost, setCost] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(12); // Default to 12 months (1 year)
  const [downpayment, setDownpayment] = useState<number>(0);
  const [emi, setEmi] = useState<number | undefined>(undefined);

  const updateEmi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dp = e.target.valueAsNumber;
    setDownpayment(dp);
    const emiValue = calculateEMI(dp);
    setEmi(emiValue);
  };

  const calculateEMI = (downpayment: number): number | undefined => {
    if (!cost || !interest || !tenure) return undefined;

    const loanAmount = cost - downpayment;
    const rateOfInterest = interest / 1200; // Convert annual interest to monthly interest
    const numOfMonths = tenure;

    if (rateOfInterest === 0) {
      // Handle case where interest is 0 (simple division)
      return loanAmount / numOfMonths;
    }

    // EMI Formula
    const EMI =
      (loanAmount * rateOfInterest * Math.pow(1 + rateOfInterest, numOfMonths)) /
      (Math.pow(1 + rateOfInterest, numOfMonths) - 1);

    return Number(EMI.toFixed(2));
  };

  useEffect(() => {
    const emiValue = calculateEMI(downpayment);
    setEmi(emiValue);
  },[cost, interest, tenure, downpayment]);

  return (
    <>
      <h1>EMI Calculator</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="card">
        <label style={{ textAlign: 'left' }} htmlFor="principal">
          Total Cost
        </label>
        <input
          style={{ padding: '10px' }}
          type="number"
          min={0}
          onChange={(e) => {
            setCost(e.target.valueAsNumber || 0);
            setDownpayment(0); // Reset downpayment on cost change
            setEmi(undefined); // Reset EMI
          }}
        />

        <label style={{ textAlign: 'left' }} htmlFor="interest">
          Interest (% per annum)
        </label>
        <input
          style={{ padding: '10px' }}
          type="number"
          min={0}
          onChange={(e) => setInterest(e.target.valueAsNumber || 0)}
        />

        <span>Downpayment</span>
        <div>
          <input
            type="range"
            min={0}
            max={cost}
            value={downpayment}
            onChange={updateEmi}
          />
          <div className="labels">
            <label>₹0</label>
            <b>₹{downpayment}</b>
            <label>₹{cost}</label>
          </div>
        </div>

        <span>Loan per month</span>
        <div>
          <input type="text" readOnly value={emi ? `₹${emi}` : 'N/A'} />
        </div>

        <span>Tenure (Months)</span>
        <div className="tenure">
          {tenures.map((t: number) => (
            <button
              key={t}
              className={`${tenure === t ? 'selected-tenure' : ''}`}
              onClick={() => {
                setTenure(t);
                const emiValue = calculateEMI(downpayment);
                setEmi(emiValue); // Recalculate EMI on tenure change
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
