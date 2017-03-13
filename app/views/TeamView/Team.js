import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MatchListView from '../MatchListView';
import TeamDetails from './TeamDetails';
import { TabBar } from '../../components';


class TeamView extends Component {

    render() {
        const matches = this.props.teams.id[`${this.props.team.id}`] ? this.props.teams.id[`${this.props.team.id}`].matches : [];
        const props = {
            refreshing: this.props.teams.loading,
            error: this.props.teams.error,
            onRefresh: () => { this.props.getTeamMatches(this.props.team.id); }
        };

        return (
            <ScrollableTabView
                style={this.props.style}
                renderTabBar={ () => (<TabBar />)}>
                <TeamDetails tabLabel='TEAM' { ...this.props } />
                <MatchListView tabLabel='BEGEGNUNGEN' { ...this.props } { ...props } refreshOnMount matches={matches} />
            </ScrollableTabView>
        )
    }

}

export default TeamView;