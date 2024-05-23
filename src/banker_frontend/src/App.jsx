import { useEffect, useState } from 'react'
import { banker_backend } from 'declarations/banker_backend'
import dbank_logo from '../assets/dbank_logo.png'

function App() {
  const [currentVal, setCurrentVal] = useState('')
  const [fundAmt, setFundAmt] = useState('')
  const [withdrawAmt, setWithdrawAmt] = useState('')
  const [submiting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await banker_backend.getBalance()
    setCurrentVal(result)
  }

  const fundAccount = async () => {
    if (fundAmt < 1) return
    setSubmitting(true)
    await banker_backend.fundAccount(parseFloat(fundAmt)).then(async () => {
      await fetchData()
      setFundAmt('')
      setSubmitting(false)
    })
  }

  const withdrawFund = async () => {
    if (withdrawAmt > currentVal) return
    setSubmitting(true)
    await banker_backend
      .withdrawFund(parseFloat(withdrawAmt))
      .then(async () => {
        await fetchData()
        setWithdrawAmt('')
        setSubmitting(false)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (fundAmt > 0) await fundAccount()
    if (withdrawAmt > 0) await withdrawFund()
  }

  return (
    <main>
      <div className="container">
        <img src={dbank_logo} alt="DBank logo" width="100" />
        <h1>
          Current Balance: $
          <span id="value">{Number(currentVal).toFixed(2)}</span>
        </h1>
        <div className="divider"></div>
        <form onSubmit={handleSubmit}>
          <h2>Funding Amount</h2>
          <input
            id="input-amount"
            type="number"
            step="0.01"
            min="0"
            onChange={(e) => setFundAmt(e.target.value)}
            value={fundAmt}
          />
          <h2>Withdrawal Amount</h2>
          <input
            id="withdrawal-amount"
            type="number"
            name="withdraw"
            step="0.01"
            min="0"
            onChange={(e) => setWithdrawAmt(e.target.value)}
            value={withdrawAmt}
          />
          <input
            id="submit-btn"
            type="submit"
            value={submiting ? 'Transacting...' : 'Transact'}
            disabled={submiting}
          />
        </form>
      </div>
    </main>
  )
}

export default App
