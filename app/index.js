import {
  Router,
  Route,
  browserHistory,
  Redirect,
  React,
  render,
  ReactGA,
  FontFaceObserver,
  es6Promise
} from 'globalImports'

// components
import View1 from 'containers/view1/view1'

// styles import. It needs to be in the project somewhere once
import styles from 'styles/app.scss'

let font = new FontFaceObserver('Source Sans Pro')
font.load()
.then(() => {
  console.log('Source Sans Pro has loaded')
})
.catch((err) => {
  console.error('Source Sans Pro is not loading', err)
})

// keep promises working in IE 11
es6Promise.polyfill()

// google analytics
// ReactGA.initialize(- analytics id goes here -)
const logPageView = () => {
//   let pathName = window.location.pathname
//   ReactGA.set({ page: pathName })
//   ReactGA.pageview(pathName)
  console.log('log page view')
}

/////////////////////////////////////////////////////////////////
// Examples for react router
// <Route path="article/:id" component={comoment here} />
// <Redirect path="article" to="/" />
// <Route path="404" component={NoMatch} />
// <Redirect from="*" to="/404" />

render(
  <div className="globalContainer">
    <div className="responsiveWidth">

      <Router history={ browserHistory } onUpdate={logPageView}>
        <Route path="/" component={View1}/>
      </Router>

    </div>
  </div>,
  document.getElementById('mount')
)
