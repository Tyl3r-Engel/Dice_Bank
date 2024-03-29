import savings from './savings.png'
import standardChecking from './standardChecking.png'
import business from './business.png'
export const CheckingAndSavingsInfo = [
  {
    name : 'Standard Checking',
    dis : 'This is the way to go if you want to play it safe. With more unlimited then you have every seen before with our unlimited transfers and unlimited accounts! Accounts also come with a yearly 12% interest (1% monthly) to show our appreciation for choosing Dice Bank.',
    image : standardChecking,
    options : {
      'type' : 'checking',
      'interestRate' : 1
    }
  },
  {
    name : 'You Set Your Rate Savings',
    dis : 'With these kinds of savings you never lose with the Set Your Rate Savings you can set how much interest you want to make per year on your saving account. (amount must not be over 100%)',
    image : savings,
    options : {
      'type' : 'savings',
      'interestRate' : 100,
      'extraInput' : {
        'name' : 'Interest Rate',
        'helperText' : 'Input must be numbers and less then or equal to 100',
        'handleChange' : function ({ target: { value }}, setExtraInput, setIsExtraInputError) {
          if(value > 100 || !(value - 0)) {
            setIsExtraInputError(true)
            setTimeout(() => setIsExtraInputError(false), 5000)
            return
          }
          setExtraInput(value)
        },
        'isConflict' : function (val, errFunc) {
          if (val > 100 || val < 1) {errFunc(true); return true}
          return false
        }
      }
    }
  },
  {
    name : 'Business Checking',
    dis : 'Here at Dice Bank we support your gamble in building your own business, so we want to give back to you! When opening a Business Checking account we will match 25% of your initial deposit on us along with 12% yearly interest (1% monthly)!',
    image : business,
    options : {
      type : 'checking',
      interestRate : 1,
      promo : '25% init deposit'
    }
  }
]