import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Touchable, Text } from '../../components/base'
import { TEAM } from '../../views/routes'

class MatchHeader extends Component {

    render() {
        const match = this.props.data
        const home = match.team_home ? match.team_home.name : ''
        const away = match.team_away ? match.team_away.name : ''
        const goalsHome = match.goals_home != null ? match.goals_home : '-'
        const goalsAway = match.goals_away != null ? match.goals_away : '-'
        const scoreHome = match.set_points_home != null ? match.set_points_home : '-'
        const scoreAway = match.set_points_away != null ? match.set_points_away : '-'
        const goals = `${goalsHome}:${goalsAway}`
        const score = `${scoreHome}:${scoreAway}`

        const isAndroid = Platform.OS === 'android'

        return (
            <View style={[style.header, { backgroundColor: this.props.color }]}>
                <Touchable color='#fff' style={style.teamContainer}
                    onPress={() => this.onPress(match.team_home) }>
                    <Text center bold={isAndroid}  color='#fff' numberOfLines={2} ellipsizeMode='tail'>{home}</Text>
                </Touchable>
                <View style={style.score}>
                    <Text style={style.points}>{score}</Text>
                    <Text style={style.points} size={12}>({goals})</Text>
                </View>
                <Touchable color='#fff' style={style.teamContainer}
                    onPress={() => this.onPress(match.team_away) }>
                    <Text center bold={isAndroid}  color='#fff' numberOfLines={2} ellipsizeMode='tail'>{away}</Text>
                </Touchable>
            </View>
        )
    }

    onPress(team) {
        this.props.pushRoute({
            state: TEAM,
            team,
            title: team.name
        })
    }
}


const style = StyleSheet.create({
    header: {
        borderBottomColor: 'rgba(0, 0, 0, .15)',
        borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
        elevation: 4,
        flexDirection: 'row',
        height: 46,
        justifyContent: 'space-around',
        maxHeight: 46
    },
    points: {
        alignItems: 'center',
        color: '#FFF',
        fontFamily: Platform.select({
            android: 'monospace',
            ios: 'Courier New'
        }),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    score: {
        alignItems: 'center',
        flex: 0,
        justifyContent: 'center'
    },
    teamContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 4
    }
})

MatchHeader.propTypes = {
    color: PropTypes.string,
    data: PropTypes.object,
    pushRoute: PropTypes.func
}

export default connect( state => ({
    color: state.settings.color
}))(MatchHeader)
