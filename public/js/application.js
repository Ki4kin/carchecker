// ==========================для запроса по вин-коду ===========================

let carForm = document.forms.carForm
let optionList = document.querySelector('#optionList')
let sinUpForm = document.querySelector('form[name=sinUpForm]')
let findedCar = false

if (carForm) {
 carForm.addEventListener("submit", async (event) => {
   event.preventDefault();
   const {
     action, 
     method,
     vin: { value: vin },
   } = event.target;    
   
   if (!event.target.vin.value) { alert('PLEASE, ENTER VIN!') }
   if (findedCar === true) { alert('PLEASE, CLICK RESET!') }
 
   const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`)
 
   const result = await response.json()
   const resultObject = result?.Results[0]
 
   let resValueArr = []
   let resKeyArr = []
 
   for (let key in resultObject) {
     if ( resultObject[key] ) {
     resValueArr.push(resultObject[key])
     resKeyArr.push(key)
     }
   }
  
  for (let i = 0; i < resKeyArr.length; i++) {
    optionList.innerHTML += `<tr calss="table-secondary" > <td calss="table-secondary w-50" > ${ resKeyArr[i] } </td> <td calss="table-secondary" > ${ resValueArr[i] } </td> </tr>`
    findedCar = true
  }  
 })
 
 // =====================Код для кнопки ресет=======================
 carForm.addEventListener("reset", async (event) => {
   event.preventDefault();
   event.target.vin.value = ''
   optionList.innerHTML = `<tr></tr>`
   findedCar = false
 })
}
 

// ===============обработка ошибки при регистрации=================

sinUpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  
  const {
    action, 
    method,
    name,
    password,
    email
  } = event.target;
  
  if (!event.target.name.value) {
    document.querySelector('input[name=name]').parentElement.innerHTML += "<div>Please enter your name!</div>"
  } else
  if (!event.target.password.value) {
    document.querySelector('input[name=password]').parentElement.innerHTML += "<div>Please enter your password!</div>"
  } else
  if (!event.target.email.value) {
    document.querySelector('input[name=email]').parentElement.innerHTML += "<div>Please enter your email!</div>"
  }
  else {

  const response = await fetch(
    action,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        password: password.value,
        email: email.value,
      })
    },
  );

  const jsonResponse = await response.text();
  
  window.location.href = '/'
  }
})
  
