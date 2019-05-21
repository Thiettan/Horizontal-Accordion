//Author: Tan T. Bui
//React 


const $ = window.jQuery;

$(() => {

  if (document.documentMode || /Edge/.test(navigator.userAgent) || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    console.log('Hello non Webkit User!');
    window._fileExt = '.jpg';
  }
  else {
    window._fileExt = '.webp';

  }

  class Tile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isActive: this.props.isActive
      };
    }

    render() {
      const data = this.props.data;
      const background = `url('${data.img}') 50% 0% / cover no-repeat`
      const styles = { 'background': background }
      const isActive = this.props.isActive ? 'true' : 'false'

      return (
        <div className={'Tile '} 
          direction={this.props.direction} 
          is_active={isActive} 
          is_focus={this.props.focus.toString()} 
          index={this.props.index} 
          >
          <div className='info-reveal'>
            <div className='title'>{data.title}</div>
            <div className='description'>
              <b>Fact</b><div className='info'>{data.description}</div>
              <b>Country</b><div className='info'>{data.country}</div>
              <b>Region</b><div className='info'>{data.region}</div>
            </div>
          </div>
          <div className='img-container'>
            <div className='img' style={styles} index={this.props.index} onClick={this.props.onClick}>
            </div>
          </div>
          <div className='title-bottom'><span>{data.title}</span></div>
        </div>);
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [{
            title: 'Dubai',
            description: 'Ipsum dolore et vostmet. ',
            country: 'UAE',
            region: 'veritas',
            meta: '',
            link: '',
            img: `/images/stock/stock3${window._fileExt}`
          },
          {
            title: 'Ha Long',
            description: 'Ipsum dolore et vostmet.',
            country: 'Vietnam',
            region: 'veritas',
            meta: '',
            link: '',
            img: `/images/stock/ha-long${window._fileExt}`
          },
          {
            title: 'Swiss Alps',
            description: 'Ipsum dolore et vostmet.',
            country: 'Switzerland',
            region: 'veritas',
            meta: '',
            link: '',
            img: `/images/stock/stock2${window._fileExt}`
          },
          {
            title: 'Venice',
            description: 'Ipsum dolore et vostmet.',
            country: 'Italy',
            region: 'veritas',
            meta: '',
            link: '',
            img: `/images/stock/venice${window._fileExt}`
          },
          {
            title: 'Tokyo',
            description: 'Ipsum dolore et vostmet.',
            country: 'Japan',
            region: 'veritas',
            meta: '',
            link: '',
            img: `/images/stock/japan${window._fileExt}`
          },
        ],
        childActive: null,
        appear: true,
        counter: 0
      };
    }

    handleClick = (e) => {
      const index = $(e.target).attr("index") ? $(e.target).attr("index").toString() : null
      const collapseAll = !index ? true : false
      console.log("collapseAll: ", collapseAll)
      this.setState(prevState => {
        return { childActive: index, collapseAll: collapseAll }
      }, console.log("index: ", index))


    }


    renderTile = () => {

    }

    render() {
      console.log("App rendering**********************************************")
      const { appear } = this.state;
      const count = this.state.counter
      let isActive = this.state.childActive != null ? parseInt(this.state.childActive) : null
      console.log(`outside Tiles | isActive: ${isActive}`)

      const Tiles = this.state.data.map((item, i) => {
        console.log(`${i} === isActive: ${isActive}`, i === isActive);
        const active = i === isActive ? true : false;
        const direction =
          i > isActive ? (i == this.state.data.length - 1 && isActive == this.state.data.length - 2) ? 'right-last' : 'right' :
          i < isActive && isActive == this.state.data.length - 2 ? 'left-2ndlast' :
          i < isActive ? (isActive == this.state.data.length - 1) ? 'left-last' : 'left' :
          isActive == this.state.data.length - 1 ? 'last' :
          isActive == this.state.data.length - 2 ? '2ndlast' :
          'center';
        console.log(`inside Tiles map | index: ${i} active: ${active}`)
        const focus = isActive != null ? true : false;
        return <Tile data={item} direction={direction} focus={focus} isActive={active} index={i} onClick={this.handleClick} key={'tile-'+ i}  />;
      })

      return (
        <div className='App' onClick={this.handleClick}>
          <div className = 'title-wrap'> </div> 
          <div className = 'box' key = { `box-1` } > { Tiles } </div>
        </div>
      );
    }
  }


  document.querySelectorAll(".container").forEach(domContainer => {
    ReactDOM.render(React.createElement(App, { category: '' }), domContainer);
  });
});
