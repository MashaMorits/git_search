import './main.scss';
import './index.html';


let form = document.getElementById('searchForm') // форма
let infoMessage = document.querySelector('.info') // сообщение при ошибке
let reposList = document.querySelector('.repos__list') // контейнер для результатов поиска

form.search.oninput = () => form.search.classList.remove('error') // убираем ошибку при вводе в инпут

form.onsubmit = (event) => { // отправка формы
    event.preventDefault()

    if (form.search.value.trim().length < 3) { // если введено менее 3 символов выводим сообщение об ошибке и добавляем класс инпуту
        reposList.innerHTML = ''
        infoMessage.textContent = 'Ошибка. Введите не менее 3 символов'
        form.search.classList.add('error')
    } else {
        infoMessage.textContent = ''
        searchRepos(form.search.value)
    }

}


async function searchRepos(name) { // получаем репозитории с гитхаба

    let queryString = encodeURIComponent(`${name} in:name`);
    await fetch(`https://api.github.com/search/repositories?q=${queryString}`) 
        .then(res => res.json())
        .then(result => {
                if ( result.items.length ) { // если в ответе есть репозитории, добавляем их 
                    printRepos(result.items)
                } else { // если ответ пустой, выводим ошибку
                    reposList.innerHTML = ''
                    infoMessage.textContent = 'По вашему запросу ничего не найдено'
                }    
        })
        .catch(err => console.log(err))

}

function printRepos(repos) { // добавляем репозитории в список

    reposList.innerHTML = ''

    repos.map(( item, index ) => {
        if ( index < 10 ) {
            let repo = document.createElement('div')
            repo.className = 'repo'
            repo.innerHTML = `<a href=${item.html_url} class='repo__name' target='blanc'>${item.name}</a>
                                <div class="row">
                                    <p class='repo__author'>автор <b>${item.owner.login}</b></p>
                                    <p class='repo__count'><b>${item.stargazers_count}</b> оценок</p>
                                </div>`

            reposList.append(repo)
        }
    })
}



