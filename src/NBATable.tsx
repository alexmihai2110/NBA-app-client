import React from "react";
import './App.css';
import moment from "moment";

class NBATable extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
        this.getRandomArbitrary = this.getRandomArbitrary.bind(this);
        this.state = {
            items: [],
            DataisLoaded: false,
            page: 1
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll = (event) => {
        const bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 50;
        if (bottom) {
            const { page, items } = this.state
            fetch("https://localhost:44323/NBAGames/Get/" + page,{
                mode: 'cors',
                headers: {
                  'Access-Control-Allow-Origin':'*',
                  'Content-Type' : 'application/json'
                }})
                .then(
                    (res) => {
                        let newRes = res.json();
                        return newRes;
                    }
                    )
                .then((json) => {
                    this.setState({
                        items: [...items,...json],
                        DataisLoaded: true,
                        page: page+1
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
    
        }
    };

   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch("https://localhost:44323/NBAGames/Get/0",{
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type' : 'application/json'
            }})
            .then(
                (res) => {
                    let newRes = res.json();
                    return newRes;
                }
                )
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
            .catch((e) => {
                console.log(e);
            });
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    getRandomArbitrary = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }
    
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
            <div>
            <h1> NBA Games </h1>  {
                items.map((item) => 
                {
                    const image = `https://picsum.photos/id/${this.getRandomArbitrary(0,400)}/${this.getRandomArbitrary(0,400)}`;
                return ( 
                    <ol>
                        <img src={image} width={100} height={100} />
                        Home Team: {item.homeTeam.fullName},
                        <img src={image} width={100} height={100} />
                        Visitor Team: {item.visitorTeam.fullName},
                        Date: { moment(item.date).format('DD/MM/YYYY') }, 
                        Period: { item.period },
                        Score: {item.homeTeamScore} - {item.visitorTeamScore}, 
                        Season: { item.season } 
                    </ol>
                
                )
                })
            }
        </div>
    );
}
}
   
export default NBATable;