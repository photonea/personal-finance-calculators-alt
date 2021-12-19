floatFormatter = new Intl.NumberFormat(
  "en-US",
  (options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
)

intFormatter = new Intl.NumberFormat(
  "en-US",
  (options = { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
)

function removeCommaThousandSep(str) {
  return str.split(",").join("")
}

function enStringToFloat(str) {
  if (str == "") {
    str = "0"
  } else {
    str = removeCommaThousandSep(str)
  }
  val = parseFloat(str)
  if (val == NaN) {
    val = 0
  }
  return val
}

function floatToEnString(val) {
  if (isNaN(val)) {
    val = "0"
  }
  return floatFormatter.format(val)
}

function intToEnString(val) {
  if (isNaN(val)) {
    val = "0"
  }
  return intFormatter.format(val)
}

function formatStringAsEnFloat(str) {
  if (str == "") {
    return str
  } else {
    return floatToEnString(enStringToFloat(str))
  }
}

function formatStringAsEnInt(str) {
  if (str == "") {
    return str
  } else {
    return intToEnString(enStringToFloat(str))
  }
}

function formatInput(el, formatFunc = formatStringAsEnFloat) {
  // https://codepen.io/559wade/pen/LRzEjj

  // initial caret position
  let caretPos = el.selectionStart
  let oriLength = el.value.length

  // format value
  el.value = formatFunc(el.value)

  // put caret back in the right position
  let newLength = el.value.length
  caretPos = newLength - oriLength + caretPos
  el.setSelectionRange(caretPos, caretPos)
}

function formatInputOnBlur(el, formatFunc = formatStringAsEnFloat, onKeyUp = false) {
  el.onblur = () => {
    formatInput(el, formatFunc)
  }
  if (onKeyUp) {
    el.onkeyup = () => {
      formatInput(el, formatFunc)
    }
  }
}

function validateInputNumber(el) {
  let val = el.value
  if (val == "") {
    val = "0"
  }
  return isNaN(val)
}

function computeMonthlyWithdrawal(retireAge, lifeExpectancy, retireSaving, dividendRate) {
  console.log(`'computeMonthlyWithdrawal' inputs: 
  retireAge = ${retireAge}
  lifeExpectancy = ${lifeExpectancy}
  retireSaving = ${retireSaving}
  dividendRate = ${dividendRate}`)
  let n = lifeExpectancy - retireAge
  let factor = dividendRate / 100 + 1
  let numerator = retireSaving * factor ** (n - 1) * (factor - 1)
  let denominator = factor ** n - 1
  let monthlyWithdraw = numerator / denominator / 12
  console.log(`'computeMonthlyWithdrawal' result: ${monthlyWithdraw}`)
  return monthlyWithdraw
}

function computeMonthlyWithdrawalSimple(retireAge, lifeExpectancy, retireSaving) {
  console.log(`'computeMonthlyWithdrawalSimple' inputs: 
  retireAge = ${retireAge}
  lifeExpectancy = ${lifeExpectancy}
  retireSaving = ${retireSaving}`)
  let n = lifeExpectancy - retireAge
  let monthlyWithdraw = retireSaving / n / 12
  console.log(`'computeMonthlyWithdrawalSimple' result: ${monthlyWithdraw}`)
  return monthlyWithdraw
}
