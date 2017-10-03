import React, { Component } from 'react';
import quotes from '../quotes';
import loader from '../loader.gif';


export class Quote extends Component {
    interval = undefined;

    state = {
        author : 'Chuck Norris',
        quote : 'When I slice onions, onions cry',
        language : 'All'
    }

    selectLanguage = () => {
      let lang = document.querySelector('select').value;
      if (lang !== "All" && lang !== "FR" && lang !== "EN") {
        alert('Language not valid buddy ;)');
        lang = "All";
      }
      return lang;
    }

    filterObject = lang => {
      let objFiltered = {};
      for (var elem in quotes) {
        if (quotes[elem].language === lang)
          objFiltered[elem] = quotes[elem];
      }
      return objFiltered;
    }

    checkAutoMode = () => {
      let auto = document.querySelector('#auto-mode');
      if (auto.checked)
        document.querySelector('#btn-generate').disabled = "true";
      return auto.checked;
    }

    startEngine = () => {
      let loader = document.querySelector('#loader');
      let btnGenerate = document.querySelector('#btn-generate');
      if (this.checkAutoMode()) {
        loader.style.display = 'inline';
        btnGenerate.style.disabled = 'true';
        this.interval = setInterval(() => {
          this.generateQuote();
        }, 4000);
      } else {
        clearInterval(this.interval);
        loader.style.display = 'none';
        this.generateQuote();
      }
    }

    generateQuote = event => {
      this.checkAutoMode();
        var lang = this.selectLanguage();
        var filteredQuotes = quotes;
        if (lang !== 'All') {
          filteredQuotes = this.filterObject(lang);
        } 
        var keys = Object.keys(filteredQuotes);
        var randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (this.state.quote === filteredQuotes[randomKey].quote)
            return (this.generateQuote());
        this.setState(filteredQuotes[randomKey]);
    }

    unlockGenerate() {
        let btn = document.querySelector('#btn-generate');
        if (btn.disabled == true)
          btn.disabled = false;
    }

    render() {
        return(
          <div>
            <div className="quote-container">
              <h1>{this.state.quote}</h1>
              <h2>{this.state.author}</h2>
              <img src={loader} alt="loader" id="loader"/>
            </div>
            <button id="btn-generate" onClick={e => this.startEngine(e)}>Generate</button>
            <select name="language" className="select-language">
              <option defaultValue="ALL">All</option>
              <option value="FR">French</option>
              <option value="EN">English</option>
            </select>
            <div className="auto-mode">
              <input onChange={e => this.unlockGenerate()} type="checkbox" id="auto-mode" value="auto" />
              <label htmlFor="auto-mode">Auto</label>
            </div>
          </div>
        );
    }
}