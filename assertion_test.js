const assertion_ = require('./assertion')


/* ASSERTIONS TEST START */


// strick assertion
assertion_.strict_assertion_(1,'1')

// non strict
assertion_.non_strict_assertion_(1,'1')


// assertionError
const options = {
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
}
assertion_.assertionError_(1, 2, options)


// callTracker

const afunc = ()=>{
    console.log("hi")
}
assertion_.callTracker_(afunc,1, report=true) // hi \n []
assertion_.callTracker_(afunc,2, report=false) // error
assertion_.callTracker_(afunc,2, report=true) // hi \n object

/* ASSERTIONS TEST END */
