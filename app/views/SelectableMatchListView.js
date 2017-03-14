import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, Text } from '../ui';
import { Container, MatchItem } from '../components';

class SelectableMatchListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMatchDay: null,
            showDropdown: false,
            matchDays: []
        };
    }

    componentDidMount() {
        if (!this.props.league.matches[`${this.props.leagueID}`]) {
            this.props.getLeagueMatches(this.props.leagueID);
        } else {
            this.getMatchDays();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.tron.log('view receive new props');
        if (nextProps.league.matches[`${nextProps.leagueID}`]) {
            console.tron.log('update match days');
            this.getMatchDays();
        }
    }

    render() {
        const props = {
            refreshing: this.props.league.loading,
            error: this.props.league.error,
            onRefresh: () => { this.props.getLeagueMatches(this.props.leagueID)}
        };

        const matches = this.props.league.matches[`${this.props.leagueID}`] || [];
        const matchDays = this.state.matchDays;
        return (
            <Container { ...this.props} { ...props } getRef={container => { this.container = container }}>
                { matches.length > 0 && (
                    <ListItem.Group>
                        <ListItem.Header 
                            menuOpen={this.state.showDropdown}
                            title={'Spieltag wählen'} toggleMenu={this.onPress.bind(this)}>
                                { this.state.selectedMatchDay }
                            </ListItem.Header>
                        { this.state.showDropdown && matchDays.map((matchDay, idx) => {
                            return (
                                <ListItem key={idx} 
                                    onPress={() => { this.onSelectMatchDay(matchDay) }}
                                    last={idx === matchDay.length -1}><Text>{ matchDay }</Text>
                                </ListItem>);
                        })
                        }
                    </ListItem.Group>                    
                )}
                { !this.state.showDropdown && matches.map((match) => {
                    if (match.match_day === this.state.selectedMatchDay) {
                        return (<MatchItem key={match.id} navigator={this.props.navigator} data={match} />);
                    }
                })}
            </Container>
        );
    }

    getMatchDays() {
        const matchDays = [];
        const matches = this.props.league.matches[`${this.props.leagueID}`] || [];
        let selectedMatchDay = null;
        for (let match of matches) {
            if (matchDays.indexOf(match.match_day) === -1) {
                matchDays.push(match.match_day);
            }
            if (!match.set_points && !selectedMatchDay) {
                selectedMatchDay = match.match_day;
            } 
        }
        if (!selectedMatchDay) {
            selectedMatchDay = matchDays[matchDays.length-1];
        }
        this.setState({ selectedMatchDay, matchDays });
    }

    onSelectMatchDay(matchDay) {
        this.setState({ showDropdown: false, selectedMatchDay: matchDay });
        if (this.container && this.container.scrollTo) {
            this.container.scrollTo({ x: 0 , y: 0, animated: true });
        }
    }
    
    onPress() {
        this.setState({ showDropdown: !this.state.showDropdown });
    }
}


SelectableMatchListView.propTypes = {
    league: React.PropTypes.object,
    leagueID: React.PropTypes.number,
    navigator: React.PropTypes.object,
    getLeagueMatches: React.PropTypes.func
};

export default connect(state => ({ ...state }))(SelectableMatchListView);