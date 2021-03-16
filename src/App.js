import React from 'react'
import axios from 'axios'
import Search from './components/Search'
import User from './components/User'
import Repos from './components/Repos'
import './assets/scss/main.scss';
import './App.scss';

function App() {
  const perPage = 10
  let [value, setValue] = React.useState('')
  let [user, setUser] = React.useState('')
  let [repos, setRepos] = React.useState('')
  let [reposWP, setReposWP] = React.useState('')
  let [page, setPage] = React.useState(1)
  let [maxPages, setMaxPages] = React.useState('')
  let [pages, setPages] = React.useState([])
  let [err, setErr] = React.useState('')
  let [currentSort, setCurrentSort] = React.useState('name')
  let [currentSortDir, setCurrentSortDir] = React.useState('desc')

  function changeValue(input) {
    setValue(
      value = input,
    )
  }

  function findUser(gitUser, gitRepos) {
    setUser(
      user = gitUser
    )
    setRepos(
      repos = gitRepos
    )
    setMaxPages(
      maxPages = Math.ceil(repos.length / perPage)
    )
    setPages(
      pages = pagesCounter()
    )
    setReposWP(
      reposWP = repos.slice((page - 1) * perPage, page * perPage)
    )
  }
  function getError(error) {
    setErr(
      err = error
    )
  }
  function pagesCounter() {
    let pagesCount = []
    for (let i = 1; i <= maxPages; i++) {
      pagesCount.push(i)
    }
    return pagesCount
  }

  function getRepos() {
    axios.all([
      axios.get(`https://api.github.com/users/${value}`),
      axios.get(`https://api.github.com/users/${value}/repos`),
    ])
      .then(axios.spread((res1, res2) => {
        findUser(res1, res2.data)
      }))
      .catch(() => {
        findUser(null, null)
        getError("Can't find this user")
      });
  }

  function sort(e) {
    if (e === currentSort) {
      setCurrentSortDir (currentSortDir === 'asc' ? 'desc' : 'asc')
    }
    setCurrentSort (currentSort = e)
    setRepos(
      repos.slice().sort((a, b) => {
        let mod = 1;
        if (currentSortDir === 'desc') mod = -1;
        if (a[currentSort] < b[currentSort]) return -1 * mod;
        if (a[currentSort] > b[currentSort]) return 1 * mod;
        return 0;
      })
    )
  }

  function changePage(e) {
    setPage(
      page = e
    )
    setReposWP(
      reposWP = repos.slice((page - 1) * perPage, page * perPage)
    )
  }

  return (
    <div className="App">
      <header>
        <div className="navbar">
          <div className="container">
            <div className="logo">LOGO</div>
          </div>
        </div>
      </header>
      <div className="App-header">
        {err ? err : null}
        <Search value={value} onChange={changeValue} />
        <button className="btn btnPrimary" onClick={getRepos}>Search!</button>
        {/* user info */}
          {user && repos ? <User user={user} repos={repos} /> : null}
          {reposWP ? <Repos repos={reposWP} sort={sort}/> : null}
        {/* pagination */}
        {reposWP ?
          <div className="row">
            {pages.length > 1 && page > 1 ? <div className="btn" onClick={() => changePage(page - 1)}>Предыдущая страница</div> : null}

            {pages.length > 1 ? pages.map(page => {
              return (
                <div className="btn" key={page} onClick={() => changePage(page)}>{page}</div>
              )
            }) : null}

            {pages.length > 1 && page < maxPages ? <div className="btn" onClick={() => changePage(page + 1)}>Следующая страница</div> : null}

          </div>
        : null}
      </div>
    </div>
  );
}

export default App;
