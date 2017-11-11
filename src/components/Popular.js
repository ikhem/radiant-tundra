import React, { Component } from 'react';

class Popular extends Component {
  constructor(props){
    super(props)
    this.state = {selectedLanguage: 'All'};

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang){
    this.setState({selectedLanguage: lang})
  }
  render() {

    let languages = ['All', 'JavaScript','Ruby','Java','CSS','Python'];

    return (
      <ul className='languages'>
        {
          languages.map((lang)=>{
            return(
              <li
                style={lang === this.state.selectedLanguage ? { color: '#d0021b'} : null}
                onClick={()=>this.updateLanguage(lang)} 
                key={lang}
              >
                {lang}
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default Popular;
