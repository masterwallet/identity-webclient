import React from 'react';
export const lang = localStorage.getItem('locale') || 'en';

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
    });
  };
  componentWillMount() {
    this.updateText();
  }
  componentDidMount() {
    // this.updateText();
  }
  render() {
    return (<div ref={c => (this.root = c)}></div>);
  }
}

export default {
  lang,
  FromFile
};
