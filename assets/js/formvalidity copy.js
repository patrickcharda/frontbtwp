const mailInput = document.querySelector("input[id='email']");

mailInput.addEventListener('input', () => {
    mailInput.setCustomValidity('');
    //console.log(mailInput.value);
    mailInput.checkValidity();
});

mailInput.addEventListener('invalid', () => {
  if(mailInput.value === '') {
    mailInput.setCustomValidity('Merci de saisir une adresse de messagerie');
  } else {
    mailInput.setCustomValidity('Merci de saisir une adresse valide');
  }
});

const mailRegex=/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}/;
const isValidEmail = (mailInput) => {
    return String(mailInput)
        .toLowerCase()
        .match(mailRegex);
};












