import React from 'react'
import ReactDOM from 'react-dom';

export default class Content extends React.Component {
  renderParagraph(p, i) {
    return (
      <div
        key={i}
        className='column'
        dangerouslySetInnerHTML={{__html: p.entity.fieldText.processed}}>
      </div>
    );
  }

  render() {
    const paragraphsWithText = this.props.paragraphs.filter(p => {
      const { entity = {} } = p;
      return entity.fieldText;
    });

    // lack of _.partition function :(
    const col1 = paragraphsWithText.filter((_, i) => i % 2 == 0);
    const col2 = paragraphsWithText.filter((_, i) => i % 2 == 1);
    return (
      <div className='content'>
        <div key='col1' className='column1 column'>
          {col1.map((p,i) => this.renderParagraph(p, i))}
        </div>
        <div key='col2' className='column2 column'>
          {col2.map((p,i) => this.renderParagraph(p, i))}
        </div>
      </div>
    );
  }
}
