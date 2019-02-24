import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer id="footer" className="bg-dark mt-4 p-3 text-center text-white">Copyright & &copy; DevConnector {new Date().getFullYear()}</footer>
      </div>
    )
  }
}
