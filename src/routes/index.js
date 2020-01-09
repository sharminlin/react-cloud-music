import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

import Home from '../application/Home'

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const Recommend = SuspenseComponent(lazy(() => import("../application/Recommend/")));
const Singers = SuspenseComponent(lazy(() => import("../application/Singers/")));
const Rank = SuspenseComponent(lazy(() => import("../application/Rank/")));
const Album = SuspenseComponent(lazy(() => import("../application/Album/")));
const Singer = SuspenseComponent(lazy(() => import("./../application/Singer/")));
const Search = SuspenseComponent(lazy(() => import("./../application/Search/")));

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (
          <Redirect to={'/recommend'} />
        )
      },
      {
        path: '/recommend',
        component: Recommend,
        children: [
          {
            path: '/recommend/:id',
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers,
        key: 'singers',
        routes: [
          {
            path: '/singers/:id',
            component: Singer
          }
        ]
      },
      {
        path: '/rank',
        component: Rank,
        key: 'rank',
        routes: [
          {
            path: '/rank/:id',
            component: Album
          }
        ]
      },
      {
        path: '/search',
        exact: true,
        key: "search",
        component: Search
      },
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: Album
      },
    ]
  }
]

