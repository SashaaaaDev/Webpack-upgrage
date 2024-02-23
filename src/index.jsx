import * as $ from 'jquery'

import React from 'react'
import * as ReactDOM from 'react-dom/client'

import '@/model/lodash'
import Post from './post'
import json from './assets/data'
import logo from './assets/icon-square-big'
import xml from './assets/data.xml'
import csv from '@/assets/data.csv'

import './css/style.css'
import './less/style.less'
import './sass/style.sass'
import './sass/style.scss'


const post = new Post('Webpack Post Title', logo)

console.log('Post to string:', post.toString())


console.log('XML:', xml)
console.log('JSON:', json)
console.log('CSV:', csv)

async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

const App = () => (
    <div className="container">
      <h1>Webpack training</h1>
      <div className="logo"/>
      <pre/>
      <div className="less-demo">
        <h2>Less</h2>
      </div>
      <div className="scss-demo">
        <h2>Scss</h2>
      </div>
      <div className="sass-demo">
        <h2>Sass</h2>
      </div>
    </div>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)
$('pre').addClass('code').html(post.toString())