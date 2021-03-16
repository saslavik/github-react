import React from 'react'

export default function Search({repos, sort}) {

  return (
    <div className="repos__wrapper" v-if="repos">

    {/* repo sorting line */}
    <div className="sort">
      <span onClick={() => sort('name')}>Title &#8595;</span>
      <span onClick={() => sort('stargazers_count')}>Stars⭐&#8595;</span>
    </div>

    {/* repo item */}
    { repos.map(repo => {
      return (
        <div className="repo-item" key={repo.id}>
          <div className="repos-info">
            <a className="link" target="_blank" rel="noreferrer" href={repo.html_url}>{ repo.name }</a>
            <span>{ repo.stargazers_count } ⭐</span>
          </div>
        </div>
      )
    })}
  </div>
  )
}