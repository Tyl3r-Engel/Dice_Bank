const pool = require('../../../dataBase/pool')
const axios = require('axios')
const setUpPayments = require('./setUpPayments')
const isOptionsConflict = require('./isOptionsConflict')

const accountSignUpController = async (req, res) => {
  const { user: { username, userid }, accountName, userAccountName, accountBal, hasAgreed, options: { type, ...otherOptions} } = req.body

  if (
    !username
    || !userid
    || !accountName
    || !userAccountName
    || !(accountBal >= 0)
    || hasAgreed !== true
    || !type
    || isOptionsConflict(otherOptions, type, accountBal, accountName)
  ) return res.sendStatus(400)

  const date = new Date()
  const regex = /[0-9]/g
  const QUERY_STRING=`
    INSERT INTO accounts (userid, type, options, status, name, defaultname, dateopened, balance, accountnumber, accountsecret)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
  `;

  const genAccountNumber = () => (
    Number(
      String(
        Number(
          String(new Date())
            .match(regex)
            .join('')
          ** Math.floor((Math.random() + 1) * 5)
        )
        * Math.floor((Math.random() + 2) * 5)
      )
      .match(regex)
      .join('')
      .slice(3, 13)
    )
  )

  const genAccountSecret = async () => {
    let { data : [ word1, word2 ] } = await axios.get('http://random-word-api.herokuapp.com/word?number=2')
    return `${word1.charAt(0).toUpperCase() + word1.slice(1)}-${word2.charAt(0).toUpperCase() + word2.slice(1)}`
  }

  try {
    if (type === 'creditCard' || type === 'loan' || otherOptions.promo) {
      const accountNumber = genAccountNumber()
      const newAccountBal = await setUpPayments(type, otherOptions, accountBal, accountName, date, accountNumber, async (newAccountBal) => {
        await pool.query(QUERY_STRING, [userid, type, otherOptions, true, userAccountName, accountName, date, newAccountBal, accountNumber, await genAccountSecret()])
      })
      if (newAccountBal?.message) throw new Error(newAccountBal?.message)
    } else {
      await pool.query(QUERY_STRING, [userid, type, otherOptions, true, userAccountName, accountName, date, accountBal, genAccountNumber(), await genAccountSecret()])
    }
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

module.exports = accountSignUpController