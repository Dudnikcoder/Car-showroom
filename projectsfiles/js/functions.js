let mainId;

const checkLocal = () => {
    if(localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return [];
    }
}

const hideElements = () => {
    const main = document.getElementById('mainCar');
    const mainBtn = document.getElementById('carPage');
    main.classList.remove('mainCar');
    main.classList.add('hidden');
    mainBtn.classList.remove('carPage');
    mainBtn.classList.add('hidden');
}

const showCRUD = () => {
    hideElements();
    showUsers();
}

const showCar = () => {
    for(let i = 0; i < cars.length; i++) {
        const logoParent = document.getElementById('logoCar');
        const carParent = document.getElementById('car');

        let logoChild = document.createElement('img');
        logoChild.classList.add('logoCarImg');
        logoChild.setAttribute('data-id', i);
        logoChild.src = 'images/logos/' + (i+1) + '.png';
        logoParent.appendChild(logoChild);

        let parentElement = document.querySelectorAll(`${('[data-id]')}`);

        parentElement[i].addEventListener('click', function() {
            let someElement = document.querySelectorAll(`${('[data-id]')}`);
            for(let j = 0; j < cars.length; j++) {
                 if(i === j) {
                     someElement[j].src = 'images/logos/' + 'active' + (j+1) + '.png';
                 } else {
                     someElement[j].src = 'images/logos/' + (j+1) + '.png';
                 }
            }

            carParent.appendChild(carChild);

            while (carParent.firstChild) {
                carParent.removeChild(carParent.firstChild);
            }
            carParent.appendChild(carChild);

            let parentElement = document.querySelectorAll(`${('[data-id]')}`);
        })

        let carChild = document.createElement('img');
        carChild.src = 'images/cars/' + (i+1) + '.png';
    }
}

const showSignForm = () => {
    document.getElementById('form-signin').classList.toggle('form-signin-left');
    document.getElementById('form-signup').classList.toggle('form-signup-left');
    document.getElementById('frame').classList.toggle('frame-long');
    document.getElementById('signup-inactive').classList.toggle('signup-active');
    document.getElementById('signin-active').classList.toggle('signin-inactive');
    document.getElementById('forgot').classList.toggle('forgot-left');
    //this.classList.remove("idle").classList.add("active");
}

const showSignUp = (valid, form) => {
    if(valid) {
        document.getElementById('nav').classList.toggle('nav-up');
        document.getElementById('form-signup').classList.toggle('form-signup-down'); 
        document.getElementById('success').classList.toggle('success-left');
        //document.getElementById('frame').classList.add('frame-long');
        document.getElementById('frame').classList.add('frame-short');
        setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
        document.getElementById('mainMenu').classList.remove('hidden');
    } else {
        form.classList.add('hidden')
        document.getElementById('successsave').classList.toggle('success-left');
        document.getElementById('crudframe').classList.remove('framecrud');
        document.getElementById('crudframe').classList.add('frame-short');
        setTimeout(() => form.classList.add('hidden'), 3000);
    }
}

const showSignIn = () => {
    document.getElementById('btn-animate').classList.add('btn-animate-grow');
    document.getElementById('welcome').classList.add('welcome-left');
    document.getElementById('profile-photo').classList.add('profile-photo-down');
    document.getElementById('frame').classList.add('frame-middle');
    setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
    document.getElementById('mainMenu').classList.remove('hidden');
}

// CheckValid

function checkValid(formid) {
    let formThings = document.getElementById(formid).elements;
    let isValidCounter = 0;
    let generalCounter = 0;
    let validation;

    for(let i = 0; i < formThings.length; i++) {
        if(formThings[i].nodeName == 'INPUT') {
            generalCounter++
            if(formThings[i].value) {
                isValidCounter++
            }
        }
    }
    if(isValidCounter === generalCounter) {
        validation = true;
    }
    return validation;
}

function isValid(validation, form, formName, valid) {
    if(validation) {
        const savePersonForm = form.elements;

        const userDat = {
            name: savePersonForm.username.value,
            password: savePersonForm.password.value,
            email: savePersonForm.email.value,
        }

        console.log(savePersonForm.username.value);

        // console.log(userDat.password === savePersonForm.confirmpassword.value);

        if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email))) {
            savePerson(userDat);
            showSignUp(valid, formName);
        } else if (!isValidName(userDat.name)) {
            alert("You entered the wrong name");
        } else if (!isValidEmail(userDat.email)) {
            alert("Your email is incorrect");
        } else if (!isValidPassword(userDat.password)) {
            alert("In password you need more than 8 elements and one number!");
        } else {
            alert("You passwords arent correct");
        }

        // saveValid(userDat);
        
    } else {
        alert('You provided incomplete information');
    }
}

// const saveValid = (userDat) => {
//     if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email))) {
//         showSignUp();
//         savePerson(userDat);
//     } else if (!isValidName(userDat.name)) {
//         alert("You entered the wrong name");
//     } else if (!isValidEmail(userDat.email)) {
//         alert("Your email is incorrect");
//     } else if (!isValidPassword(userDat.password)) {
//         alert("In password you need more than 8 elements and one number!");
//     } else {
//         alert("You passwords arent correct");
//     }
// }

// const infoValid = () => {
//     if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email)) && ((userDat.password === savePersonForm.confirmpassword.value))) {
//         showSignUp();
//         savePerson(userDat);
//     } else if (!isValidName(userDat.name)) {
//         alert("You entered the wrong name");
//     } else if (!isValidEmail(userDat.email)) {
//         alert("Your email is incorrect");
//     } else if (!isValidPassword(userDat.password)) {
//         alert("In password you need more than 8 elements and one number!");
//     } else {
//         alert("You passwords arent correct");
//     }
// }

function isValidName(name) {
    return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,})$/.test(name);
}

function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function isValidEmail(email) {
    return /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/.test(email);
}

const savePerson = (user) => {
    let myNode = document.getElementById('crud');
    if(mainId <= userData.length) {
        userData[mainId] = user;
        localStorage.setItem('users', JSON.stringify(userData));
        while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        showUsers();
    } else {
        userData.push(user);
        localStorage.setItem('users', JSON.stringify(userData));
        while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        showUsers();
    }

    //

    // userData.push(user);
    // localStorage.setItem('users', JSON.stringify(userData));
}

const checkLogin = () => {
    const savePersonForm = document.forms.inForm.elements;

    const userDatLog = {
        nameLog: savePersonForm.username.value,
        passwordLog: savePersonForm.password.value,
    }

    usersInfo = JSON.parse(localStorage.getItem('users'));

    for(let i = 0; i < usersInfo.length; i++) {
        if((usersInfo[i].name === userDatLog.nameLog) && (usersInfo[i].password === userDatLog.passwordLog)) {
            showSignIn();
            document.getElementById('welcome').innerHTML = 'Welcome, ' + userDatLog.nameLog;
        }
    }
}

// CRUD 

function showUsers(){
    let parentCrud = document.getElementById('crud');

    if(parentCrud === null){
        parentCrud = document.createElement('div')
        parentCrud.setAttribute('id', 'crud') 
        // document.querySelector('body').appendChild(parentCrud)
        document.getElementById('main').appendChild(parentCrud);
    }
    for(let i=0; i<users.length; i++){
        const wrapper = document.createElement('div')
        wrapper.setAttribute('data-id', i)
        wrapper.classList.add('user')

        let personImg = document.createElement('img')
        personImg.classList.add('image')
        personImg.src='images/unknown.jpg'

        let personName = document.createElement('div')
        personName.innerHTML = `${users[i].name}`

        parentCrud.appendChild(wrapper);
        wrapper.appendChild(personImg);
        wrapper.appendChild(personName);
        showBtn(wrapper, i, parentCrud);
    }
}

function showBtn(wrapper, i, parentCrud){
    let btnparent = document.createElement('div');
        btnparent.classList.add('button')

        let view = document.createElement('input')
        view.setAttribute('type', 'button')
        view.setAttribute('value', 'view')
        view.addEventListener('click', function(){
            let info = document.createElement('div')
            info.innerHTML = `${users[i].name} ${users[i].age} years old`
            parentCrud.appendChild(info)
        })

        let remove = document.createElement('input')
        remove.setAttribute('type', 'button')
        remove.setAttribute('value', 'remove')
        remove.addEventListener('click', function(){
            if(confirm('Do you want delete this person?')){
                const id = wrapper.getAttribute('data-id')
                parentCrud.remove(wrapper)
                users.splice(id, 1)
                localStorage.setItem('users',JSON.stringify(users))
                showUsers();
            }
        })

        let edit = document.createElement('input');
        edit.setAttribute('type', 'button');
        edit.setAttribute('value', 'edit');
        edit.addEventListener('click', function(){
            let form = document.getElementById('form-crud');
            document.getElementById('crudframe').classList.add('framecrud');
            document.getElementById('crudframe').classList.remove('hidden');
            form.classList.remove('hidden');
            mainId = wrapper.getAttribute('data-id');
            document.getElementById('editform').innerHTML = `Edit form of ${users[i].name}`;
            form.elements.username.value = users[i].name;
            form.elements.email.value = users[i].email;
            form.elements.password.value = users[i].password;
        })


        wrapper.appendChild(btnparent);
        btnparent.appendChild(view);
        btnparent.appendChild(remove);
        btnparent.appendChild(edit);
}

// function checkValid() {
//     let formThings = document.getElementById('chechoutForm').elements;
//     let isValidCounter = 0;
//     let generalCounter = 0;
//     let validation;

//     for(let i = 0; i < formThings.length; i++) {
//         if(formThings[i].type !== 'button') {
//             generalCounter++
//             if(formThings[i].value) {
//                 isValidCounter++
//             }
//         }
//     }
//     if(isValidCounter === generalCounter) {
//         validation = true;
//     }
//     return validation;
// }

// function exam(validation) {
//     if(validation) {
//         let personForm = document.forms.chechoutForm.elements;
//         let newUser = {
//             name: personForm.name.value,
//             password: personForm.password.value,
//             email: personForm.email.value,
//         }
//         if((isValidName(newUser.name)) && (isValidPassword(newUser.password)) && (isValidAge(newUser.age)) && (isValidEmail(newUser.mail)) && (isValidTel(newUser.tel)) && (isValidCard(newUser.card))) {
//             savePerson(newUser)
//         } else if(!isValidName(newUser.name)){
//             alert('Wrong name')
//         }
//         else if(!isValidPassword(newUser.password)){
//             alert('Wrong password')
//         }
//         else if(!isValidEmail(newUser.mail)){
//             alert('Wrong mail')
//         }
//         else if(!isValidTel(newUser.tel)){
//             alert('Wrong tel')
//         }        
//         else if(!isValidCard(newUser.card)){
//             alert('Wrong card')
//         }
//     }
// }

// function isValidName(name) {
//     return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,})$/.test(name);
// }

// function isValidPassword(password) {
//     return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
//     .test(password);
// }

// function isValidAge(age) {
//     return /^[1-9][0-9]?$|^100$/.test(age);
// }

// function isValidTel(tel) {
//     return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(tel);    
// }

// function isValidMail(mail) {
//     return /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/.test(mail);
// }

// function isValidCard(card) {
//     return /^4[0-9]{12}(?:[0-9]{3})?$/.test(card);
// }


// function savePerson(newUser) {
//     let someparent = document.getElementById('container');
//     if(mainId <= user.length){
//         user[mainId]=newUser;
//         localStorage.setItem('user',JSON.stringify(user));
//         while(someparent.firstChild) {
//             someparent.removeChild(someparent.firstChild);
//         }
//         showPerson();
//     }
//     else{
//         user.push(newUser)
//         localStorage.setItem('user',JSON.stringify(user));
//         while(someparent.firstChild) {
//             someparent.removeChild(someparent.firstChild);
//         }
//         showPerson();
//     }
//     document.getElementById('chechoutForm').classList.add('hidden');
// }

