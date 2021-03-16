import React from 'react'

export default function Search({user, repos}) {
  return (
  <div className="user__wrapper">
    <div className="user-info">
      <img src={user.data.avatar_url} alt={user.data.login} />
      <div>
        <span>{user.data.name ? user.data.name : user.data.login}</span>
        <p>Count of repos: {repos.length} </p>
      </div>
    </div>
  </div>
  )
}