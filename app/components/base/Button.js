import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Touchable, Text } from '../base'
import { connect } from 'react-redux'

class Button extends Component {

    render() {
        const { style, onPress, disabled, color, loading } = this.props
        const buttonStyle = [styles.button]

        buttonStyle.push({ backgroundColor: color })

        if (style) {
            buttonStyle.push(style)
        }
        if (disabled) {
            buttonStyle.push(styles.disabled)

        }
        const Touch = disabled || loading ? View : Touchable
        const android = Platform.OS === 'android'

        return (
            <Touch onPress={onPress} style={buttonStyle} color>
                <Text color='#fff' bold={android} upperCase={android}>{ this.props.children }</Text>
            </Touch>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 4,
        flex: 1,
        justifyContent: 'center',
        marginVertical: 8,
        minHeight: Platform.select({
            android: 20,
            ios: 26
        }),
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    disabled: {
        opacity: 0.5
    }
})

Button.propTypes = {
    children: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default connect(state => ({
    color: state.settings.color
}))(Button)
