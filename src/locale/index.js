import React from 'react';
import ReactMarkdown from 'react-markdown';
export const lang = localStorage.getItem('masterwallet_locale') || 'en';

export const Storage = {
  set: (x, value) => { sessionStorage.setItem(x, value); },
  get: x => (sessionStorage.getItem(x) || ''),
  retrieve: (x, url) => {
    if (Storage.get(x)) {
      return new Promise(resolve => {
        resolve(JSON.parse(Storage.get(x)))
      });
    }
    return fetch(url).then(r => r.text()).then(contents => {
      Storage.set(x, JSON.stringify(contents));
      return contents;
    });
  }
};

export class FromFile extends React.Component {
  state = {
    contents: null,
  };
  root = null;

  updateText = () => {
    const { name } = this.props;
    const url = `/locale/${lang}/${name}`;
    Storage.retrieve(`${lang}__${name}`, url).then(contents => {
      if (this.root && this.root.children.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = contents;
        this.root.appendChild(div);
      }
      this.setState({ contents });
    });
  };
  componentWillMount() {
    this.updateText();
  }
  componentDidMount() {
    // this.updateText();
  }
  render() {
    const { contents } = this.state;
    const fileExtension = this.props.name.split('.').pop();
    if (fileExtension === 'md') {
      return <ReactMarkdown source={contents} />;
    }
    return (<div ref={c => (this.root = c)}></div>); //c => this.setState({ root: c })
  }
}

export default {
  lang,
  FromFile
};
